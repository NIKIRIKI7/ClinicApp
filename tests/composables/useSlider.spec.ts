import {ref, defineComponent, h, nextTick, type Ref, computed} from 'vue';
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useSlider} from '../../src/composables/useSlider';
import {useBreakpoints} from '@vueuse/core';
import type {SliderItem, SliderConfig} from '../../src/composables/useSlider';
import {mount} from '@vue/test-utils';

// Мокаем @vueuse/core
vi.mock('@vueuse/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import ('@vueuse/core')>();
  return {
    ...actual,
    useBreakpoints: vi.fn(),
  };
});

const mockUseBreakpoints = vi.mocked(useBreakpoints);

// Данные для тестов
const mockItems: SliderItem[] = Array.from({length: 10}, (_, i) => ({
  id: i + 1,
  src: `image-${i + 1}.png`,
  alt: `Image ${i + 1}`,
}));

const config: SliderConfig = {
  itemsPerPage: {MOBILE: 1, TABLET: 2, DESKTOP: 4},
  breakpoints: {MOBILE: 400, TABLET: 800},
};

// Вспомогательная функция для мока useBreakpoints.
const setScreenSize = (size: 'mobile' | 'tablet' | 'desktop') => {
  const isMobile = ref(size === 'mobile');
  const isTablet = ref(size === 'tablet');

  const mockBreakpointsObject = {
    smaller: (val: string) => computed(() => val === 'tablet' ? isMobile.value : false),
    between: (val1: string, val2: string) => computed(() => (val1 === 'tablet' && val2 === 'desktop') ? isTablet.value : false),
  };

  // ИСПРАВЛЕНИЕ: Используем `as any` для приведения типа.
  // Это необходимо, так как мы создаем частичный мок, а не полную реализацию
  // сложного объекта, который возвращает useBreakpoints.
  mockUseBreakpoints.mockReturnValue(mockBreakpointsObject as any);

  // Возвращаем ref'ы для управления состоянием в тесте
  return {isMobile, isTablet};
};

describe('useSlider', () => {
  let slider: ReturnType<typeof useSlider>;
  const itemsRef: Ref<SliderItem[] | null> = ref(null);

  // Тестовый компонент для корректной работы хуков onMounted/onUnmounted
  const TestComponent = defineComponent({
    setup() {
      slider = useSlider(itemsRef, config);
      return () => h('div');
    },
  });

  beforeEach(() => {
    document.body.style.overflow = ''; // Сброс стиля перед каждым тестом
    vi.clearAllMocks();
    itemsRef.value = [...mockItems];
    setScreenSize('desktop');
  });

  it('инициализируется корректно', () => {
    mount(TestComponent);
    expect(slider.visibleItems.value.length).toBe(4);
    expect(slider.isPrevDisabled.value).toBe(true);
    expect(slider.isNextDisabled.value).toBe(false);
  });

  it('переключает слайды и обновляет disabled статусы', () => {
    mount(TestComponent);
    slider.goToNext();
    expect(slider.visibleItems.value[0].id).toBe(2);
    expect(slider.isPrevDisabled.value).toBe(false);

    slider.goToPrev();
    expect(slider.visibleItems.value[0].id).toBe(1);
    expect(slider.isPrevDisabled.value).toBe(true);

    // Доходим до конца
    for (let i = 0; i < 6; i++) slider.goToNext();
    expect(slider.isNextDisabled.value).toBe(true);
  });

  it('обрабатывает null в items', async () => {
    mount(TestComponent);
    itemsRef.value = null;
    await nextTick();

    expect(slider.visibleItems.value).toEqual([]);
    expect(slider.isPrevDisabled.value).toBe(true);
    expect(slider.isNextDisabled.value).toBe(true);
  });

  it('корректирует индекс при изменении itemsPerPage', async () => {
    const {isMobile} = setScreenSize('desktop');
    mount(TestComponent);

    for (let i = 0; i < 4; i++) slider.goToNext();
    expect(slider.visibleItems.value[0].id).toBe(5);

    isMobile.value = true;
    await nextTick();

    for (let i = 0; i < 5; i++) slider.goToNext();
    expect(slider.visibleItems.value[0].id).toBe(10);
    expect(slider.isNextDisabled.value).toBe(true);

    isMobile.value = false;
    await nextTick();

    expect(slider.visibleItems.value[0].id).toBe(7);
  });

  it('управляет модальным окном и стилем overflow', async () => {
    mount(TestComponent);
    slider.openModal(mockItems[0]);
    expect(slider.isModalOpen.value).toBe(true);
    expect(slider.selectedItem.value).toEqual(mockItems[0]);
    await nextTick();
    expect(document.body.style.overflow).toBe('hidden');

    slider.closeModal();
    expect(slider.isModalOpen.value).toBe(false);

    await new Promise(r => setTimeout(r, 310));
    expect(document.body.style.overflow).toBe('');
    expect(slider.selectedItem.value).toBe(null);
  });

  it('закрывает модалку по Escape и сбрасывает overflow при unmount', async () => {
    const wrapper = mount(TestComponent, {attachTo: document.body});

    slider.openModal(mockItems[0]);
    await nextTick();
    expect(slider.isModalOpen.value).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    window.dispatchEvent(new KeyboardEvent('keydown', {key: 'Escape'}));
    await nextTick();
    expect(slider.isModalOpen.value).toBe(false);

    slider.openModal(mockItems[0]);
    await nextTick();
    expect(document.body.style.overflow).toBe('hidden');

    wrapper.unmount();
    expect(document.body.style.overflow).toBe('');
  });
});