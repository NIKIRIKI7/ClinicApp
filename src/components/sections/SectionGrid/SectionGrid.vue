<script
    setup
    lang="ts"
>
import {onMounted} from 'vue';
import {storeToRefs} from 'pinia';
import SectionGridItem from './SectionGridItem.vue';
import {useSectionGridStore} from '@/stores/sectionGrid';
import AppLoader from '@/components/ui/AppLoader.vue';
import AppError from '@/components/ui/AppError.vue';

const sectionGridStore = useSectionGridStore();
const {items: gridItems, isLoading, error} = storeToRefs(sectionGridStore);

onMounted(() => {
  sectionGridStore.fetchItems();
});
</script>

<template>
  <section class="section-grid">
    <div class="container">
      <AppLoader v-if="isLoading" />
      <AppError
          v-else-if="error"
          :message="error"
      />
      <ul
          v-else-if="gridItems && gridItems.length"
          class="section-grid__list"
      >
        <li
            v-for="item in gridItems"
            :key="item.id"
            class="section-grid__item"
        >
          <!-- ИСПРАВЛЕНИЕ: Добавлен router-link для навигации -->
          <router-link
              :to="item.to"
              class="section-grid__link"
          >
            <SectionGridItem :item="item" />
          </router-link>
        </li>
      </ul>
    </div>
  </section>
</template>

<style
    lang="scss"
    scoped
>
/* Стили без изменений */
@use '../../../assets/scss/abstracts/variables' as *;
@use '../../../assets/scss/abstracts/mixins' as *;

.section-grid {
  padding: rem(25) 0;
  background-color: $secondary-color;
  @include responsive($breakpoint-tablet) {
    padding: rem(35) 0;
  }
  @include responsive($breakpoint-mobile) {
    padding: rem(15) 0;
  }
}

.section-grid__list {
  display: grid;
  gap: rem(30);
  list-style: none;
  padding: 0;
  margin: 0;
  grid-template-columns: repeat(4, 1fr);
  @include responsive($breakpoint-tablet) {
    grid-template-columns: repeat(3, 1fr);
    gap: rem(20);
  }
  @include responsive($breakpoint-mobile) {
    grid-template-columns: 1fr;
    gap: rem(15);
  }
}

/* ИСПРАВЛЕНИЕ: Добавлены стили для ссылки */
.section-grid__link {
  display: block;
  text-decoration: none;
  color: inherit;
  border-radius: rem(24);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  @include on-event {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}
</style>