<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useBreakpoints } from '@vueuse/core';
import { useContentStore } from '@/stores/content.ts';

// Импортируем компоненты стрелок
import arrowLeft from '@/assets/icons/arrow-left.svg?component';
import arrowRight from '@/assets/icons/arrow-right.svg?component';
import type { GalleryImage } from '@/stores/content';

/**
 * @description Конфигурация для адаптивного поведения слайдера.
 */
const ITEMS_PER_PAGE = { MOBILE: 1, TABLET: 3, DESKTOP: 4 } as const;
const BREAKPOINTS_CONFIG = { MOBILE: 426, TABLET: 834 } as const;

// --- Инициализация ---
const contentStore = useContentStore();
const galleryImages = contentStore.galleryImages;
const breakpoints = useBreakpoints(BREAKPOINTS_CONFIG);

// --- Реактивное состояние ---
const isMobile = breakpoints.smaller('MOBILE');
const isTablet = breakpoints.between('MOBILE', 'TABLET');

/**
 * @description Текущий индекс первого видимого элемента в слайдере.
 * @type {import('vue').Ref<number>}
 */
const currentIndex = ref(0);
const isModalOpen = ref(false);
const selectedImage = ref<GalleryImage | null>(null);

/**
 * @description Вычисляет количество видимых элементов на странице в зависимости от ширины экрана.
 * @returns {number}
 */
const itemsPerPage = computed(() => {
  if (isMobile.value) return ITEMS_PER_PAGE.MOBILE;
  if (isTablet.value) return ITEMS_PER_PAGE.TABLET;
  return ITEMS_PER_PAGE.DESKTOP;
});

/**
 * @description Максимально возможный индекс для прокрутки.
 * @returns {number}
 */
const maxIndex = computed(() => Math.max(0, galleryImages.length - itemsPerPage.value));

/**
 * @description Массив изображений, видимых в данный момент.
 * @returns {GalleryImage[]}
 */
const visibleImages = computed(() =>
    galleryImages.slice(currentIndex.value, currentIndex.value + itemsPerPage.value)
);

/**
 * @description Определяет, должна ли быть кнопка "назад" неактивной.
 * @returns {boolean}
 */
const isPrevDisabled = computed(() => currentIndex.value === 0);

/**
 * @description Определяет, должна ли быть кнопка "вперед" неактивной.
 * @returns {boolean}
 */
const isNextDisabled = computed(() => currentIndex.value >= maxIndex.value);


// --- Методы ---

/**
 * @description Переключает слайдер на предыдущую страницу.
 */
const goToPrev = () => {
  if (!isPrevDisabled.value) {
    currentIndex.value = Math.max(0, currentIndex.value - 1);
  }
};

/**
 * @description Переключает слайдер на следующую страницу.
 */
const goToNext = () => {
  if (!isNextDisabled.value) {
    currentIndex.value = Math.min(maxIndex.value, currentIndex.value + 1);
  }
};

const openModal = (image: GalleryImage) => {
  selectedImage.value = image;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedImage.value = null;
};

// --- Watchers и хуки жизненного цикла ---

watch(isModalOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
});

watch(itemsPerPage, () => {
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
});

const handleModalClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) closeModal();
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') closeModal();
};

onMounted(() => {
  window.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  if (isModalOpen.value) {
    document.body.style.overflow = 'auto';
  }
});
</script>

