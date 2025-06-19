import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import Button from '../../../src/components/ui/Button.vue';

describe('Button.vue', () => {
  it('рендерит тег <button> по умолчанию', () => {
    const wrapper = mount(Button, {slots: {default: 'Click me'}});
    expect(wrapper.find('button').exists()).toBe(true);
    expect(wrapper.text()).toBe('Click me');
  });

  it('рендерит тег <a>, если указан prop tag="a"', () => {
    const wrapper = mount(Button, {props: {tag: 'a', href: '/path'}});
    const link = wrapper.find('a');
    expect(link.exists()).toBe(true);
    expect(link.attributes('href')).toBe('/path');
  });

  it('применяет класс `base-button--primary` по умолчанию', () => {
    const wrapper = mount(Button);
    expect(wrapper.classes()).toContain('base-button--primary');
  });

  it('применяет класс `base-button--secondary` при variant="secondary"', () => {
    const wrapper = mount(Button, {props: {variant: 'secondary'}});
    expect(wrapper.classes()).toContain('base-button--secondary');
  });
});