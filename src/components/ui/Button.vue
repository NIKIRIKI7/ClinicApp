<script
    setup
    lang="ts"
>
defineProps({
  tag: {
    type: String,
    default: 'a',
  },
  href: {
    type: String,
    default: '#',
  },
});
</script>

<template>
  <component
      :is="tag"
      :href="tag === 'a' ? href : undefined"
      class="base-button"
  >
    <slot />
  </component>
</template>

<style
    lang="scss"
    scoped
>
// Подключаем переменные и миксины
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 100px;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease, padding 0.3s ease, height 0.3s ease;
  background-color: $accent-color;
  color: $text-color-light;
  box-sizing: border-box;
  line-height: 1.2;

  padding: 19px 33px;
  font-family: $font-family-primary;
  font-weight: $font-weight-semibold;
  font-size: rem($font-size-base);

  &:hover {
    background-color: color.adjust($accent-color, $lightness: -5%);
    transform: translateY(-2px);
  }

  &:active {
    background-color: color.adjust($accent-color, $lightness: -8%);
    transform: translateY(0);
  }

  @include responsive($breakpoint-mobile) {
    padding: 9px 14px;
    font-size: rem($font-size-sm);
  }
}
</style>