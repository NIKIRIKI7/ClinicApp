<!-- src/components/ui/AppError.vue -->
<script
    setup
    lang="ts"
>
defineProps<{
  message?: string;
}>();
</script>

<template>
  <div
      class="app-error"
      role="alert"
  >
    <p class="app-error__title">Произошла ошибка</p>
    <p
        v-if="message"
        class="app-error__message"
    >{{ message }}
    </p>
    <p
        v-else
        class="app-error__message"
    >Не удалось загрузить данные. Пожалуйста, попробуйте обновить страницу.
    </p>
  </div>
</template>

<style
    scoped
    lang="scss"
>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.app-error {
  padding: rem(20);
  border: rem(2) solid #e53e3e;
  background-color: #fff5f5;
  color: #c53030;
  border-radius: rem(10);
  text-align: center;
}

.app-error__title {
  font-weight: $font-weight-bold;
  font-size: rem($font-size-lg);
  margin: 0 0 rem(10) 0;
}

.app-error__message {
  margin: 0;
  font-size: rem($font-size-md);
}
</style>