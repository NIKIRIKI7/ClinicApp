<script
    setup
    lang="ts"
>
import ArrowLeft from '@/assets/icons/arrow-left.svg?component';
import ArrowRight from '@/assets/icons/arrow-right.svg?component';

/**
 * @component UIPagination
 * @description Переиспользуемый компонент для управления пагинацией.
 */
defineProps<{
  /** @prop {boolean} isPrevDisabled - Определяет, должна ли быть отключена кнопка "назад". */
  isPrevDisabled: boolean;
  /** @prop {boolean} isNextDisabled - Определяет, должна ли быть отключена кнопка "вперед". */
  isNextDisabled: boolean;
}>();

/**
 * @emits prev - Событие, генерируемое при клике на кнопку "назад".
 * @emits next - Событие, генерируемое при клике на кнопку "вперед".
 */
const emit = defineEmits(['prev', 'next']);
</script>

<template>
  <div class="ui-pagination">
    <button
        class="ui-pagination__button ui-pagination__button--prev"
        :disabled="isPrevDisabled"
        aria-label="Предыдущая страница"
        @click="emit('prev')"
    >
      <span class="ui-pagination__icon-wrapper">
        <ArrowLeft
            class="ui-pagination__icon"
            aria-hidden="true"
        />
      </span>
      назад
    </button>
    <button
        class="ui-pagination__button ui-pagination__button--next"
        :disabled="isNextDisabled"
        aria-label="Следующая страница"
        @click="emit('next')"
    >
      вперед
      <span class="ui-pagination__icon-wrapper">
        <ArrowRight
            class="ui-pagination__icon"
            aria-hidden="true"
        />
      </span>
    </button>
  </div>
</template>

<style
    scoped
    lang="scss"
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.ui-pagination {
  display: flex;
  gap: rem(15px);
}

.ui-pagination__button {
  display: flex;
  align-items: center;
  gap: rem(10);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: $text-color-dark;
  font-family: $font-family-primary;
  font-size: rem($font-size-md);
  font-weight: $font-weight-medium;
  transition: color 0.3s ease;

  &:hover:not(:disabled) {
    color: $primary-color;

    .ui-pagination__icon-wrapper {
      background-color: color.adjust($secondary-color, $lightness: -10%);
    }
  }

  &:disabled {
    color: $text-color-dark;
    opacity: 0.5;
    cursor: not-allowed;

    .ui-pagination__icon-wrapper {
      background-color: $light-gray;
      opacity: 1;
    }
  }
}

.ui-pagination__icon-wrapper {
  @include flex-center;
  width: rem(36);
  height: rem(36);
  border-radius: 50%;
  background-color: $secondary-color;
  transition: background-color 0.3s ease;
}

.ui-pagination__icon {
  width: rem(12);
  height: rem(12);
  color: $white;
}
</style>