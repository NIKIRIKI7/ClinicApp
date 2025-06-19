// Файл: tests/components/sections/Gallery.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {ref, computed} from "vue";
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia, type Pinia} from 'pinia';
import Gallery from '../../../src/components/sections/Gallery.vue';
import {useGalleryStore} from '../../../src/stores/gallery';
import {useSlider} from '../../../src/composables/useSlider';

vi.mock('../../../src/composables/useSlider');
const mockedUseSlider = vi.mocked(useSlider);

describe('Gallery.vue', () => {
  let pinia: Pinia;
  const mockImages = [{id: 1, src: 'a.jpg', alt: 'A'}, {
    id: 2,
    src: 'b.jpg',
    alt: 'B'
  }];
  const mockSliderResult = {
    visibleItems: computed(() => []),
    isPrevDisabled: computed(() => true),
    isNextDisabled: computed(() => true),
    goToPrev: vi.fn(),
    goToNext: vi.fn(),
    isModalOpen: ref(false),
    selectedItem: ref(null),
    openModal: vi.fn(),
    closeModal: vi.fn(),
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    mockedUseSlider.mockClear();
    mockedUseSlider.mockReturnValue(mockSliderResult);
  });

  it('отображает AppLoader во время загрузки', () => {
    const store = useGalleryStore();
    store.isLoading = true;
    const wrapper = mount(Gallery, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppLoader'}).exists()).toBe(true);
  });

  it('отображает AppError при ошибке', () => {
    const store = useGalleryStore();
    store.error = 'Failed to load';
    const wrapper = mount(Gallery, {global: {plugins: [pinia]}});
    expect(wrapper.findComponent({name: 'AppError'}).exists()).toBe(true);
  });

  it('вызывает fetchItems при монтировании', () => {
    const store = useGalleryStore();
    const fetchSpy = vi.spyOn(store, 'fetchItems');
    mount(Gallery, {global: {plugins: [pinia]}});
    expect(fetchSpy).toHaveBeenCalledOnce();
  });

  // НОВЫЙ ТЕСТ: Проверяет условный рендеринг навигации
  it('отображает и скрывает навигацию', async () => {
    const store = useGalleryStore();
    store.isLoading = false;

    // Случай 1: Элементов мало, навигация не нужна
    const fewImages = [{id: 1, src: 'a.jpg', alt: 'A'}];
    store.items = fewImages;
    mockedUseSlider.mockReturnValue({
      ...mockSliderResult,
      visibleItems: computed(() => fewImages), // Все элементы видимы
    });

    const wrapper = mount(Gallery, {global: {plugins: [pinia]}});
    await wrapper.vm.$nextTick();
    expect(wrapper.find('.gallery__navigation').exists()).toBe(false);

    // Случай 2: Элементов много, навигация нужна
    const manyImages = [...mockImages, {id: 3, src: 'c.jpg', alt: 'C'}];
    store.items = manyImages;
    mockedUseSlider.mockReturnValue({
      ...mockSliderResult,
      visibleItems: computed(() => mockImages), // Видимы только первые 2
    });
    // Перемонтируем компонент, чтобы composable подхватил новые данные
    wrapper.unmount();
    const newWrapper = mount(Gallery, {global: {plugins: [pinia]}});
    await newWrapper.vm.$nextTick();
    expect(newWrapper.find('.gallery__navigation').exists()).toBe(true);
  });

  it('рендерит изображения и вызывает useSlider с данными', async () => {
    const store = useGalleryStore();
    store.items = mockImages;
    store.isLoading = false;

    mockedUseSlider.mockReturnValue({
      ...mockSliderResult,
      visibleItems: computed(() => mockImages),
    });

    const wrapper = mount(Gallery, {global: {plugins: [pinia]}});
    await wrapper.vm.$nextTick();

    expect(useSlider).toHaveBeenCalledTimes(1);
    const imageElements = wrapper.findAll('.gallery__image');
    expect(imageElements.length).toBe(2);
  });
});