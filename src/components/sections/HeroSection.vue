<!-- C:\Users\mcniki\Documents\stormprojects\clinicapp\src\components\sections\HeroSection.vue -->
<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useHeroStore} from '@/stores/hero';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';
import BaseButton from '@/components/ui/Button.vue';

const heroStore = useHeroStore();
const {items: heroData, isLoading, error} = storeToRefs(heroStore);

onMounted(() => {
  heroStore.fetchItems();
});
</script>

<template>
  <section class="hero">
    <div class="container hero__container">
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <div
          v-else-if="heroData"
          class="hero__inner"
      >
        <div class="hero__badge">
          {{ heroData.badgeText }}
        </div>
        <div class="hero__title">
          <span
              v-for="line in heroData.titleLines"
              :key="line"
              class="hero__title-line"
          >
            {{ line }}
          </span>
        </div>
        <BaseButton
            tag="a"
            href="#appointment-form"
            class="hero__button"
        >
          {{ heroData.buttonText }}
        </BaseButton>
      </div>
    </div>
  </section>
</template>

<style
    scoped
    lang="scss"
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.hero {
  background-image: url('@/assets/images/hero-bg.png');
  background-size: cover;
  background-position: center;
  color: $text-color-dark;
  min-height: 85vh;

  &__container {
    position: relative;
    height: 100%;
  }

  &__inner {
    position: relative;
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    padding: rem(100px) 0 0 0;
    min-height: 70vh;

    // Tablet adaptation
    @include responsive($breakpoint-tablet) {
      padding: rem(60px) 0 0 0;
      align-content: center;
      text-align: center;
      min-height: 60vh;
    }

    // Mobile adaptation
    @include responsive($breakpoint-mobile) {
      padding: rem(40px) 0 0 0;
      min-height: 50vh;
    }
  }

  &__title {
    @include apply-font($font-family-headings, $font-weight-bold, rem(65px));
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(3, 1fr);
    grid-template-areas:
      "text1 text1 ."
      "text2 text2 ."
      ". text3 text3";
    justify-items: end;
    margin-bottom: rem(40px);

    // Tablet adaptation
    @include responsive($breakpoint-tablet) {
      @include apply-font($font-family-headings, $font-weight-bold, $h1-font-size-md);
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: rem(8px);
      margin-bottom: rem(30px);
      max-width: 80%;
      margin-left: auto;
      margin-right: auto;
    }

    // Mobile adaptation
    @include responsive($breakpoint-mobile) {
      @include apply-font($font-family-headings, $font-weight-bold, $h1-font-size-sm);
      max-width: 100%;
      gap: rem(4px);
      margin-bottom: rem(20px);
      line-height: 1.2;
    }

    &-line {
      // Desktop grid areas
      &:nth-child(1) {
        grid-area: text1;
      }

      &:nth-child(2) {
        grid-area: text2;
      }

      &:nth-child(3) {
        grid-area: text3;
      }

      @include responsive($breakpoint-tablet) {
        grid-area: unset;
      }
    }
  }

  &__badge {
    background-color: $secondary-color;
    color: $white;
    font-weight: $font-weight-medium;
    text-transform: uppercase;
    width: 33%;
    height: rem(140px);
    justify-self: end;
    position: absolute;
    right: rem(40px);
    top: rem(130px);
    display: flex;
    align-items: center;
    border-radius: rem(23px);
    font-size: rem(20px);
    text-align: end;
    padding: 0 rem(40px) 0 0;

    // Tablet adaptation
    @include responsive($breakpoint-tablet) {
      position: static;
      width: auto;
      max-width: rem(300px);
      height: rem(80px);
      font-size: rem(18px);
      text-align: center;
      justify-content: center;
      margin: 0 auto rem(30px) auto;
      border-radius: rem(15px);
      padding: rem(10px) rem(20px);
      order: -1; // Show badge first on smaller screens
    }

    // Mobile adaptation
    @include responsive($breakpoint-mobile) {
      max-width: 90%;
      height: rem(60px);
      font-size: rem(14px);
      margin-bottom: rem(20px);
      border-radius: rem(12px);
      padding: rem(8px) rem(16px);
      line-height: 1.3;
    }
  }

  &__button {
    background-color: $secondary-color;
    align-self: start;
    transition: all 0.3s ease;

    @include on-event {
      background-color: color.adjust($secondary-color, $lightness: -6%);
      transform: translateY(-2px);
    }

    // Tablet adaptation
    @include responsive($breakpoint-tablet) {
      align-self: center;
      min-width: rem(200px);
      padding: rem(12px) rem(24px);
    }

    // Mobile adaptation
    @include responsive($breakpoint-mobile) {
      width: 100%;
      max-width: rem(280px);
      padding: rem(10px) rem(20px);
      font-size: rem(14px);
    }
  }

  // Additional responsive adjustments for the entire hero section
  @include responsive($breakpoint-tablet) {
    min-height: 70vh;
    background-position: center top;
  }

  @include responsive($breakpoint-mobile) {
    min-height: 60vh;
    background-size: cover;
    background-position: center center;
  }
}

// Container adjustments for better spacing on smaller screens
.container {
  @include responsive($breakpoint-tablet) {
    padding-left: rem(20px);
    padding-right: rem(20px);
  }

  @include responsive($breakpoint-mobile) {
    padding-left: rem(16px);
    padding-right: rem(16px);
  }
}
</style>