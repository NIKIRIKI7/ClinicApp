<template>
  <div
      class="app-loader"
      role="status"
      aria-label="Загрузка данных"
  >
    <div class="app-loader__spinner"></div>
  </div>
</template>

<style
    scoped
    lang="scss"
>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.app-loader {
  @include flex-center;
  padding: rem(40);
}

.app-loader__spinner {
  width: rem(50);
  height: rem(50);
  border-radius: 50%;
  border: rem(5) solid $secondary-color;
  border-top-color: $primary-color;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>