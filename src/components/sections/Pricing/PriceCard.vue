<script setup lang="ts">
import type { PropType } from 'vue';
import type { IPricingItem } from '@/types';

defineProps({
  item: {
    type: Object as PropType<IPricingItem>,
    required: true,
  },
});
</script>

<template>
  <router-link :to="`/prices/${item.slug}`" class="price-card">
    <div class="price-card__main">
      <h3 class="price-card__title">{{ item.title }}</h3>
      <p class="price-card__price">от {{ item.price }} руб.</p>
    </div>
    <div class="price-card__icon-wrapper">
      <svg class="price-card__icon" width="14" height="17" viewBox="0 0 14 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M7 1V16M7 16L1 10.1667M7 16L13 10.1667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </div>
  </router-link>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.price-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(20px) rem(25px);
  background-color: $white;
  border-radius: rem(20px);
  border: 1px solid #F0F0F0;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03);
  text-decoration: none;
  transition: box-shadow 0.3s ease, transform 0.3s ease;

  &:hover {
    box-shadow: 0 8px 25px rgba(48, 63, 123, 0.1);
    transform: translateY(-5px);
  }
}

.price-card__main {
  // No specific styles needed, flexbox handles it
}

.price-card__title {
  font-size: rem(20px);
  font-weight: 600;
  margin: 0 0 rem(8px) 0;
  line-height: 1.3;
}

.price-card__price {
  font-size: rem($font-size-base);
  margin: 0;
}

.price-card__icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: rem(48px);
  height: rem(48px);
  background-color: #6A9799;
  border-radius: 50%;
  margin-left: rem(16px);
  transition: background-color 0.3s ease;

  .price-card:hover & {
    // A slightly darker shade on hover
    background-color: #598284;
  }
}
</style>