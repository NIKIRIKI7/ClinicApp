<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {useServicesStore} from '@/stores/servicesStore';
import ServiceItem from './ServiceItem.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';

/**
 * @component MainServices
 * @description Секция для отображения основных услуг клиники с возможностью переключения между ними.
 */
const servicesStore = useServicesStore();
const {services, activeService, isLoading, error} = storeToRefs(servicesStore);
const {loadServices, setActiveService} = servicesStore;

onMounted(() => {
  loadServices();
});
</script>

<template>
  <section class="main-services">
    <div class="container">
      <h2 class="main-services__title">ОСНОВНЫЕ УСЛУГИ</h2>
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <div
          v-else
          class="main-services__content"
      >
        <nav class="main-services__tabs">
          <button
              v-for="service in services"
              :key="service.id"
              class="main-services__tab"
              :class="{ 'main-services__tab--active': activeService?.id === service.id }"
              @click="setActiveService(service.id)"
          >
            {{ service.title }}
          </button>
        </nav>
        <div class="main-services__item-wrapper">
          <transition
              name="fade"
              mode="out-in"
          >
            <ServiceItem
                v-if="activeService"
                :key="activeService.id"
                :service="activeService"
            />
          </transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style
    lang="scss"
    scoped
>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.main-services {
  padding: rem(60) 0;
  background-color: $secondary-color;
}

.main-services__title {
  @include apply-font($font-family-headings, $font-weight-bold, $h1-font-size-md);
  text-align: center;
  margin-bottom: rem(40);
  color: $white;

  @include responsive($breakpoint-tablet) {
    font-size: rem($h1-font-size-sm);
  }
}

.main-services__content {
  display: flex;
  gap: rem(30);

  @include responsive($breakpoint-tablet) {
    flex-direction: column;
  }
}

.main-services__tabs {
  display: flex;
  flex-direction: column;
  gap: rem(15);
  flex-shrink: 0;

  @include responsive($breakpoint-tablet) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
}

.main-services__tab {
  @include apply-font($font-family-primary, $font-weight-semibold, $font-size-base);
  border: rem(2) solid $white;
  background-color: transparent;
  color: $white;
  padding: rem(18) rem(24);
  border-radius: rem(900);
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  min-width: rem(250);

  @include on-event {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &--active {
    background-color: $white;
    color: $text-color-dark;
    border-color: $white;
  }

  @include responsive($breakpoint-tablet) {
    min-width: auto;
    flex-grow: 1;
    padding: rem(14) rem(20);
  }
}

.main-services__item-wrapper {
  flex-grow: 1;
  min-height: rem(290); // Предотвращает "прыжки" при смене контента
}

// Стили для анимации
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>