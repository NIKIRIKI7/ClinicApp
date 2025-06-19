import {defineStore} from 'pinia';
import {ref, computed} from 'vue';
import type {Ref, ComputedRef} from 'vue';
import {fetchServices} from '@/api/contentApi';
import type {IService} from '@/types';

/**
 * @store useServicesStore
 * @description Хранилище для управления списком услуг и текущей выбранной услугой.
 */
export const useServicesStore = defineStore('services', () => {
  const services: Ref<IService[]> = ref([]);
  const activeServiceId: Ref<number | null> = ref(null);
  const isLoading: Ref<boolean> = ref(false);
  const error: Ref<string | null> = ref(null);

  /**
   * @getter {ComputedRef<IService | null>} activeService
   * @description Возвращает полный объект текущей активной услуги.
   */
  const activeService: ComputedRef<IService | null> = computed(() => {
    return services.value.find(s => s.id === activeServiceId.value) ?? null;
  });

  /**
   * @action fetchServices
   * @description Загружает список услуг из API.
   */
  const loadServices = async () => {
    if (services.value.length) return;
    isLoading.value = true;
    error.value = null;
    try {
      const data = await fetchServices();
      services.value = data;
      if (data.length > 0) {
        activeServiceId.value = data[0].id;
      }
    } catch (e) {
      const err = e as Error;
      error.value = err.message || 'Не удалось загрузить список услуг.';
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * @action setActiveService
   * @description Устанавливает активную услугу по ее ID.
   * @param {number} id - ID услуги.
   */
  const setActiveService = (id: number) => {
    activeServiceId.value = id;
  };

  return {
    services,
    activeServiceId,
    isLoading,
    error,
    activeService,
    loadServices,
    setActiveService,
  };
});