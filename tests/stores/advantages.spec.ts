import {describe, it, expect, beforeEach} from 'vitest';
import {useAdvantagesStore} from '../../src/stores/advantages';
import {setActivePinia, createPinia} from 'pinia';

describe('useAdvantagesStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('создается корректно', () => {
    const store = useAdvantagesStore();
    expect(store.$id).toBe('advantages');
    expect(store.items).toBe(null);
  });
});