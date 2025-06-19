import {describe, it, expect, vi} from 'vitest';
import {
  createContentStore
} from '../../src/stores/factories/createContentStore';

// Тестируем фабрику на примере одного из сторов, который ее использует (например, promotions)
describe('createContentStore Factory', () => {
  const mockData = [{id: 1, text: 'Test'}];
  const mockFetcher = vi.fn();
  const useTestStore = createContentStore('test', mockFetcher);

  it('инициализируется с пустыми значениями', () => {
    const store = useTestStore();
    expect(store.items).toBe(null);
    expect(store.isLoading).toBe(false);
    expect(store.error).toBe(null);
  });

  it('успешно загружает данные', async () => {
    mockFetcher.mockResolvedValue(mockData);
    const store = useTestStore();

    await store.fetchItems();

    expect(store.isLoading).toBe(false);
    expect(store.items).toEqual(mockData);
    expect(store.error).toBe(null);
    expect(mockFetcher).toHaveBeenCalledOnce();
  });

  it('обрабатывает ошибку при загрузке', async () => {
    const error = new Error('Network Error');
    mockFetcher.mockRejectedValue(error);
    const store = useTestStore();

    await store.fetchItems();

    expect(store.isLoading).toBe(false);
    expect(store.items).toBe(null);
    expect(store.error).toBe('Network Error');
  });

  it('не загружает данные повторно, если они уже есть', async () => {
    mockFetcher.mockResolvedValue(mockData);
    const store = useTestStore();

    await store.fetchItems();
    await store.fetchItems();

    expect(mockFetcher).toHaveBeenCalledOnce();
  });
});