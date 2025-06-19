<script
    setup
    lang="ts"
>
import {useDoctorsStore} from '@/stores/doctors';
import DoctorCard from './DoctorCard.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';
import UIPagination from '@/components/ui/UIPagination.vue';

const doctorsStore = useDoctorsStore();
</script>

<template>
  <div class="doctors-grid">
    <div
        v-if="doctorsStore.totalPages > 1 && !doctorsStore.isLoading && !doctorsStore.error"
        class="doctors-grid__controls"
    >
      <UIPagination
          :is-prev-disabled="doctorsStore.isPrevDisabled"
          :is-next-disabled="doctorsStore.isNextDisabled"
          @prev="doctorsStore.goToPrevPage"
          @next="doctorsStore.goToNextPage"
      />
    </div>

    <div
        v-if="doctorsStore.isLoading"
        class="doctors-grid__state"
    >
      <AppLoader />
    </div>

    <div
        v-else-if="doctorsStore.error"
        class="doctors-grid__state"
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
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;

.doctors-grid {
  position: relative;

  &__state {
    @include flex-center;
    min-height: 300px;
    font-size: rem($font-size-lg);
    color: $text-color-dark;
  }

  &__controls {
    display: flex;
    justify-content: flex-end;
    margin: 0 0 rem(50px) 0;

    @include responsive($breakpoint-tablet) {
      margin: 0 0 rem(75px) 0;
    }

    @include responsive($breakpoint-mobile) {
      margin: 0 0 rem(30px) 0;
      justify-content: center;
    }
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