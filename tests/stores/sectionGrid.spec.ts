import {describe, it, expect, beforeEach} from 'vitest';
import {useSectionGridStore} from '../../src/stores/sectionGrid';
import {setActivePinia, createPinia} from 'pinia';

describe('useSectionGridStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('создается корректно', () => {
    const store = useSectionGridStore();
    expect(store.$id).toBe('sectionGrid');
    expect(store.items).toBe(null);
  });
});