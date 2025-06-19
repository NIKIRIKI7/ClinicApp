<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {useAdvantagesStore} from '@/stores/advantages';
import {storeToRefs} from 'pinia';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';

const advantagesStore = useAdvantagesStore();
const {items: advantages, isLoading, error} = storeToRefs(advantagesStore);

onMounted(() => {
  advantagesStore.fetchItems();
});
</script>

<template>
  <section class="advantages">
    <div class="container advantages__container">
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <div
          v-else-if="advantages"
          class="advantages__content"
      >
        <h2 class="advantages__title">{{ advantages.title }}</h2>
        <div class="advantages__content-wrapper">
          <img
              class="advantages__blob"
              :src="advantages.blob.src"
              :alt="advantages.blob.alt"
              aria-hidden="true"
          >
          <article
              v-for="item in advantages.items"
              :key="item.id"
              class="advantages__item"
          >
            <h3 class="advantages__item-title">{{ item.title }}</h3>
            <!-- ИСПРАВЛЕНИЕ: тег <p> заменен на <div> для корректной вставки списка -->
            <div
                class="advantages__item-description"
                v-html="item.description"
            />
          </article>
        </div>
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

.advantages {
  &__content-wrapper {
    position: relative;
    overflow: hidden;
    padding: rem(23px) rem(74px) rem(23px) rem(25px);
    background-color: $secondary-color;
    border-radius: rem(20px);

    @include responsive($breakpoint-tablet) {
      padding: rem(15px) rem(30px) rem(15px) rem(14px);
    }

    @include responsive($breakpoint-mobile) {
      padding: rem(13px) rem(12px) rem(11px) rem(12px);
    }
  }

  &__content {
    padding: rem(40px) 0 0 0;
    display: flex;
    flex-direction: column;
    gap: rem(40px);

    @include responsive($breakpoint-mobile) {
      padding: rem(13px) 0 0 0;
      gap: rem(10px);
    }
  }

  &__blob {
    position: absolute;
    bottom: rem(60px);
    left: rem(130px);
    z-index: 1;
    width: rem(765px);
    height: rem(626px);
    pointer-events: none;
    user-select: none;

    @include responsive($breakpoint-tablet) {
      bottom: rem(340px);
      left: rem(125px);
      width: rem(538px);
      height: rem(325px);
    }

    @include responsive($breakpoint-mobile) {
      bottom: rem(832px);
      left: rem(45px);
      width: rem(255px);
      height: rem(209px);
    }
  }

  &__item, &__item-title {
    position: relative;
    z-index: 2;
    color: $white;
  }

  &__item {
    display: flex;
    flex-direction: column;
    gap: rem(10);
    padding: 0 0 10px 0;

    &:not(:last-child) {
      margin-bottom: rem(20);
    }
  }

  &__item-title {
    line-height: 1.4;
  }

  &__item-description {
    line-height: 1.5;

    :deep(ul) {
      list-style-type: '• ';
      padding-left: rem(5);
      margin-top: rem(10);
    }

    :deep(li) {
      padding-left: rem(10);
      margin-bottom: rem(4);
    }
  }

  &__title {
    font-size: rem($h2-font-size-md);

    @include responsive($breakpoint-mobile) {
      font-size: rem($h2-font-size-sm);
    }
  }
}
</style>