import {defineStore} from 'pinia';
import {ref} from 'vue';
import type {Ref} from 'vue';

/**
 * @factory createContentStore
 * @description Создает Pinia store для управления асинхронно загружаемым контентом.
 * @param id - Уникальный ID для нового хранилища.
 * @param fetcher - Асинхронная функция, которая возвращает данные.
 */
export function createContentStore<T>(id: string, fetcher: () => Promise<T>) {
  return defineStore(id, () => {
    const items = ref<T | null>(null) as Ref<T | null>;
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchItems = async () => {
      if (items.value) return;

      isLoading.value = true;
      error.value = null;
      try {
        items.value = await fetcher();
      } catch (e) {
        const err = e as Error;
        error.value = err.message || 'Не удалось загрузить данные.';
      } finally {
        isLoading.value = false;
      }
    };

    return {items, isLoading, error, fetchItems};
  });
}