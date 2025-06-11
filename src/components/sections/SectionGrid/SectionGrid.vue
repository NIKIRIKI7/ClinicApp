<script
    setup
    lang="ts"
>
import SectionGridItem from './SectionGridItem.vue';
import { useContentStore } from '@/stores/content';

/**
 * @component SectionGrid
 * @description Контейнер для отображения навигационной сетки.
 */
const contentStore = useContentStore();
const gridItems = contentStore.sectionGridItems;
</script>

<template>
  <section class="section-grid">
    <div class="container">
      <ul class="section-grid__list">
        <li
            v-for="item in gridItems"
            :key="item.id"
            class="section-grid__item"
        >
          <SectionGridItem :item="item" />
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss" scoped>
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
</style>