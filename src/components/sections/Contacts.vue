<script
    setup
    lang="ts"
>
import {useLayoutStore} from '@/stores/layout';
import BaseButton from '@/components/ui/Button.vue';
import TelegramIcon from '@/assets/icons/telegram-icon-circled.svg?component';
import WhatsappIcon from '@/assets/icons/whatsapp-icon-circled.svg?component';
import mapImage from '@/assets/images/map.png';

const layoutStore = useLayoutStore();
</script>

<template>
  <section class="contacts">
    <div class="container">
      <div class="contacts__inner">
        <div class="contacts__info">
          <h2 class="contacts__title">КОНТАКТЫ</h2>
          <address class="contacts__address">{{ layoutStore.address }}</address>
          <div class="contacts__phone-block">
            <a
                :href="layoutStore.header.contacts.phone.href"
                class="contacts__phone"
            >{{ layoutStore.header.contacts.phone.number }}</a>
            <div class="contacts__socials">
              <a
                  :href="layoutStore.header.contacts.socials.telegram"
                  class="contacts__socials-link"
                  aria-label="Написать в Telegram"
              >
                <TelegramIcon />
              </a>
              <a
                  :href="layoutStore.header.contacts.socials.whatsapp"
                  class="contacts__socials-link"
                  aria-label="Написать в WhatsApp"
              >
                <WhatsappIcon />
              </a>
            </div>
          </div>
          <BaseButton
              tag="a"
              href="#appointment-form"
              variant="secondary"
              class="contacts__button"
          >
            СВЯЗАТЬСЯ С НАМИ
          </BaseButton>
        </div>
        <div class="contacts__map">
          <img
              :src="mapImage"
              alt="Карта с расположением клиники"
              loading="lazy"
          >
        </div>
      </div>
    </div>
  </section>
</template>

<style
    lang="scss"
    scoped
>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;
@use 'sass:color';

.contacts {
  background-color: $secondary-color;
  color: $white;
  padding: rem(80) 0;

  @include responsive($breakpoint-tablet) {
    padding: rem(60) 0;
  }
  @include responsive($breakpoint-mobile) {
    padding: rem(40) 0;
  }
}

.contacts__inner {
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  align-items: center;
  gap: rem(60);

  @include responsive($breakpoint-tablet) {
    grid-template-columns: 1fr;
    gap: rem(40);
    text-align: center;
  }
}

.contacts__info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: rem(30);

  @include responsive($breakpoint-tablet) {
    align-items: center;
  }
}

.contacts__title {
  @include apply-font($font-family-headings, $font-weight-bold, $h1-font-size-md);
  text-transform: uppercase;
  color: $white;

  @include responsive($breakpoint-mobile) {
    font-size: rem($h2-font-size-md);
  }
}

.contacts__address {
  @include apply-font($font-family-primary, $font-weight-medium, $font-size-lg);
  font-style: normal;
  line-height: 1.5;
  white-space: pre-line;

  @include responsive($breakpoint-mobile) {
    font-size: rem($font-size-base);
  }
}

.contacts__phone-block {
  display: flex;
  align-items: center;
  gap: rem(20);

  @include responsive($breakpoint-mobile) {
    flex-direction: column;
    gap: rem(15);
  }
}

.contacts__phone {
  @include apply-font($font-family-primary, $font-weight-semibold, rem(24));
  color: $white;
  text-decoration: none;
  transition: color 0.2s ease;

  @include on-event {
    color: color.adjust($white, $alpha: -0.2);
  }

  @include responsive($breakpoint-mobile) {
    font-size: rem(20px);
  }
}

.contacts__socials {
  display: flex;
  gap: rem(10);
}

.contacts__socials-link {
  display: block;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }

  svg {
    width: rem(40);
    height: rem(40);
  }
}

.contacts__button {
  margin-top: rem(10);
}

.contacts__map {
  width: 100%;
  aspect-ratio: 590 / 410; // Соотношение сторон, как на макете
  border-radius: rem(24);
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>