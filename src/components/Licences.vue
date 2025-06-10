<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';
import { useBreakpoints } from '@vueuse/core'; // 1. Импортируем useBreakpoints
import { useContentStore } from '@/stores/content';

import Button from '@/components/ui/Button.vue';
import arrowLeft from '@/assets/icons/arrow-left.svg?component';
import arrowRight from '@/assets/icons/arrow-right.svg?component';

const contentStore = useContentStore();
const licenses = contentStore.licenses;

// 2. Определяем константы для брейкпоинтов и количества элементов
const BREAKPOINTS_CONFIG = { MOBILE: 400, TABLET: 834 } as const;
const ITEMS_PER_PAGE = { MOBILE: 2, TABLET: 3, DESKTOP: 4 } as const;

// 3. Используем useBreakpoints для декларативного отслеживания ширины экрана
const breakpoints = useBreakpoints(BREAKPOINTS_CONFIG);
const isMobile = breakpoints.smaller('MOBILE'); // true если < 400px
const isTablet = breakpoints.between('MOBILE', 'TABLET'); // true если между 400px и 834px

const currentIndex = ref(0);
const isModalOpen = ref(false);
const selectedLicense = ref<typeof licenses[number] | null>(null);

// 4. `itemsPerPage` теперь реактивно зависит от `useBreakpoints`
const itemsPerPage = computed(() => {
  if (isMobile.value) return ITEMS_PER_PAGE.MOBILE;
  if (isTablet.value) return ITEMS_PER_PAGE.TABLET;
  return ITEMS_PER_PAGE.DESKTOP;
});

const maxIndex = computed(() => Math.max(0, licenses.length - itemsPerPage.value));
const visibleLicenses = computed(() => licenses.slice(currentIndex.value, currentIndex.value + itemsPerPage.value));
const isPrevDisabled = computed(() => currentIndex.value === 0);
const isNextDisabled = computed(() => currentIndex.value >= maxIndex.value);

// 5. Централизованно управляем стилем body через `watch`
watch(isModalOpen, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : 'auto';
});

// 6. Сбрасываем индекс, если изменилось количество видимых элементов
watch(itemsPerPage, () => {
  if (currentIndex.value > maxIndex.value) {
    currentIndex.value = maxIndex.value;
  }
});

const goToPrev = () => {
  if (currentIndex.value > 0) currentIndex.value--;
};

const goToNext = () => {
  if (currentIndex.value < maxIndex.value) currentIndex.value++;
};

const openModal = (license: typeof licenses[number]) => {
  selectedLicense.value = license;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedLicense.value = null;
};

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
  <section class="licenses">
    <div class="container">
      <div class="licenses__inner">
        <div class="licenses__content">
          <h2 class="licenses__title">Лицензии</h2>
          <div class="licenses__slider">
            <button
                class="licenses__nav-button licenses__nav-button--prev"
                :class="{ 'licenses__nav-button--disabled': isPrevDisabled }"
                :disabled="isPrevDisabled"
                @click="goToPrev"
                aria-label="Предыдущий документ"
            >
              <arrowLeft
                  class="licenses__arrow"
                  aria-hidden="true"
              />
            </button>
            <div class="licenses__viewport">
              <ul class="licenses__list">
                <li
                    v-for="license in visibleLicenses"
                    :key="license.id"
                    class="licenses__item"
                >
                  <button
                      class="licenses__item-button"
                      :aria-label="`Открыть лицензию: ${license.alt}`"
                      @click="openModal(license)"
                  >
                    <img
                        :src="license.src"
                        :alt="license.alt"
                        class="licenses__image"
                    />
                  </button>
                </li>
              </ul>
            </div>
            <button
                class="licenses__nav-button licenses__nav-button--next"
                :class="{ 'licenses__nav-button--disabled': isNextDisabled }"
                :disabled="isNextDisabled"
                @click="goToNext"
                aria-label="Следующий документ"
            >
              <arrowRight
                  class="licenses__arrow"
                  aria-hidden="true"
              />
            </button>
          </div>
          <Button
              href="#"
              class="licenses__button"
          >
            ПЕРЕЙТИ В РАЗДЕЛ «ПРАВОВАЯ ИНФОРМАЦИЯ»
          </Button>
        </div>
      </div>
    </div>
    <Teleport to="body">
      <div
          v-if="isModalOpen"
          class="licenses__modal"
          @click="handleModalClick"
      >
        <div class="licenses__modal-content">
          <button
              class="licenses__modal-close"
              @click="closeModal"
              aria-label="Закрыть модальное окно"
          > ×
          </button>
          <img
              v-if="selectedLicense"
              :src="selectedLicense.src"
              :alt="selectedLicense.alt"
              class="licenses__modal-image"
          />
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style
    lang="scss"
    scoped
