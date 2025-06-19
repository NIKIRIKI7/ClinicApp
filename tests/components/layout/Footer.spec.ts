import {describe, it, expect, beforeEach} from 'vitest';
import {mount} from '@vue/test-utils';
import {createPinia, setActivePinia} from 'pinia';
import Footer from '../../../src/components/layout/Footer.vue';
import {useLayoutStore} from '../../../src/stores/layout';

describe('Footer.vue', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('рендерит данные из layoutStore', () => {
    const store = useLayoutStore();
    const wrapper = mount(Footer, {
      global: {
        plugins: [createPinia()]
      }
    });

    expect(wrapper.text()).toContain(store.footer.disclaimer);
    expect(wrapper.text()).toContain(store.fullCopyright);
  });

  it('применяет классы темы', () => {
    const wrapperDark = mount(Footer, {
      props: {theme: 'dark'},
      global: {plugins: [createPinia()]}
    });
    expect(wrapperDark.classes()).toContain('footer--dark');

    const wrapperLight = mount(Footer, {
      props: {theme: 'light'},
      global: {plugins: [createPinia()]}
    });
    expect(wrapperLight.classes()).toContain('footer--light');
  });
});