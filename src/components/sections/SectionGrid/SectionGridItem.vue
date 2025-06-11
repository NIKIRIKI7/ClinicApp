<script setup lang="ts">
import type { PropType } from 'vue';
import type { SectionGridItemData } from '@/stores/content';

/**
 * @component SectionGridItem
 * @description Отображает одну визуальную карточку в навигационной сетке.
 */
defineProps({
  item: {
    type: Object as PropType<SectionGridItemData>,
    required: true,
  },
});
</script>

<template>
  <div class="section-grid-card">
    <span class="section-grid-card__text">{{ item.text }}</span>
    <div class="section-grid-card__icon-wrapper">
      <component
          :is="item.icon"
          class="section-grid-card__icon"
          aria-hidden="true"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;

.section-grid-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: $white;
  border-radius: rem(24);
  padding: rem(10, 24);
  box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.05);
  height: rem(90);

  @include responsive($breakpoint-tablet) {
    height: rem(85);
    padding: rem(10, 18);
  }

  &__text {
    @include apply-font($font-family-primary, $font-weight-semibold, 14px);
    color: $text-color-dark;
    text-transform: uppercase;
    line-height: 1.3;
    margin-right: rem(16);

    @include responsive($breakpoint-mobile) {
      margin-right: 0;
    }
  }

  &__icon-wrapper {
    @include flex-center;
    flex-shrink: 0;
    width: rem(60);
    height: rem(60);
    background-color: $accent-color;
    border-radius: rem(14);

    @include responsive($breakpoint-mobile) {
      margin-left: 0;
    }
  }

  &__icon {
    width: rem(36);
    height: rem(36);
    color: $white;
  }
}
</style>