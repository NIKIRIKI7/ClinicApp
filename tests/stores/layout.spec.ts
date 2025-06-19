import {describe, it, expect, vi} from 'vitest';
import {useLayoutStore} from '../../src/stores/layout';

describe('useLayoutStore', () => {
  it('имеет корректное начальное состояние', () => {
    const store = useLayoutStore();
    expect(store.header.navItems.length).toBe(3);
    expect(store.footer.copyrightBase).toBe('ООО «ГК РТ-Клиника» ИНН 1102334455');
  });

  it('getter fullCopyright правильно формирует строку', () => {
    const store = useLayoutStore();
    const currentYear = new Date().getFullYear();

    const mockDate = new Date(2025, 5, 15);
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    expect(store.fullCopyright).toBe(`© 2025 ${store.footer.copyrightBase}`);

    vi.useRealTimers();
  });
});