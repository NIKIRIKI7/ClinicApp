import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import AppLoader from '../../../src/components/ui/AppLoader.vue';

describe('AppLoader.vue', () => {
  it('рендерится корректно', () => {
    const wrapper = mount(AppLoader);
    expect(wrapper.find('.app-loader').exists()).toBe(true);
    expect(wrapper.find('.app-loader__spinner').exists()).toBe(true);
  });
});