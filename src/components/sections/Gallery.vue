<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useGalleryStore} from '@/stores/gallery';
import {useSlider} from '@/composables/useSlider';

import AppModal from '@/components/ui/AppModal.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';
import arrowLeft from '@/assets/icons/arrow-left.svg?component';
import arrowRight from '@/assets/icons/arrow-right.svg?component';

const galleryStore = useGalleryStore();
// ИСПРАВЛЕНИЕ: Получены isLoading и error для управления состоянием
const {items: galleryImages, isLoading, error} = storeToRefs(galleryStore);

// ИСПРАВЛЕНИЕ: Данные запрашиваются при монтировании компонента
onMounted(() => {
  galleryStore.fetchItems();
});

const {
  visibleItems: visibleImages,
  isPrevDisabled,
  isNextDisabled,
  goToPrev,
  goToNext,
  isModalOpen,
  selectedItem: selectedImage,
  openModal,
  closeModal,
} = useSlider(galleryImages, {
  itemsPerPage: {MOBILE: 1, TABLET: 3, DESKTOP: 4},
  breakpoints: {MOBILE: 426, TABLET: 834},
});
</script>

<template>
  <section class="gallery">
    <div class="container">
      <!-- ИСПРАВЛЕНИЕ: Добавлена обработка состояний загрузки и ошибки -->
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <div
          v-else-if="galleryImages && galleryImages.length"
          class="gallery__content"
      >
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
                >
              </button>
            </li>
          </ul>
        </div>
        <div
            v-if="visibleImages.length < galleryImages.length"
            class="gallery__navigation"
        >
          <button
              class="gallery__nav-button"
              :disabled="isPrevDisabled"
              aria-label="Предыдущее изображение"
              @click="goToPrev"
          >
            <arrowLeft
                class="gallery__arrow"
                aria-hidden="true"
            />
          </button>
          <button
              class="gallery__nav-button"
              :disabled="isNextDisabled"
              aria-label="Следующее изображение"
              @click="goToNext"
          >
            <arrowRight
                class="gallery__arrow"
                aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </div>
    <AppModal
        :is-open="isModalOpen"
        variant="image"
        @close="closeModal"
    >
      <img
          v-if="selectedImage"
          :src="selectedImage.src"
          :alt="selectedImage.alt"
          class="gallery__modal-image"
      >
    </AppModal>
  </section>
</template>

<style
    lang="scss"
    scoped
>
/* Стили без изменений */
@use 'sass:color';
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.gallery {
  padding: rem(80) 0;
}

.gallery__content {
  display: flex;
  flex-direction: column;
  gap: rem(40);
  width: 100%;
}

.gallery__viewport {
  overflow: hidden;
}

.gallery__list {
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
    grid-template-columns: 1fr;
    gap: rem(15);
  }
}

.gallery__item-button {
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
}

.gallery__image {
  display: block;
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  border-radius: rem(20);
}

.gallery__navigation {
  @include flex-center;
  gap: rem(20);
}

.gallery__nav-button {
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

  &:not(:disabled):hover {
    transform: scale(1.05);
    background-color: color.adjust($accent-color, $lightness: -8%);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

.gallery__arrow {
  width: rem(24);
  height: rem(24);
}

.gallery__modal-image {
  @include modal-image;
}
</style>