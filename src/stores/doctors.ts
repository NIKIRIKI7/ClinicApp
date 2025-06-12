// stores/doctors.ts
import {defineStore} from 'pinia';
import {computed, ref} from 'vue';
import {fetchDoctorsFromApi, fetchInitialData} from '@/api/doctorsApi';
import type {IApiResponse} from '@/api/doctorsApi';

// --- ИНТЕРФЕЙСЫ И ТИПЫ ---

/**
 * @interface IDoctor
 * @description Описывает структуру объекта врача.
 * @property {number} id - Уникальный идентификатор.
 * @property {string} name - Полное имя врача.
 * @property {string[]} specialties - Список специальностей.
 * @property {string} photo - URL фотографии врача.
 * @property {string} [metro] - Станция метро (опционально).
 */
export interface IDoctor {
  id: number;
  name: string;
  specialties: string[];
  photo: string;
  metro?: string;
}

/**
 * @interface IDoctorsFilter
 * @description Определяет фильтры для поиска врачей.
 * @property {string} name - Фильтр по имени.
 * @property {string} specialty - Фильтр по специальности.
 * @property {string} metro - Фильтр по станции метро.
 */
export interface IDoctorsFilter {
  name: string;
  specialty: string;
  metro: string;
}

/**
 * @store useDoctorsStore
 * @description Хранилище для управления списком врачей, фильтрацией и пагинацией.
 */
export const useDoctorsStore = defineStore('doctors', () => {
  // --- STATE ---

  const doctors = ref<IDoctor[]>([]);
  const allSpecialties = ref<string[]>([]);
  const metroStations = ref<string[]>([]);
  const filters = ref<IDoctorsFilter>({
    name: '',
    specialty: '',
    metro: '',
  });
  const currentPage = ref(1);
  const itemsPerPage = ref(4);
  const totalCount = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // --- GETTERS ---

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value));
  const isPrevDisabled = computed(() => currentPage.value === 1 || isLoading.value);
  const isNextDisabled = computed(() => currentPage.value >= totalPages.value || isLoading.value);

  // --- ACTIONS ---

  /**
   * @action fetchDoctors
   * @description Основной action для получения списка врачей. Управляет состоянием загрузки и ошибок.
   */
  const fetchDoctors = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response: IApiResponse = await fetchDoctorsFromApi(filters.value, currentPage.value, itemsPerPage.value);
      doctors.value = response.data;
      totalCount.value = response.totalCount;
    } catch (e) {
      const err = e as Error;
      error.value = err.message || 'Произошла неизвестная ошибка при загрузке данных.';
      doctors.value = [];
      totalCount.value = 0;
    } finally {
      isLoading.value = false;
    }
  };

  /**
   * @action init
   * @description Инициализирует store: загружает данные для фильтров и первый список врачей.
   */
  const init = async () => {
    // Эта функция-оркестратор. Она обеспечивает правильную последовательность,
    // а `fetchDoctors` сам управляет состоянием загрузки.
    try {
      const data = await fetchInitialData();
      allSpecialties.value = data.specialties;
      metroStations.value = data.metroStations;
      // Мы дожидаемся выполнения, чтобы обработать возможную ошибку в этом же `catch`.
      await fetchDoctors();
    } catch (e) {
      const err = e as Error;
      error.value = err.message || 'Не удалось инициализировать данные страницы.';
      // Убедимся, что состояние загрузки сброшено в случае ошибки на любом из этапов.
      isLoading.value = false;
    }
  };

  /**
   * @action applyFilters
   * @description Применяет фильтры и запрашивает данные с первой страницы.
   */
  const applyFilters = () => {
    if (currentPage.value !== 1) {
      currentPage.value = 1;
    }
    // ИСПРАВЛЕНИЕ: Используем `void` для явного игнорирования промиса.
    // Это говорит линтеру, что мы осознанно запускаем асинхронную задачу, не ожидая ее завершения.
    // UI отреагирует на изменение `isLoading`, которое произойдет внутри `fetchDoctors`.
    void fetchDoctors();
  };

  /**
   * @action setPage
   * @description Устанавливает новую страницу и запрашивает данные для нее.
   * @param {number} page - Новый номер страницы.
   */
  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages.value && page !== currentPage.value && !isLoading.value) {
      currentPage.value = page;
      // ИСПРАВЛЕНИЕ: Аналогично `applyFilters`, используем `void`.
      void fetchDoctors();
    }
  };

  return {
    doctors,
    filters,
    allSpecialties,
    metroStations,
    currentPage,
    totalCount,
    isLoading,
    error,
    totalPages,
    isPrevDisabled,
    isNextDisabled,
    init,
    applyFilters,
    setPage,
  };
});