import {describe, it, expect} from 'vitest';
import {mount} from '@vue/test-utils';
import UIPagination from '../../../src/components/ui/UIPagination.vue';

describe('UIPagination.vue', () => {
  it('эмиттит события prev и next', async () => {
    const wrapper = mount(UIPagination, {
      props: {isPrevDisabled: false, isNextDisabled: false},
    });

    await wrapper.find('.ui-pagination__button--prev').trigger('click');
    expect(wrapper.emitted('prev')).toHaveLength(1);

    await wrapper.find('.ui-pagination__button--next').trigger('click');
    expect(wrapper.emitted('next')).toHaveLength(1);
  });

  it('блокирует кнопки', () => {
    const wrapper = mount(UIPagination, {
      props: {isPrevDisabled: true, isNextDisabled: true},
    });
    expect(wrapper.find('.ui-pagination__button--prev').attributes('disabled')).toBeDefined();
    expect(wrapper.find('.ui-pagination__button--next').attributes('disabled')).toBeDefined();
  });
});