>
@use '../assets/scss/abstracts/variables' as *;
@use '../assets/scss/abstracts/mixins' as *;

.licenses {
  padding: rem(80) 0;
  background-color: $light-gray;

  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: rem(40);
  }

  &__title {
    align-self: flex-start;
    width: 100%;
  }

  &__slider {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $white;
    border-radius: rem(30);
    padding: rem(33) rem(40);
    box-shadow: 0 rem(4) rem(25) rgba(0, 0, 0, 0.07);
    @include responsive($breakpoint-tablet) {
      padding: rem(41) rem(43);
    }
    @include responsive($breakpoint-mobile) {
      padding: rem(10) rem(10);
    }
  }

  &__viewport {
    overflow: hidden;
    flex-grow: 1;
  }

  &__list {
    display: flex;
    justify-content: center;
    gap: rem(50);
    list-style: none;
    padding: 0;
    margin: 0;
    transition: transform 0.3s ease;
    @include responsive($breakpoint-desktop) {
      gap: rem(30);
    }
    @include responsive($breakpoint-tablet) {
      gap: rem(20);
    }
  }

  &__item-button {
    background: none;
    border: none;
    padding: 0;
    margin: 0;
    cursor: pointer;
    display: block;
    border-radius: rem(8);
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
      transform: scale(1.02);
      box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.15);
    }

    &:focus-visible {
      outline: rem(3) solid $accent-color;
      outline-offset: rem(3);
    }
  }

  &__image {
    display: block;
    aspect-ratio: 144 / 181;
    object-fit: cover;
    width: rem(144);
    border-radius: rem(8);
    @include responsive($breakpoint-tablet) {
      width: rem(130);
    }
    @include responsive($breakpoint-mobile) {
      width: rem(85);
    }
  }

  &__nav-button {
    @include flex-center;
    flex-shrink: 0;
    background-color: $accent-color;
    border-radius: 50%;
    color: $white;
    border: none;
    cursor: pointer;
    width: rem(60);
    height: rem(60);
    transition: transform 0.2s ease, width 0.3s ease, height 0.3s ease, opacity 0.2s ease;
    @include on-event {
      &:not(:disabled) {
        transform: scale(1.05);
      }
    }

    &--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      @include on-event {
        transform: none;
      }
    }

    @include responsive($breakpoint-tablet) {
      width: rem(53);
      height: rem(53);
    }
    @include responsive($breakpoint-mobile) {
      width: rem(40);
      height: rem(40);
    }
  }

  &__arrow {
    width: rem(24);
  }

  &__modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.8);
    @include flex-center;
    z-index: z('modal');
    animation: fadeIn 0.3s ease;
  }

  &__modal-content {
    position: relative;
    max-width: 95vw;
    max-height: 95vh;
    animation: scaleIn 0.3s ease;
  }

  &__modal-image {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: rem(12);
    box-shadow: 0 rem(10) rem(40) rgba(0, 0, 0, 0.3);
  }

  &__modal-close {
    @include flex-center;
    position: absolute;
    top: rem(-15);
    right: rem(-15);
    width: rem(40);
    height: rem(40);
    background-color: $white;
    border: none;
    border-radius: 50%;
    font-size: rem(24);
    font-weight: $font-weight-bold;
    color: $text-color-dark;
    cursor: pointer;
    box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.2);
    transition: transform 0.2s ease, background-color 0.2s ease;
    @include on-event {
      transform: scale(1.1);
      background-color: $accent-color;
      color: $white;
    }
    @include responsive($breakpoint-mobile) {
      width: rem(35);
      height: rem(35);
      font-size: rem(20);
      top: rem(-12);
      right: rem(-12);
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}
</style>