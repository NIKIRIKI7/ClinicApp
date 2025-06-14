<script
    setup
    lang="ts"
>
import { storeToRefs } from 'pinia';
import { useAppointmentStore } from '@/stores/appointmentStore';
import { FORM_STATUS } from '@/stores/factories/createFormStore';
import BaseButton from '@/components/ui/Button.vue';

const appointmentStore = useAppointmentStore();
const { name, phone, status, image } = storeToRefs(appointmentStore);
const { submitForm } = appointmentStore;

const handleSubmit = async () => {
  await submitForm();
};
</script>

<template>
  <section class="appointment-form">
    <div class="container">
      <div class="appointment-form__content">
        <div class="appointment-form__main">
          <form
              class="appointment-form__form"
              @submit.prevent="handleSubmit"
          >
            <div class="appointment-form__header">
              <h2 class="appointment-form__title">
                Записаться на прием
              </h2>
              <p class="appointment-form__note">
                поля отмеченные * необходимы к заполнению
              </p>
            </div>
            <hr class="appointment-form__divider">
            <div class="appointment-form__fields">
              <div class="appointment-form__field-group">
                <input
                    id="appointment-name"
                    v-model="name"
                    type="text"
                    class="appointment-form__input"
                    placeholder="ВВЕДИТЕ ВАШЕ ИМЯ"
                    required
                    :disabled="status === FORM_STATUS.LOADING"
                >
              </div>
              <div class="appointment-form__field-group">
                <!-- ИЗМЕНЕНИЕ: Удалена директива v-maska, возвращен pattern -->
                <input
                    id="appointment-phone"
                    v-model="phone"
                    type="tel"
                    class="appointment-form__input"
                    placeholder="+7 (___) ___-__-__"
                    required
                    pattern="\+?[\d\s\(\)\-]{10,}"
                    title="Введите номер телефона в формате +7 (XXX) XXX-XX-XX"
                    :disabled="status === FORM_STATUS.LOADING"
                >
                <span
                    class="appointment-form__required-mark"
                    aria-hidden="true"
                >*</span>
              </div>
              <BaseButton
                  tag="button"
                  type="submit"
                  variant="primary"
                  :disabled="status === FORM_STATUS.LOADING"
              >
                <span v-if="status === FORM_STATUS.LOADING">Отправка...</span>
                <span v-else>Записаться</span>
              </BaseButton>
            </div>
            <hr class="appointment-form__divider">
            <p class="appointment-form__legal">
              Нажимая на кнопку, вы даете согласие на
              <a
                  href="/privacy-policy"
                  class="appointment-form__legal-link"
              >обработку персональных данных</a>
            </p>
          </form>
        </div>
        <div
            v-if="image"
            class="appointment-form__visual"
        >
          <img
              :src="image.src"
              :alt="image.alt"
              class="appointment-form__image"
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

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
}

.appointment-form {
  background-color: $secondary-color;
  padding: rem(60) 0;
  color: $white;
  overflow: hidden;
}

.appointment-form__content {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: rem(40);

  @include responsive($breakpoint-tablet) {
    grid-template-columns: 1fr;
    text-align: center;
  }
}

.appointment-form__main {
  @include responsive($breakpoint-tablet) {
    order: 2;
  }
}

.appointment-form__form {
  display: flex;
  flex-direction: column;
  gap: rem(20);
}

.appointment-form__title {
  @include apply-font($font-family-headings, $font-weight-semibold, 36px);
  color: $white;
}

.appointment-form__note {
  @include apply-font($font-family-primary, $font-weight-medium, 14px);
  opacity: 0.8;
}

.appointment-form__divider {
  border: none;
  height: rem(1);
  background-color: $white;
  opacity: 0.5;
}

.appointment-form__fields {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: rem(15);
  align-items: center;

  @include responsive($breakpoint-mobile) {
    grid-template-columns: 1fr;
  }
}

.appointment-form__field-group {
  position: relative;
}

.appointment-form__input {
  width: 100%;
  height: rem(50);
  background-color: transparent;
  border: rem(2) solid $white;
  border-radius: rem(900);
  padding: 0 rem(25);
  font-size: rem(14px);
  transition: box-shadow 0.2s ease;

  &::placeholder {
    color: $white;
    opacity: 0.9;
    text-transform: uppercase;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 rem(2) $accent-color;
  }
}

.appointment-form__required-mark {
  position: absolute;
  top: rem(5);
  right: rem(20);
  color: $white;
  font-size: rem(16px);
}

.appointment-form__legal {
  @include apply-font($font-family-primary, $font-weight-medium, 12px);
  opacity: 0.8;
}

.appointment-form__legal-link {
  color: $white;
  text-decoration: underline;
  @include on-event {
    color: color.adjust($white, $alpha: -0.2);
  }
}

.appointment-form__visual {
  position: relative;
  isolation: isolate;

  @include responsive($breakpoint-tablet) {
    order: 1;
    max-width: rem(300);
    margin: 0 auto;
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 110%;
    height: 110%;
    background-image: url('@/assets/images/blob-white.png');
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center;
    z-index: -1;
  }
}

.appointment-form__image {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: rem(350);
  height: auto;
}
</style>