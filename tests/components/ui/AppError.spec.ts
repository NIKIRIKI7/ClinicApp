import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import AppError from '../../../src/components/ui/AppError.vue';

describe('AppError.vue', () => {
  it('отображает сообщение по умолчанию', () => {
    const wrapper = mount(AppError);
    expect(wrapper.text()).toContain('Произошла ошибка');
    expect(wrapper.text()).toContain('Не удалось загрузить данные. Пожалуйста, попробуйте обновить страницу.');
  });

  it('отображает переданное сообщение', () => {
    const message = 'Custom error message';
    const wrapper = mount(AppError, {
      props: {message},
    });
    expect(wrapper.text()).toContain('Произошла ошибка');
    expect(wrapper.text()).toContain(message);
  });
});