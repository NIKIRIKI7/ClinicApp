<script
    setup
    lang="ts"
>
import {storeToRefs} from 'pinia';
import {useCallbackStore} from '@/stores/useCallbackStore';
import {FORM_STATUS} from '@/stores/factories/createFormStore';
import BaseButton from '@/components/ui/Button.vue';

/**
 * @component CallbackForm
 * @description Универсальная секция с формой для заказа обратного звонка.
 * @props {String} variant - 'standalone' (полноэкранная секция) или 'integrated' (встраиваемая).
 */
interface Props {
  variant?: 'standalone' | 'integrated';
}

withDefaults(defineProps<Props>(), {
  variant: 'standalone',
});

const callbackStore = useCallbackStore();
const {
  name,
  phone,
  status,
  image,
  fieldErrors,
  liveAnnouncerText
} = storeToRefs(callbackStore);
const {submitForm} = callbackStore;

const handleSubmit = async () => {
  await submitForm();
};
</script>

<template>
  <section
      :class="['callback-form', `callback-form--${variant}`]"
  >
    <div class="container callback-form__container">
      <form
          class="callback-form__content"
          @submit.prevent="handleSubmit"
      >
        <div class="callback-form__body">
          <div class="callback-form__head">
            <h2 class="callback-form__title">
              Заказать обратный звонок
            </h2>
            <p class="callback-form__description">
              Наш сотрудник ответит вам в ближайшее время.
            </p>
          </div>

          <div
              class="visually-hidden"
              aria-live="polite"
              role="status"
          >
            {{ liveAnnouncerText }}
          </div>

          <div class="callback-form__fields">
            <div class="callback-form__field-group">
              <label
                  for="callback-name"
                  class="visually-hidden"
              >Введите ваше имя
              </label>
              <input
                  id="callback-name"
                  v-model="name"
                  type="text"
                  class="callback-form__input"
                  :class="{ 'callback-form__input--invalid': fieldErrors.name }"
                  placeholder="ВВЕДИТЕ ВАШЕ ИМЯ"
                  required
                  :disabled="status === FORM_STATUS.LOADING"
                  :aria-invalid="!!fieldErrors.name"
                  aria-describedby="callback-name-error"
              >
              <p
                  v-if="fieldErrors.name"
                  id="callback-name-error"
                  class="callback-form__error-message"
              >
                {{ fieldErrors.name }}
              </p>
            </div>

            <div class="callback-form__field-group">
              <label
                  for="callback-phone"
                  class="visually-hidden"
              >Введите ваш номер телефона
              </label>
              <input
                  id="callback-phone"
                  v-model="phone"
                  type="tel"
                  class="callback-form__input"
                  :class="{ 'callback-form__input--invalid': fieldErrors.phone }"
                  placeholder="+7 (___) ___-__-__"
                  required
                  pattern="\+?[\d\s\(\)\-]{10,}"
                  title="Введите корректный номер телефона"
                  :disabled="status === FORM_STATUS.LOADING"
                  :aria-invalid="!!fieldErrors.phone"
                  aria-describedby="callback-phone-error"
              >
              <p
                  v-if="fieldErrors.phone"
                  id="callback-phone-error"
                  class="callback-form__error-message"
              >
                {{ fieldErrors.phone }}
              </p>
            </div>

            <BaseButton
                tag="button"
                type="submit"
                variant="secondary"
                :disabled="status === FORM_STATUS.LOADING"
            >
              <span v-if="status === FORM_STATUS.LOADING">Отправка...</span>
              <span v-else>Заказать звонок</span>
            </BaseButton>
          </div>
        </div>
        <!-- ================== ИЗМЕНЕНИЕ ЗДЕСЬ ================== -->
        <div
            v-if="image && variant === 'standalone'"
            class="callback-form__visual"
        >
          <img
              :src="image.src"
              :alt="image.alt"
              class="callback-form__image"
              loading="lazy"
          >
        </div>
      </form>
    </div>
  </section>
</template>

<style
    scoped
    lang="scss"
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

// Общие стили для обоих вариантов
.callback-form {
  &__content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;

    @include responsive($breakpoint-tablet) {
      flex-direction: column;
      align-items: center;
      gap: rem(40);
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: rem(40);
    width: rem(380);
    flex-shrink: 0;

    @include responsive($breakpoint-tablet) {
      width: 100%;
      max-width: rem(400);
      align-items: center;
      text-align: center;
    }
  }

  &__head {
    display: flex;
    flex-direction: column;
    gap: rem(17);
    color: $white;
  }

  &__title {
    font-size: rem(24px);
    color: $white;
  }

  &__description {
    font-size: rem(16px);
  }

  &__fields {
    display: grid;
    gap: rem(15);
    width: 100%;
  }

  &__field-group {
    min-height: rem(60);
  }

  &__input {
    width: 100%;
    height: rem(60);
    border-radius: rem(900);
    background-color: transparent;
    border: rem(2) solid $white;
    padding: 0 rem(40);
    color: $white;
    font-size: rem(14px);
    transition: border-color 0.2s ease, box-shadow 0.2s ease;

    &::placeholder {
      color: $white;
      text-transform: uppercase;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 rem(2) $white;
    }

    &--invalid {
      border-color: color.adjust($accent-color, $lightness: 10%);

      &:focus {
        box-shadow: 0 0 0 rem(2) color.adjust($accent-color, $lightness: 10%);
      }
    }
  }

  &__error-message {
    color: $white;
    font-size: rem(12);
    padding: rem(4) rem(40) 0;
    text-align: left;

    @include responsive($breakpoint-tablet) {
      text-align: center;
    }
  }

  &__visual {
    display: flex;
    align-items: center;
  }
}

// Стили для полноэкранной секции
.callback-form--standalone {
  background-color: $secondary-color;
  padding: rem(63) 0;

  @include responsive($breakpoint-tablet) {
    padding: rem(47) 0;
  }
}

// Стили для встроенной формы (в PricingSection)
.callback-form--integrated {
  .callback-form__container {
    padding: 0; // Родитель контролирует отступы
  }

  .callback-form__content {
    background-color: $secondary-color;
    border-radius: rem(20);
    padding: rem(40);
    height: 100%;
    justify-content: center; // Центрируем контент, так как картинки нет

    @include responsive($breakpoint-tablet) {
      padding: rem(30);
    }
    @include responsive($breakpoint-mobile) {
      padding: rem(20);
    }
  }
}
</style>