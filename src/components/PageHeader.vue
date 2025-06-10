<script
    setup
    lang="ts"
>
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import type {RouteLocationRaw} from 'vue-router';

// Этот интерфейс теперь соответствует структуре данных из роутера
interface Breadcrumb {
  text: string;
  to?: RouteLocationRaw;
}

interface Props {
  title?: string;
  breadcrumbs?: Breadcrumb[];
}

const props = defineProps<Props>();
const route = useRoute();

const displayTitle = computed<string>(() => {
  return props.title ?? (route.meta.title as string) ?? '';
});

// ЛОГИКА УПРОЩЕНА!
// Компонент больше не формирует данные, а просто берет их в готовом виде.
const displayBreadcrumbs = computed<Breadcrumb[]>(() => {
  // Приоритет у props. Если их нет, берем данные из meta как есть.
  return props.breadcrumbs ?? (route.meta.breadcrumbs as Breadcrumb[]) ?? [];
});
</script>

<template>
  <section class="page-header">
    <div class="container">
      <div class="page-header__inner">
        <nav
            v-if="displayBreadcrumbs.length > 0"
            class="page-header__breadcrumbs"
            aria-label="Breadcrumb"
        >
          <ul class="page-header__breadcrumbs-list">
            <li
                v-for="(item, index) in displayBreadcrumbs"
                :key="item.text"
                class="page-header__breadcrumbs-item"
            >
              <router-link
                  v-if="item.to"
                  :to="item.to"
                  class="page-header__breadcrumbs-link"
              >
                {{ item.text }}
              </router-link>
              <span
                  v-else
                  class="page-header__breadcrumbs-current"
                  aria-current="page"
              >
                {{ item.text }}
              </span>

              <span
                  v-if="index < displayBreadcrumbs.length - 1"
                  class="page-header__breadcrumbs-separator"
                  aria-hidden="true"
              >
                /
              </span>
            </li>
          </ul>
        </nav>

        <h1
            v-if="displayTitle"
            class="page-header__title"
        >
          {{ displayTitle }}
        </h1>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@use '../assets/scss/abstracts/variables' as *;
@use '../assets/scss/abstracts/mixins' as *;

.page-header {
  padding: rem(18) 0 rem(40);

  @include responsive($breakpoint-tablet) {
    padding: rem(28) 0 rem(61);
  }
  @include responsive($breakpoint-mobile) {
    padding: rem(6) 0 rem(15);
  }

  &__inner {
    display: flex;
    flex-direction: column;
    gap: rem(40);

    @include responsive($breakpoint-tablet) {
      gap: rem(34);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(10);
    }
  }

  &__breadcrumbs-list {
    display: flex;
    align-items: center;
    gap: rem(8);
    flex-wrap: wrap;
  }

  &__breadcrumbs-item {
    @include apply-font($font-family-primary, $font-weight-medium, $font-size-base);
    display: contents;

    @include responsive($breakpoint-mobile) {
      font-size: rem(8px);
    }
  }

  &__breadcrumbs-link {
    color: $text-color-dark;
    text-decoration: none;
    transition: color 0.2s ease;

    @include on-event {
      color: $secondary-color;
      text-decoration: underline;
    }
  }

  &__breadcrumbs-current {
    color: $secondary-color;
  }

  &__breadcrumbs-separator {
    color: $secondary-color;
    user-select: none;
  }
}
</style>