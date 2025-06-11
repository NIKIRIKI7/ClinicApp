<script
    setup
    lang="ts"
>
interface SliderItem {
  id: number;
  src: string;
  alt: string;
}

interface Props {
  isOpen: boolean;
  item: SliderItem | null;
}

defineProps<Props>();
const emit = defineEmits(['close']);

const handleModalClick = (event: MouseEvent) => {
  if (event.target === event.currentTarget) {
    emit('close');
  }
};
</script>

<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
          v-if="isOpen"
          class="app-modal"
          @click="handleModalClick"
      >

        <Transition
            name="modal-scale"
            appear
        >


          <div
              v-if="isOpen"
              class="app-modal__content"
          >
            <button
                class="app-modal__close"
                aria-label="Закрыть модальное окно"
                @click="emit('close')"
            >
              ×
            </button>
            <img
                v-if="item"
                :src="item.src"
                :alt="item.alt"
                class="app-modal__image"
            />
          </div>

        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style
    lang="scss"
    scoped
>
// Стили полностью инкапсулированы здесь. Они будут одинаковы для всех модальных окон в приложении.
@use '../../assets/scss/abstracts/variables' as *;
@use '../../assets/scss/abstracts/mixins' as *;

.app-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  @include flex-center;
  z-index: z('modal');
}

.app-modal__content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
}

.app-modal__image {
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: rem(12);
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

  @include on-event {
    transform: scale(1.1) rotate(90deg);
    background-color: $accent-color;
    color: $white;
  }
}

// Анимации
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-scale-enter-active,
.modal-scale-leave-active {
  transition: all 0.3s ease;
}

.modal-scale-enter-from,
.modal-scale-leave-to {
  transform: scale(0.85);
  opacity: 0;
}
</style>