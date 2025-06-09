<script
    setup
    lang="ts"
>
import TelegramIcon from '@/assets/icons/socials-icon--telegram.svg?component';
import WhatsappIcon from '@/assets/icons/socials-icon--whatsapp.svg?component';
import CalendarIcon from '@/assets/icons/data__icon.svg?component';
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
              <li class="header__nav-item">
                <router-link
                    to="/about"
                    class="header__nav-link"
                >О НАС
                </router-link>
              </li>
              <li class="header__nav-item">
                <router-link
                    to="/doctors"
                    class="header__nav-link"
                >НАШИ ВРАЧИ
                </router-link>
              </li>
              <li class="header__nav-item">
                <router-link
                    to="/promotions"
                    class="header__nav-link"
                >АКЦИИ
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
                href="tel:+79998887766"
                class="header__phone"
            >+7 (999) 888-77-66
            </a>
            <div class="header__socials">
              <a
                  href="#"
                  class="header__socials-link"
                  aria-label="Написать в Telegram"
              >
                <TelegramIcon class="header__socials-icon" />
              </a>
              <a
                  href="#"
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
@use '../assets/scss/abstracts/variables' as *;
@use '../assets/scss/abstracts/mixins' as *;

.header {
  &__inner {
    padding: 39px 0;

    @include responsive($breakpoint-tablet) {
      padding: 25px 0;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;

    @include responsive($breakpoint-tablet) {
      flex-wrap: wrap;
      row-gap: 16px;
    }
  }

  //-- 1. Навигация
  &__nav {
    @include responsive($breakpoint-tablet) {
      order: 3;
      width: 100%;
    }
  }

  &__nav-list {
    display: flex;
    gap: 45px;
    font-size: rem($font-size-base);

    @include responsive($breakpoint-tablet) {
      gap: 24px;
      justify-content: space-between;
      font-size: rem($font-size-md);
    }

    @include responsive($breakpoint-mobile) {
      gap: 95px;
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

  //-- 2. Кнопка записи
  &__button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: rem($font-size-base);

    @include responsive($breakpoint-tablet) {
      order: 1;
      gap: 5px;
      font-size: rem($font-size-md);
    }

    @include responsive($breakpoint-mobile) {
      gap: 4px;
      font-size: rem($font-size-sm);
    }
  }

  &__button-icon {
    width: 16px;
    height: 16px;
    color: $secondary-color;

    @include responsive($breakpoint-mobile) {
      width: 14px;
      height: 14px;
    }
  }

  //-- 3. Контакты
  &__contacts {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: rem($font-size-base);

    @include responsive($breakpoint-tablet) {
      order: 2;
      gap: 13px;
      font-size: rem($font-size-md);
    }

    @include responsive($breakpoint-mobile) {
      gap: 8px;
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
    gap: 5px;

    @include responsive($breakpoint-tablet) {
      gap: 10px;
    }

    @include responsive($breakpoint-mobile) {
      gap: 5px;
    }
  }

  &__socials-icon {
    width: 30px;
    height: 30px;
    transition: filter 0.3s ease, scale 0.3s ease;

    @include on-event {
      filter: hue-rotate(30deg) brightness(1.1);
      scale: 1.1;
    }

    @include responsive($breakpoint-tablet) {
      width: 27px;
      height: 27px;
    }

    @include responsive($breakpoint-mobile) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>