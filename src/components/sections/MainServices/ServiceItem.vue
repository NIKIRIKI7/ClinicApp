<script
    setup
    lang="ts"
>
import type {PropType} from 'vue';
import type {IService} from '@/types';
import BaseButton from '@/components/ui/Button.vue';

/**
 * @component ServiceItem
 * @description Отображает карточку с детальной информацией о конкретной услуге.
 */
defineProps({
  /**
   * @prop {IService} service - Объект услуги для отображения.
   */
  service: {
    type: Object as PropType<IService>,
    required: true,
  },
});
</script>

<template>
  <div class="service-item">
    <div class="service-item__image-wrapper">
      <img
          :src="service.image"
          :alt="service.title"
          class="service-item__image"
          loading="lazy"
      >
    </div>
    <div class="service-item__content">
      <h3 class="service-item__title">{{ service.title }}</h3>
      <p class="service-item__description">{{ service.description }}</p>
      <div class="service-item__actions">
        <BaseButton
            tag="router-link"
            :to="`/services/${service.slug}`"
            variant="primary"
        >
          ПОДРОБНЕЕ
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<style
    lang="scss"
    scoped
>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.service-item {
  display: flex;
  background-color: $white;
  border-radius: rem(20);
  padding: rem(20);
  gap: rem(30);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @include responsive($breakpoint-tablet) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: rem(20);
  }
}

.service-item__image-wrapper {
  flex-shrink: 0;
  width: rem(250);
  height: rem(250);
  border-radius: rem(15);
  overflow: hidden;

  @include responsive($breakpoint-tablet) {
    width: 100%;
    max-width: rem(300);
    height: auto;
    aspect-ratio: 1 / 1;
  }
}

.service-item__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.service-item__content {
  display: flex;
  flex-direction: column;
}

.service-item__title {
  @include apply-font($font-family-headings, $font-weight-bold, $h3-font-size-md);
  margin-bottom: rem(15);
  text-transform: uppercase;

  @include responsive($breakpoint-tablet) {
    font-size: rem($h3-font-size-sm);
  }
}

.service-item__description {
  @include apply-font($font-family-primary, $font-weight-medium, $font-size-base);
  line-height: 1.6;
  flex-grow: 1;
  margin-bottom: rem(20);
}

.service-item__actions {
  margin-top: auto;
  align-self: flex-end;

  @include responsive($breakpoint-tablet) {
    align-self: center;
  }
}
</style>