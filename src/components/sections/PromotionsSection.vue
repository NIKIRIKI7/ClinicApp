<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {usePromotionsStore} from '@/stores/promotions';
import AppLoader from "@/components/ui/AppLoader.vue";
import AppError from "@/components/ui/AppError.vue";

/**
 * @component PromotionsSection
 * @description Секция для отображения текущих акций клиники.
 */

const promotionsStore = usePromotionsStore();
const {items: promotions, isLoading, error} = storeToRefs(promotionsStore);

onMounted(() => {
  promotionsStore.fetchItems();
});
</script>

<template>
  <section class="promotions">
    <div class="container">
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <div
          v-else-if="promotions && promotions.length > 0"
          class="promotions__content"
      >
        <ul class="promotions__list">
          <li
              v-for="promotion in promotions"
              :key="promotion.id"
              class="promotions__item"
          >
            <article class="promotion-card">
              <div class="promotion-card__image-wrapper">
                <img
                    :src="promotion.image"
                    :alt="promotion.alt"
                    class="promotion-card__image"
                    loading="lazy"
                >
              </div>
              <div class="promotion-card__body">
                <span class="promotion-card__date">{{ promotion.date }}</span>
                <h3 class="promotion-card__title">
                  {{ promotion.title }}
                </h3>
                <p class="promotion-card__description">
                  {{ promotion.description }}
                </p>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style
    lang="scss"
    scoped
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.promotions {
  padding: rem(48) 0;
}

.promotions__content {
  display: flex;
  flex-direction: column;
  gap: rem(40);
}

.promotions__list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: rem(30);

  @include responsive($breakpoint-tablet) {
    grid-template-columns: repeat(2, 1fr);
    gap: rem(20);
  }

  @include responsive($breakpoint-mobile) {
    grid-template-columns: 1fr;
    gap: rem(15);
  }
}

.promotion-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: $white;
  border-radius: rem(20);
  box-shadow: 0 rem(4) rem(20) rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  @include on-event {
    transform: translateY(rem(-5));
    box-shadow: 0 rem(8) rem(25) rgba(0, 0, 0, 0.12);
  }
}

.promotion-card__image-wrapper {
  aspect-ratio: 300 / 180;
  overflow: hidden;
}

.promotion-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.promotion-card__body {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: rem(20) rem(24);
  gap: rem(10);
}

.promotion-card__date {
  @include apply-font($font-family-primary, $font-weight-medium, 12px);
  color: $secondary-color;
  line-height: 1.2;
}

.promotion-card__title {
  @include apply-font($font-family-headings, $font-weight-semibold, 20px);
  line-height: 1.2;
  margin-bottom: rem(5);
}

.promotion-card__description {
  @include apply-font($font-family-primary, $font-weight-medium, 14px);
  line-height: 1.4;
  color: $text-color-dark;
}
</style>