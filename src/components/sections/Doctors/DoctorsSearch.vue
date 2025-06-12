<script
    setup
    lang="ts"
>
import {useDoctorsStore} from '@/stores/doctors';
import Button from '@/components/ui/Button.vue';

const doctorsStore = useDoctorsStore();

const handleFormSubmit = () => {
  doctorsStore.applyFilters();
};
</script>

<template>
  <form
      class="doctors-search"
      @submit.prevent="handleFormSubmit"
  >
    <div class="doctors-search__wrapper">
      <div class="doctors-search__group doctors-search__group--name">
        <input
            v-model.trim="doctorsStore.filters.name"
            type="text"
            class="doctors-search__input"
            placeholder="ВВЕДИТЕ ФИО"
        />
      </div>

      <div class="doctors-search__group doctors-search__group--select">
        <select
            v-model="doctorsStore.filters.specialty"
            class="doctors-search__select"
        >
          <option
              value=""
              disabled
              selected
          >НАЗВАНИЕ СПЕЦИАЛЬНОСТИ
          </option>
          <option
              v-for="spec in doctorsStore.allSpecialties"
              :key="spec"
              :value="spec"
          >
            {{ spec.toUpperCase() }}
          </option>
        </select>
      </div>

      <div class="doctors-search__group doctors-search__group--select">
        <select
            v-model="doctorsStore.filters.metro"
            class="doctors-search__select"
        >
          <option
              value=""
              disabled
              selected
          >СТАНЦИЯ МЕТРО
          </option>
          <option
              v-for="station in doctorsStore.metroStations"
              :key="station"
              :value="station"
          >
            {{ station.toUpperCase() }}
          </option>
        </select>
      </div>
    </div>
    <Button
        tag="button"
        type="submit"
        class="doctors-search__submit"
    >
      ПОКАЗАТЬ РЕЗУЛЬТАТ
    </Button>
  </form>
</template>

<style
    scoped
    lang="scss"
>
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.doctors-search {
  display: flex;
  justify-content: space-between;
  gap: rem(20);
  background-color: $secondary-color;
  padding: rem(20px) rem(10px);
  border-radius: rem(20);
  margin: 0 0 rem(50px) 0;

  @include responsive($breakpoint-tablet) {
    padding: rem(19px) rem(5px);
    margin: 0 0 rem(15px) 0;
  }

  @include responsive($breakpoint-mobile) {
    flex-direction: column;
    padding: rem(13px) rem(22px);
    margin: 0 0 rem(10px) 0;
  }
}

.doctors-search__wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: rem(15);

  @include responsive($breakpoint-mobile) {
    display: flex;
    flex-direction: column;
    gap: rem(10);
  }
}

.doctors-search__group {
  position: relative;
}


.doctors-search__input,
.doctors-search__select,
.doctors-search__submit {
  flex-shrink: 0;
  height: rem(50px);
  @include responsive($breakpoint-tablet) {
    height: rem(44px);
  }

  @include responsive($breakpoint-mobile) {
    height: rem(40px);
  }
}


.doctors-search__input,
.doctors-search__select {
  width: 100%;
  padding: 0 rem(15px);
  border: none;
  border-radius: rem(16);
  background-color: $white;

  font-family: $font-family-primary;
  font-size: rem($font-size-md);
  font-weight: $font-weight-medium;
  color: $text-color-dark;

  appearance: none;

  background-size: rem(16) rem(16);

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @include responsive($breakpoint-tablet) {
    background-size: rem(14) rem(14);
  }

  @include responsive($breakpoint-mobile) {
    background-size: rem(12) rem(12);
    font-size: rem($font-size-placeholder-md);
  }

  &::placeholder {
    color: color.adjust($text-color-dark, $alpha: -0.6);
    font-size: rem($font-size-placeholder-lg);

    @include responsive($breakpoint-tablet) {
      font-size: rem($font-size-placeholder-md);
    }

    @include responsive($breakpoint-mobile) {
      font-size: rem($font-size-placeholder-sm);
    }
  }
}

.doctors-search__input {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23333333' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='11' cy='11' r='8'%3E%3C/circle%3E%3Cline x1='21' y1='21' x2='16.65' y2='16.65'%3E%3C/line%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right rem(15) center;
  padding-right: rem(40);
}

.doctors-search__select {
  cursor: pointer;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%23333333' stroke-width='2' stroke-linecap='round'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right rem(15) center;
  padding-right: rem(40);
}
</style>