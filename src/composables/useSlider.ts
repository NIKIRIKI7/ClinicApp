import { ref, computed, watch, onMounted, onUnmounted, type Ref } from 'vue';
import { useBreakpoints } from '@vueuse/core';

// --- Конфигурация, которую будет принимать наша функция ---
interface ItemsPerPageConfig {
  MOBILE: number;
  TABLET: number;
  DESKTOP: number;
}

interface BreakpointsConfig {
  MOBILE: number;
  TABLET: number;
}

interface SliderConfig {
  itemsPerPage: ItemsPerPageConfig;
  breakpoints: BreakpointsConfig;
}

// --- Типизация входных данных ---
// <T> - это "дженерик". Он позволяет нам создать функцию, которая будет работать
// с любым типом данных (лицензии, галерея), если у них есть обязательные поля id, src, alt.
export type SliderItem = { id: number; src: string; alt: string };

/**
 * @composable useSlider
 * @description Управляет логикой адаптивного слайдера и связанного с ним модального окна.
 * @param items - Реактивная ссылка (ref) на массив элементов для отображения.
 * @param config - Объект конфигурации с брейкпоинтами и количеством элементов на страницу.
 */
export function useSlider<T extends SliderItem>(items: Ref<T[]>, config: SliderConfig) {
  // --- ЛОГИКА АДАПТИВНОСТИ ---
  const breakpoints = useBreakpoints(config.breakpoints);
  const isMobile = breakpoints.smaller('MOBILE');
  const isTablet = breakpoints.between('MOBILE', 'TABLET');

  const itemsPerPage = computed(() => {
    if (isMobile.value) return config.itemsPerPage.MOBILE;
    if (isTablet.value) return config.itemsPerPage.TABLET;
    return config.itemsPerPage.DESKTOP;
  });

  // --- ЛОГИКА СЛАЙДЕРА ---
  const currentIndex = ref(0);
  const maxIndex = computed(() => Math.max(0, items.value.length - itemsPerPage.value));
  const visibleItems = computed(() => items.value.slice(currentIndex.value, currentIndex.value + itemsPerPage.value));
  const isPrevDisabled = computed(() => currentIndex.value === 0);
  const isNextDisabled = computed(() => currentIndex.value >= maxIndex.value);

  const goToPrev = () => {
    if (!isPrevDisabled.value) currentIndex.value--;
  };
  const goToNext = () => {
    if (!isNextDisabled.value) currentIndex.value++;
  };

  // --- ЛОГИКА МОДАЛЬНОГО ОКНА ---
  const isModalOpen = ref(false);
  const selectedItem = ref<T | null>(null);

  const openModal = (item: T) => {
    selectedItem.value = item;
    isModalOpen.value = true;
  };

  const closeModal = () => {
    isModalOpen.value = false;
    // Обнуляем выбранный элемент после анимации закрытия, чтобы избежать "дергания"
    setTimeout(() => {
      selectedItem.value = null;
    }, 300);
  };

  // --- WATCHERS И ХУКИ ЖИЗНЕННОГО ЦИКЛА ---

  watch(isModalOpen, (isOpen) => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
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
    document.body.style.overflow = 'auto'; // Всегда очищаем стили при уничтожении компонента
  });

  // Возвращаем все переменные и функции, которые понадобятся в компонентах
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