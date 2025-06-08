<script
    setup
    lang="ts"
>

</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__inner">
        <div class="footer__content">
          <div class="footer__text">
            <p class="footer__disclaimer">
              ИМЕЮТСЯ ПРОТИВОПОКАЗАНИЯ.<br>
              НЕОБХОДИМА КОНСУЛЬТАЦИЯ СПЕЦИАЛИСТА
            </p>
            <p class="footer__copyright">
              © 2025 ООО «ГК РТ-Клиника» ИНН 1102334455
            </p>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
@use '../assets/scss/abstracts/variables' as *;
@use '../assets/scss/abstracts/mixins' as *;
.footer {
  padding: 70px 0 46px 0;
  background-color: $secondary-color;
  color: $white;

  @include responsive($breakpoint-tablet) {
    padding: 37px 0 41px 0;
  }
  @include responsive($breakpoint-mobile) {
    padding: 45px 0 41px 0;
  }

  &__text {
    display: grid;
    gap: 4px;

    @include responsive($breakpoint-tablet) {
      gap: 13px;
    }
    @include responsive($breakpoint-mobile) {
      gap: 2px;
    }
  }

  &__disclaimer {
    letter-spacing: 5px;

    @include responsive($breakpoint-mobile) {
      font-size: rem(10px);
    }
  }

  &__copyright {
    font-size: rem($font-size-sm);

    @include responsive($breakpoint-mobile) {
      font-size: rem(8px);
    }
  }
}
</style>