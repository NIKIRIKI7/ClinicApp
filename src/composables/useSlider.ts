import {ref, computed, watch, onMounted, onUnmounted, type Ref} from 'vue';
import {useBreakpoints} from '@vueuse/core';

interface ItemsPerPageConfig {
  MOBILE: number;
  TABLET: number;
  DESKTOP: number;
}

interface BreakpointsConfig {
  MOBILE: number;
  TABLET: number;
}

export interface SliderConfig {
  itemsPerPage: {
    MOBILE: number;
    TABLET: number;
    DESKTOP: number;
  };
  breakpoints: {
    MOBILE: number;
    TABLET: number;
  };
}

export type SliderItem = { id: number; src: string; alt: string };

/**
 @composable useSlider
 @description Управляет логикой адаптивного слайдера и связанного с ним модального окна.
 @param {Ref<T[]>} items - Реактивная ссылка (ref) на массив элементов для отображения.
 @param {SliderConfig} config - Объект конфигурации с брейкпоинтами и количеством элементов на страницу.
 */
export function useSlider<T extends SliderItem>(items: Ref<T[] | null>, config: SliderConfig) {
  const breakpoints = useBreakpoints({
    tablet: config.breakpoints.MOBILE,
    desktop: config.breakpoints.TABLET
  });
  const isMobile = breakpoints.smaller('tablet');
  const isTablet = breakpoints.between('tablet', 'desktop');

  const itemsPerPage = computed(() => {
    if (isMobile.value) return config.itemsPerPage.MOBILE;
    if (isTablet.value) return config.itemsPerPage.TABLET;
    return config.itemsPerPage.DESKTOP;
  });

  const currentIndex = ref(0);

  // ИСПРАВЛЕНИЕ: Добавлена проверка на null
  const maxIndex = computed(() => {
    if (!items.value) return 0;
    return Math.max(0, items.value.length - itemsPerPage.value);
  });

  // ИСПРАВЛЕНИЕ: Добавлена проверка на null
  const visibleItems = computed(() => {
    if (!items.value) return [];
    return items.value.slice(currentIndex.value, currentIndex.value + itemsPerPage.value);
  });

  const isPrevDisabled = computed(() => currentIndex.value === 0);
  const isNextDisabled = computed(() => currentIndex.value >= maxIndex.value);

  const goToPrev = () => {
    if (!isPrevDisabled.value) currentIndex.value--;
  };

  const goToNext = () => {
    if (!isNextDisabled.value) currentIndex.value++;
  };

  const isModalOpen = ref(false);
  const selectedItem = ref<T | null>(null);

  const openModal = (item: T) => {
    selectedItem.value = item;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    setTimeout(() => {
      selectedItem.value = null;
    }, 300);
  };

  watch(isModalOpen, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  watch(itemsPerPage, () => {
    if (currentIndex.value > maxIndex.value) {
      currentIndex.value = maxIndex.value;
    }
  });

  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape' && isModalOpen.value) {
      closeModal();
    }
  };

  onMounted(() => window.addEventListener('keydown', handleKeydown));
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
  });

  return {
    visibleItems,
    isPrevDisabled,
    isNextDisabled,
    goToPrev,
    goToNext,
    isModalOpen,
    selectedItem,
    openModal,
    closeModal,
  };
}