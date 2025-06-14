<!-- src/components/ui/AppModal.vue (УЛУЧШЕННЫЙ) -->
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';

interface Props {
  isOpen: boolean;
  variant?: 'card' | 'image'; // Вариант отображения
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'card', // По умолчанию - текстовая карточка
});

const emit = defineEmits(['close']);

const modalContentRef = ref<HTMLElement | null>(null);
const triggerElement = ref<HTMLElement | null>(null);

const handleModalClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};

// Управление фокусом для доступности (a11y)
watch(() => props.isOpen, async (isOpen) => {
  if (isOpen) {
    // Сохраняем элемент, который открыл модалку
    triggerElement.value = document.activeElement as HTMLElement;
    // Ждем, пока DOM обновится, и устанавливаем фокус внутрь модалки
    await nextTick();
    const focusableElement = modalContentRef.value?.querySelector('button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement;
    focusableElement?.focus();
  } else {
    // Возвращаем фокус на исходный элемент
    triggerElement.value?.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div v-if="isOpen" class="app-modal" @click="handleModalClick">
        <Transition name="modal-scale" appear>
          <div
              v-if="isOpen"
              ref="modalContentRef"
              :class="['app-modal__content', `app-modal__content--${variant}`]"
              role="dialog"
              aria-modal="true"
          >
            <button
                class="app-modal__close"
                aria-label="Закрыть модальное окно"
                @click="emit('close')"
            >
              ×
            </button>
            <slot />
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(35, 35, 35, 0.9);
  @include flex-center;
  z-index: z('modal');
  padding: rem(20px);
}

.app-modal__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

// Стили для варианта "карточка" (текст, ошибки)
.app-modal__content--card {
  background-color: $white;
  padding: rem(40px) rem(50px);
  border-radius: rem(12px);
  color: $text-color-dark;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: rem(20px);
  align-items: center;

  @include responsive($breakpoint-mobile) {
    padding: rem(30px) rem(20px);
  }

  // Стилизуем контент из слота
  :deep(h3) {
    font-size: rem(24px);
    font-weight: $font-weight-bold;
    margin: 0;
  }
  :deep(p) {
    font-size: rem(16px);
    line-height: 1.5;
    margin: 0;
    max-width: rem(350px);
  }
}

// Стили для варианта "изображение"
.app-modal__content--image {
  background: none;
  padding: 0;
  // Стилизуем img из слота
  :deep(img) {
    display: block;
    max-height: 90vh;
    max-width: 90vw;
    object-fit: contain;
    border-radius: rem(12px);
  }
}

.app-modal__close {
  @include flex-center;
  position: absolute;
  top: rem(-15);
  right: rem(-15);
  width: rem(40);
  height: rem(40);
  border-radius: 50%;
  border: none;
  background-color: $white;
  font-size: rem(24);
  font-weight: $font-weight-bold;
  line-height: 1;
  color: $text-color-dark;
  cursor: pointer;
  box-shadow: 0 rem(4) rem(15) rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;
  z-index: 10;

  @include responsive($breakpoint-mobile) {
    top: rem(5);
    right: rem(5);
    width: rem(30);
    height: rem(30);
    font-size: rem(20);
  }
  @include on-event {
    transform: scale(1.1) rotate(90deg);
    background-color: $accent-color;
    color: $white;
  }
}

.modal-fade-enter-active, .modal-fade-leave-active { transition: opacity 0.3s ease; }
.modal-fade-enter-from, .modal-fade-leave-to { opacity: 0; }
.modal-scale-enter-active, .modal-scale-leave-active { transition: all 0.3s ease; }
.modal-scale-enter-from, .modal-scale-leave-to { transform: scale(0.85); opacity: 0; }
</style>