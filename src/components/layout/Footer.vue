<!-- src/components/layout/Footer.vue -->
<script
    setup
    lang="ts"
>
import {useLayoutStore} from '@/stores/layout';

interface Props {
  theme?: 'dark' | 'light'
}

withDefaults(defineProps<Props>(), {
  theme: 'dark',
});

const layoutStore = useLayoutStore();

</script>

<template>
  <footer
      class="footer"
      :class="`footer--${theme}`"
  >
    <div class="container">
      <div class="footer__inner">
        <div class="footer__content">
          <div class="footer__text">
            <p class="footer__disclaimer">{{ layoutStore.footer.disclaimer }}</p>
            <p class="footer__copyright">{{ layoutStore.fullCopyright }}</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style
    lang="scss"
    scoped
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.footer {
  &__inner {
    padding: rem(70) 0 rem(46);
    @include responsive($breakpoint-tablet) {
      padding: rem(37) 0 rem(41);
    }
    @include responsive($breakpoint-mobile) {
      padding: rem(45) 0 rem(41);
    }
  }

  &--dark {
    background-color: $secondary-color;
    color: $text-color-light;
  }

  &--light {
    background-color: $light-gray;
    color: $primary-color;
  }

  &__text {
    display: grid;
    gap: rem(4);
    @include responsive($breakpoint-tablet) {
      gap: rem(13);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(2);
    }
  }

  &__disclaimer {
    @include apply-font($font-family-primary, $font-weight-medium, $font-size-base);
    letter-spacing: rem(5);
    white-space: pre-line;
    @include responsive($breakpoint-mobile) {
      font-size: rem(10);
    }
  }

  &__copyright {
    @include apply-font($font-family-primary, $font-weight-medium, $font-size-sm);
    @include responsive($breakpoint-mobile) {
      font-size: rem($font-size-xs);
    }
  }
}
</style>