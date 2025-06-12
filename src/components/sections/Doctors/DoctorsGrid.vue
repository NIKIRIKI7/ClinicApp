<!-- src/components/sections/Doctors/DoctorsGrid.vue -->
<script
    setup
    lang="ts"
>
import {useDoctorsStore} from '@/stores/doctors';
import DoctorCard from './DoctorCard.vue';
import ArrowLeft from '@/assets/icons/arrow-left.svg?component';
import ArrowRight from '@/assets/icons/arrow-right.svg?component';
// ИСПРАВЛЕНИЕ: Импортируем созданные UI-компоненты
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';

const doctorsStore = useDoctorsStore();
</script>

<template>
  <div class="doctors-grid">
    <div
        v-if="doctorsStore.totalPages > 1 && !doctorsStore.isLoading && !doctorsStore.error"
        class="doctors-grid__controls"
    >
      <button
          class="doctors-grid__button doctors-grid__button--prev"
          @click="doctorsStore.setPage(doctorsStore.currentPage - 1)"
          :disabled="doctorsStore.isPrevDisabled"
      >
        <span class="doctors-grid__icon-wrapper">
          <ArrowLeft class="doctors-grid__icon" />
        </span>
        назад
      </button>
      <button
          class="doctors-grid__button doctors-grid__button--next"
          @click="doctorsStore.setPage(doctorsStore.currentPage + 1)"
          :disabled="doctorsStore.isNextDisabled"
      >
        вперед
        <span class="doctors-grid__icon-wrapper">
          <ArrowRight class="doctors-grid__icon" />
        </span>
      </button>
    </div>

    <!-- ИСПРАВЛЕНИЕ: Используем компоненты AppLoader и AppError -->
    <div
        v-if="doctorsStore.isLoading"
        class="doctors-grid__state"
    >
      <AppLoader />
    </div>

    <div
        v-else-if="doctorsStore.error"
        class="doctors-grid__state doctors-grid__state--error"
    >
      <AppError :message="doctorsStore.error" />
    </div>

    <div
        v-else-if="doctorsStore.doctors.length > 0"
        class="doctors-grid__grid"
    >
      <DoctorCard
          v-for="doctor in doctorsStore.doctors"
          :key="doctor.id"
          :doctor="doctor"
      />
    </div>

    <div
        v-else
        class="doctors-grid__state doctors-grid__no-results"
    >
      <p>По вашему запросу врачи не найдены. Попробуйте изменить параметры поиска.</p>
    </div>
  </div>
</template>

<style
    scoped
    lang="scss"
>
/* Стили остаются без изменений. BEM используется корректно. */
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.doctors-grid {
  position: relative;

  &__state {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 300px;
    font-size: rem($font-size-lg);
    color: $text-color-dark;

    &--error {
      color: red;
    }
  }

  &__controls {
    display: flex;
    gap: rem(15px);
    justify-content: flex-end;
    margin: 0 0 rem(35px) 0;

    @include responsive($breakpoint-tablet) {
      margin: 0 0 rem(50px) 0;
    }

    @include responsive($breakpoint-mobile) {
      margin: 0 0 rem(30px) 0;
      justify-content: center;
    }
  }

  &__button {
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

      .doctors-grid__icon-wrapper {
        background-color: color.adjust($secondary-color, $lightness: -10%);
      }
    }

    &:disabled {
      color: $text-color-dark;
      opacity: 0.5;
      cursor: not-allowed;

      .doctors-grid__icon-wrapper {
        background-color: $light-gray;
        opacity: 1;
      }
    }
  }

  &__icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: rem(36);
    height: rem(36);
    border-radius: 50%;
    background-color: $secondary-color;
    transition: background-color 0.3s ease;
  }

  &__icon {
    width: rem(12);
    height: rem(12);
    color: $white;
  }

  &__grid {
    display: grid;
    gap: rem(13);
    grid-template-columns: repeat(4, 1fr);

    @include responsive($breakpoint-tablet) {
      grid-template-columns: repeat(2, 1fr);
      gap: rem(16);
    }

    @include responsive($breakpoint-mobile) {
      grid-template-columns: 1fr;
      justify-items: center;
      gap: rem(25);
    }
  }

  &__no-results {
    color: $secondary-color;
  }
}
</style>