<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import {usePricingStore} from '@/stores/pricingStore';
import {useLayoutStore} from '@/stores/layout';
import CallbackForm from '@/components/sections/CallbackForm.vue';
import PriceCard from '@/components/sections/Pricing/PriceCard.vue';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';

const pricingStore = usePricingStore();
const {items: pricingItems, isLoading, error} = storeToRefs(pricingStore);

const layoutStore = useLayoutStore();
const {fullCopyright} = storeToRefs(layoutStore);

onMounted(() => {
  pricingStore.fetchItems();
});
</script>

<template>
  <section class="pricing-section">
    <div class="container">
      <div class="pricing-section__layout">
        <h2 class="pricing-section__title pricing-section__title-first">СТОИМОСТЬ</h2>
        <p class="pricing-section__copyright">{{ fullCopyright }}</p>

        <div class="pricing-section__form">
          <CallbackForm variant="integrated" />
        </div>

        <h2 class="pricing-section__title pricing-section__title-second">УСЛУГ</h2>

        <div class="pricing-section__items-wrapper">
          <AppLoader v-if="isLoading" />
          <AppError
              v-else-if="error"
              :message="error"
          />
          <div
              v-else-if="pricingItems"
              class="pricing-section__grid-items"
          >
            <PriceCard
                v-for="item in pricingItems"
                :key="item.id"
                :item="item"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style
    scoped
    lang="scss"
>
@use '@/assets/scss/abstracts/variables' as *;
@use '@/assets/scss/abstracts/mixins' as *;

.pricing-section {
  padding: rem(60px) 0;
}

.pricing-section__layout {
  display: grid;
  grid-template-columns: minmax(auto, rem(470px)) 1fr;
  grid-template-rows: auto auto 1fr;
  column-gap: rem(30px);
  grid-template-areas:
    "title1 copyright"
    "form   title2"
    "form   items";

  @include responsive($breakpoint-tablet) {
    grid-template-columns: minmax(auto, rem(525px)) 1fr;
    grid-template-rows: auto auto 1fr;
    column-gap: rem(30px);
    grid-template-areas:
    "copyright copyright"
    "title1 title1"
    ".   title2"
    "items   items"
    "form   form";
  }
}

.pricing-section__title {
  font-size: $h1-font-size-lg;
  font-weight: 800;
  line-height: 1.1;
  text-transform: uppercase;

  @include responsive($breakpoint-tablet) {
    font-size: rem(50px);
  }

  @include responsive($breakpoint-mobile) {
    font-size: $h1-font-size-sm;
  }
}

.pricing-section__title-first {
  grid-area: title1;
  align-self: end;
}

.pricing-section__copyright {
  grid-area: copyright;
  justify-self: end;
  font-size: rem($font-size-sm);
  color: #d4d4d4;
}

.pricing-section__form {
  grid-area: form;
  margin-top: rem(30px);
}

.pricing-section__title-second {
  grid-area: title2;
  align-self: start;
}

.pricing-section__items-wrapper {
  grid-area: items;
  margin-top: rem(30px);
}

.pricing-section__grid-items {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: rem(18px);

  @include responsive($breakpoint-tablet) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>