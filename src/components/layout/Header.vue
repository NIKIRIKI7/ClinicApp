<script
    setup
    lang="ts"
>

import {useLayoutStore} from '@/stores/layout';
import {storeToRefs} from 'pinia';
import TelegramIcon from '@/assets/icons/socials-icon--telegram.svg?component';
import WhatsappIcon from '@/assets/icons/socials-icon--whatsapp.svg?component';
import CalendarIcon from '@/assets/icons/data__icon.svg?component';

const layoutStore = useLayoutStore();
const {header} = storeToRefs(layoutStore);
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__inner">
        <div class="header__content">
          <nav
              class="header__nav"
              aria-label="Основная навигация"
          >
            <ul class="header__nav-list">
              <li
                  v-for="item in header.navItems"
                  :key="item.to"
                  class="header__nav-item"
              >
                <router-link
                    :to="item.to"
                    class="header__nav-link"
                >
                  {{ item.text }}
                </router-link>
              </li>
            </ul>
          </nav>

          <a
              href="#appointment-form"
              class="header__button"
          >
            <CalendarIcon
                class="header__button-icon"
                aria-hidden="true"
            />
            <span class="header__button-text">ЗАПИСАТЬСЯ НА ПРИЕМ</span>
          </a>

          <div class="header__contacts">
            <a
                :href="header.contacts.phone.href"
                class="header__phone"
            >
              {{ header.contacts.phone.number }}
            </a>
            <div class="header__socials">
              <a
                  :href="header.contacts.socials.telegram"
                  class="header__socials-link"
                  aria-label="Написать в Telegram"
              >
                <TelegramIcon class="header__socials-icon" />
              </a>
              <a
                  :href="header.contacts.socials.whatsapp"
                  class="header__socials-link"
                  aria-label="Написать в WhatsApp"
              >
                <WhatsappIcon class="header__socials-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<style
    lang="scss"
    scoped
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.header {
  &__inner {
    padding: rem(39) 0;
    @include responsive($breakpoint-tablet) {
      padding: rem(25) 0;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    @include responsive($breakpoint-tablet) {
      flex-wrap: wrap;
      row-gap: rem(16);
    }
  }

  &__nav {
    @include responsive($breakpoint-tablet) {
      order: 3;
      width: 100%;
    }
  }

  &__nav-list {
    display: flex;
    gap: rem(45);
    @include apply-font($font-family-primary, $font-weight-semibold, $font-size-base);
    @include responsive($breakpoint-tablet) {
      gap: rem(24);
      justify-content: space-between;
      font-size: rem($font-size-md);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(80);
      font-size: rem($font-size-sm);
    }
  }

  &__nav-link {
    color: $text-color-dark;
    transition: color 0.3s ease;
    @include on-event {
      color: $secondary-color;
    }
  }

  &__button {
    display: flex;
    align-items: center;
    gap: rem(4);
    @include apply-font($font-family-primary, $font-weight-medium, $font-size-base);
    @include responsive($breakpoint-tablet) {
      order: 1;
      gap: rem(5);
      font-size: rem($font-size-md);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(4);
      font-size: rem($font-size-sm);
    }
  }

  &__button-icon {
    width: rem(16);
    height: rem(16);
    color: $secondary-color;
    @include responsive($breakpoint-mobile) {
      width: rem(14);
      height: rem(14);
    }
  }

  &__contacts {
    display: flex;
    align-items: center;
    gap: rem(10);
    @include apply-font($font-family-primary, $font-weight-medium, $font-size-base);
    @include responsive($breakpoint-tablet) {
      order: 2;
      gap: rem(13);
      font-size: rem($font-size-md);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(8);
      font-size: rem($font-size-sm);
    }
  }

  &__phone {
    color: $text-color-dark;
    transition: color 0.3s ease;
    @include on-event {
      color: $secondary-color;
    }
  }

  &__socials {
    display: flex;
    gap: rem(5);
    @include responsive($breakpoint-tablet) {
      gap: rem(10);
    }
    @include responsive($breakpoint-mobile) {
      gap: rem(5);
    }
  }

  &__socials-icon {
    width: rem(30);
    height: rem(30);
    transition: filter 0.3s ease, transform 0.3s ease;
    @include on-event {
      filter: hue-rotate(30deg) brightness(1.1);
      transform: scale(1.1);
    }
    @include responsive($breakpoint-tablet) {
      width: rem(27);
      height: rem(27);
    }
    @include responsive($breakpoint-mobile) {
      width: rem(20);
      height: rem(20);
    }
  }
}
</style>