<template>
  <section class="gallery">
    <div class="container">
      <div class="gallery__inner">
        <div class="gallery__content">
          <div class="gallery__viewport">
            <ul class="gallery__list">
              <li
                  v-for="image in visibleImages"
                  :key="image.id"
                  class="gallery__item"
              >
                <button
                    class="gallery__item-button"
                    :aria-label="`Открыть изображение: ${image.alt}`"
                    @click="openModal(image)"
                >
                  <img
                      :src="image.src"
                      :alt="image.alt"
                      class="gallery__image"
                      loading="lazy"
                  />
                </button>
              </li>
            </ul>
          </div>
          <div class="gallery__navigation">
            <button
                class="gallery__nav-button gallery__nav-button--prev"
                :class="{ 'gallery__nav-button--disabled': isPrevDisabled }"
                :disabled="isPrevDisabled"
                @click="goToPrev"
                aria-label="Предыдущее изображение"
            >
              <arrowLeft
                  class="gallery__arrow"
                  aria-hidden="true"
              />
            </button>
            <button
                class="gallery__nav-button gallery__nav-button--next"
                :class="{ 'gallery__nav-button--disabled': isNextDisabled }"
                :disabled="isNextDisabled"
                @click="goToNext"
                aria-label="Следующее изображение"
            >
              <arrowRight
                  class="gallery__arrow"
                  aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div
          v-if="isModalOpen"
          class="gallery__modal"
          @click="handleModalClick"
      >
        <div class="gallery__modal-content">
          <button
              class="gallery__modal-close"
              @click="closeModal"
              aria-label="Закрыть модальное окно"
          >
            ×
          </button>
          <img
              v-if="selectedImage"
              :src="selectedImage.src"
              :alt="selectedImage.alt"
              class="gallery__modal-image"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.gallery {
  &__content {
    display: flex;
    flex-direction: column;
    gap: rem(40);
    width: 100%;
    background-color: $white;
    border-radius: rem(30);
    padding: rem(40);
    @include responsive($breakpoint-tablet) {
      padding: rem(30);
    }
    @include responsive($breakpoint-mobile) {
      padding: rem(20);
      gap: rem(30);
    }
  }

  &__list {
    display: grid;
    gap: rem(30);
    list-style: none;
    padding: 0;
    margin: 0;
    grid-template-columns: repeat(4, 1fr);
    @include responsive($breakpoint-tablet) {
      grid-template-columns: repeat(3, 1fr);
      gap: rem(20);
    }
    @include responsive($breakpoint-mobile) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  &__item-button {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: rem(20);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    @include on-event {
      transform: translateY(rem(-5));
      box-shadow: 0 rem(8) rem(20) rgba(0, 0, 0, 0.12);
    }

    &:focus-visible {
      outline: rem(3) solid $accent-color;
      outline-offset: rem(3);
    }
  }

  &__image {
    display: block;
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: rem(20);
  }

  &__navigation {
    @include flex-center;
    gap: rem(20);
  }

  &__nav-button {
    @include flex-center;
    flex-shrink: 0;
    width: rem(60);
    height: rem(60);
    border-radius: 50%;
    border: none;
    background-color: $accent-color;
    color: $white;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    @include on-event {
      &:not(:disabled) {
        transform: scale(1.05);
        background-color: darken($accent-color, 8%);
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background-color: $accent-color;
      transform: none;
    }

    @include responsive($breakpoint-mobile) {
      width: rem(50);
      height: rem(50);
    }
  }

  &__arrow {
    width: rem(24);
    height: rem(24);
  }

  // --- Стили модального окна (без изменений) ---
  &__modal {
    position: fixed;
    z-index: z('modal');
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    @include flex-center;
    animation: fadeIn 0.3s ease;
  }

  &__modal-content {
    position: relative;
    max-width: 90vw;
    max-height: 90vh;
    animation: scaleIn 0.3s ease;
  }

  &__modal-image {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: rem(12);
  }

  &__modal-close {
    @include flex-center;
    position: absolute;
    top: rem(-15);
    right: rem(-15);
    width: rem(40);
    height: rem(40);
    border-radius: 50%;
    border: none;
    background-color: $white;
    font-size: rem(24);
    font-weight: $font-weight-bold;
    line-height: 1;
    color: $text-color-dark;
    cursor: pointer;
    box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.2);
    transition: all 0.2s ease;

    @include on-event {
      transform: scale(1.1) rotate(90deg);
      background-color: $accent-color;
      color: $white;
    }
    @include responsive($breakpoint-mobile) {
      top: 0;
      right: 0;
      transform: translate(30%, -30%);
    }
  }
}

// Анимации для модального окна
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scaleIn {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>