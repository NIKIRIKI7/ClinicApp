import {describe, it, expect, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {nextTick} from 'vue';
import AppModal from '../../../src/components/ui/AppModal.vue';

describe('AppModal.vue', () => {
  it('не рендерится, когда isOpen=false', () => {
    const wrapper = mount(AppModal, {props: {isOpen: false}});
    expect(wrapper.find('.app-modal').exists()).toBe(false);
  });

  it('устанавливает фокус на кнопку закрытия, если в слоте нет фокусируемых элементов', async () => {
    const wrapper = mount(AppModal, {
      props: {isOpen: false},
      slots: {default: '<div>Just text, no buttons</div>'},
      // ИСПРАВЛЕНИЕ: Компонент должен быть присоединен к DOM для управления фокусом
      attachTo: document.body,
    });

    await wrapper.setProps({isOpen: true});
    await nextTick();

    // ИСПРАВЛЕНИЕ: Ищем кнопку в document, а не в wrapper
    const closeButton = document.querySelector('.app-modal__close') as HTMLElement;
    expect(document.activeElement).toBe(closeButton);

    wrapper.unmount();
  });

  it('рендерится при isOpen=true и эмиттит событие close', async () => {
    const wrapper = mount(AppModal, {
      props: {isOpen: true},
      slots: {default: 'Modal Content'},
      // ИСПРАВЛЕНИЕ: Компонент должен быть присоединен к DOM, чтобы teleport работал
      attachTo: document.body,
    });

    await nextTick();

    // ИСПРАВЛЕНИЕ: Ищем элементы в document
    const modalElement = document.querySelector('.app-modal');
    const closeButtonElement = document.querySelector('.app-modal__close');

    // Проверяем, что элементы существуют в DOM
    expect(modalElement).not.toBeNull();
    expect(closeButtonElement).not.toBeNull();

    // Симулируем клик по фону
    modalElement!.dispatchEvent(new MouseEvent('click'));
    await nextTick();
    expect(wrapper.emitted('close')).toHaveLength(1);

    // Симулируем клик по кнопке закрытия
    closeButtonElement!.dispatchEvent(new MouseEvent('click'));
    await nextTick();
    expect(wrapper.emitted('close')).toHaveLength(2);

    wrapper.unmount();
  });

  it('управляет фокусом при открытии и закрытии', async () => {
    const initialFocusElement = document.createElement('button');
    document.body.appendChild(initialFocusElement);
    initialFocusElement.focus();
    expect(document.activeElement).toBe(initialFocusElement);

    const wrapper = mount(AppModal, {
      props: {isOpen: false},
      slots: {default: '<button id="modal-button">Focus me</button>'},
      attachTo: document.body,
    });

    // Открываем модальное окно
    await wrapper.setProps({isOpen: true});
    await nextTick();

    const modalButton = document.getElementById('modal-button');
    expect(document.activeElement).toBe(modalButton);

    // Закрываем модальное окно
    await wrapper.setProps({isOpen: false});
    await nextTick();

    // Фокус должен вернуться на исходный элемент
    expect(document.activeElement).toBe(initialFocusElement);

    wrapper.unmount();
    document.body.removeChild(initialFocusElement);
  });
});