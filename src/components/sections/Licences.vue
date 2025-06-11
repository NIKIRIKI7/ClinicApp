<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useContentStore } from '@/stores/content';
import { useSlider } from '@/composables/useSlider';

import AppModal from '@/components/ui/AppModal.vue';
import Button from '@/components/ui/Button.vue';
import arrowLeft from '@/assets/icons/arrow-left.svg?component';
import arrowRight from '@/assets/icons/arrow-right.svg?component';

const contentStore = useContentStore();
// storeToRefs здесь важен, чтобы licenses оставался реактивным
const { licenses } = storeToRefs(contentStore);

// Вызываем наш Composable, передавая ему данные и уникальную конфигурацию
const {
  visibleItems: visibleLicenses,
  isPrevDisabled,
  isNextDisabled,
  goToPrev,
  goToNext,
  isModalOpen,
  selectedItem: selectedLicense,
  openModal,
  closeModal,
} = useSlider(licenses, {
  itemsPerPage: { MOBILE: 2, TABLET: 3, DESKTOP: 4 },
  breakpoints: { MOBILE: 400, TABLET: 834 },
});
</script>

<template>
  <section class="licenses">
    <div class="container">
      <div class="licenses__content">
        <h2 class="licenses__title">Лицензии</h2>
        <div class="licenses__slider">
          <button
              class="licenses__nav-button"
              :disabled="isPrevDisabled"
              @click="goToPrev"
              aria-label="Предыдущий документ"
          >
            <arrowLeft class="licenses__arrow" aria-hidden="true" />
          </button>
          <div class="licenses__viewport">
            <ul class="licenses__list">
              <li v-for="license in visibleLicenses" :key="license.id" class="licenses__item">
                <button
                    class="licenses__item-button"
                    :aria-label="`Открыть лицензию: ${license.alt}`"
                    @click="openModal(license)"
                >
                  <img :src="license.src" :alt="license.alt" class="licenses__image" />
                </button>
              </li>
            </ul>
          </div>
          <button
              class="licenses__nav-button"
              :disabled="isNextDisabled"
              @click="goToNext"
              aria-label="Следующий документ"
          >
            <arrowRight class="licenses__arrow" aria-hidden="true" />
          </button>
        </div>
        <Button href="#">ПЕРЕЙТИ В РАЗДЕЛ «ПРАВОВАЯ ИНФОРМАЦИЯ»</Button>
      </div>
    </div>
    <AppModal :is-open="isModalOpen" :item="selectedLicense" @close="closeModal" />
  </section>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.licenses {
  padding: rem(80) 0;
  background-color: $light-gray;
}
.licenses__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: rem(40);
}
.licenses__title {
  align-self: flex-start;
  width: 100%;
}
.licenses__slider {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: $white;
  border-radius: rem(30);
  padding: rem(33) rem(40);
  gap: rem(20);
  box-shadow: 0 rem(4) rem(25) rgba(0, 0, 0, 0.07);
}
.licenses__viewport {
  overflow: hidden;
  flex-grow: 1;
}
.licenses__list {
  display: flex;
  justify-content: center;
  gap: rem(50);
  list-style: none;
  padding: 0;
  margin: 0;
}
.licenses__item-button {
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  border-radius: rem(8);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.15);
  }
}
.licenses__image {
  display: block;
  aspect-ratio: 144 / 181;
  object-fit: cover;
  width: rem(144);
  border-radius: rem(8);
}
.licenses__nav-button {
  @include flex-center;
  flex-shrink: 0;
  background-color: $accent-color;
  border-radius: 50%;
  color: $white;
  border: none;
  cursor: pointer;
  width: rem(60);
  height: rem(60);
  transition: opacity 0.2s ease, transform 0.2s ease;
  &:not(:disabled):hover {
    transform: scale(1.05);
  }
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
.licenses__arrow {
  width: rem(24);
}
</style>