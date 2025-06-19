<script
    setup
    lang="ts"
>
const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  href: {
    type: String,
    default: '#',
  },
  /**
   * @description Визуальный стиль кнопки.
   * @type {'primary' | 'secondary'}
   */
  variant: {
    type: String,
    default: 'primary',
    validator: (value: string) => ['primary', 'secondary'].includes(value),
  },
});
</script>

<template>
  <component
      :is="tag"
      :href="tag === 'a' ? href : undefined"
      :class="['base-button', `base-button--${props.variant}`]"
  >
    <slot />
  </component>
</template>

<style
    lang="scss"
    scoped
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.base-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, transform 0.2s ease;
  box-sizing: border-box;
  line-height: 1.2;
  font-family: $font-family-primary;
  font-weight: $font-weight-semibold;
  font-size: rem($font-size-base);

  &:active {
    transform: translateY(0);
  }

  @include responsive($breakpoint-mobile) {
    font-size: rem(10px);
    font-weight: $font-weight-medium;
  }
}

.base-button--primary {
  padding: rem(19px) rem(33px);
  border-radius: rem(100px);
  background-color: $accent-color;
  color: $text-color-light;

  @include on-event {
    background-color: color.adjust($accent-color, $lightness: -5%);
    transform: translateY(-2px);
  }

  &:active {
    background-color: color.adjust($accent-color, $lightness: -8%);
  }

  @include responsive($breakpoint-mobile) {
    padding: rem(10px);
  }
}

.base-button--secondary {
  padding: rem(20px) rem(40px);
  border-radius: rem(900px);
  background: $white;
  color: $text-color-dark;

  @include on-event {
    background-color: color.adjust($white, $lightness: -6%);
    transform: translateY(-2px);
  }

  &:active {
    background-color: color.adjust($white, $lightness: -12%);
  }
}
</style>