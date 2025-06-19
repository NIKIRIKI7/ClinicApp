<script
    setup
    lang="ts"
>
import type {IDoctor} from '@/types';

defineProps<{
  doctor: IDoctor;
}>();
</script>

<template>
  <article class="doctor-card">
    <div class="doctor-card__photo-wrapper">
      <img
          class="doctor-card__photo"
          :src="doctor.photo"
          :alt="`Фото врача: ${doctor.name}`"
          loading="lazy"
      />
    </div>
    <div class="doctor-card__info">
      <h3 class="doctor-card__name">{{ doctor.name }}</h3>
      <p class="doctor-card__specialty">{{ doctor.specialties.join(', ') }}</p>
      <a
          href="#"
          class="doctor-card__appointment-link"
      >записаться на прием
      </a>
    </div>
  </article>
</template>

<style
    scoped
    lang="scss"
>
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;

.doctor-card {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: rem(300);
}

.doctor-card__photo-wrapper {
  background-color: $secondary-color;
  border-radius: rem(20) rem(20) 0 0;
  height: rem(206);
  position: relative;

  @include responsive($breakpoint-tablet) {
    height: rem(141);
  }

  @include responsive($breakpoint-mobile) {
    height: rem(180);
  }
}

.doctor-card__photo {
  object-fit: cover;
  width: rem(215);
  height: rem(250);
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);

  @include responsive($breakpoint-tablet) {
    width: rem(164);
    height: rem(200);
  }

  @include responsive($breakpoint-mobile) {
    width: rem(150);
    height: rem(210);
  }
}

.doctor-card__info {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: rem(20);

  border-radius: 0 0 rem(20) rem(20);
  border-right: rem(2) solid #D4D4D4;
  border-left: rem(2) solid #D4D4D4;
  border-bottom: rem(2) solid #D4D4D4;
  background: $white;

  @include responsive($breakpoint-tablet) {
    padding: rem(15);
  }

  @include responsive($breakpoint-mobile) {
    padding: rem(17);
    text-align: center;
  }
}

.doctor-card__name {
  font-size: rem($h3-font-size-md);
  margin: 0;

  @include responsive($breakpoint-tablet) {
    font-size: rem($h3-font-size-sm);
  }

  @include responsive($breakpoint-mobile) {
    font-size: rem($h3-font-size-xs);
  }
}

.doctor-card__specialty {
  font-size: rem($font-size-md);
  margin: auto 0 rem(10);

  @include responsive($breakpoint-tablet) {
    font-size: rem($font-size-sm);
  }

  @include responsive($breakpoint-mobile) {
    font-size: rem($font-size-xs);
  }
}

.doctor-card__appointment-link {
  color: $primary-color;
  text-decoration: underline;

  &:hover {
    color: $accent-color;
  }
}
</style>