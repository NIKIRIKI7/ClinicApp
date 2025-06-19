import {describe, it, expect, beforeEach} from 'vitest';
import {usePromotionsStore} from '../../src/stores/promotions';
import {setActivePinia, createPinia} from 'pinia';

describe('usePromotionsStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('создается корректно', () => {
    const store = usePromotionsStore();
    expect(store.$id).toBe('promotions');
    expect(store.items).toBe(null);
  });
});