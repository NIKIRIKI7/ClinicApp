import {defineStore} from 'pinia';
import {computed, ref, reactive} from 'vue';
import {fetchDoctorsFromApi, fetchInitialData} from '@/api/doctorsApi';
import type {IDoctor, IDoctorsFilter, IDoctorsApiResponse} from '@/types';

/**
 * @store useDoctorsStore
 * @description Хранилище для управления списком врачей, фильтрацией и пагинацией.
 */
export const useDoctorsStore = defineStore('doctors', () => {
  const doctors = ref<IDoctor[]>([]);
  const allSpecialties = ref<string[]>([]);
  const metroStations = ref<string[]>([]);
  const filters = reactive<IDoctorsFilter>({
    name: '',
    specialty: '',
    metro: ''
  });
  const currentPage = ref(1);
  const itemsPerPage = ref(4);
  const totalCount = ref(0);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const totalPages = computed(() => Math.ceil(totalCount.value / itemsPerPage.value));
  const isPrevDisabled = computed(() => currentPage.value === 1 || isLoading.value);
  const isNextDisabled = computed(() => currentPage.value >= totalPages.value || isLoading.value);

  const fetchDoctors = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response: IDoctorsApiResponse = await fetchDoctorsFromApi(filters, currentPage.value, itemsPerPage.value);
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

  const init = async () => {
    if (allSpecialties.value.length > 0) {
      void fetchDoctors();
      return;
    }
    isLoading.value = true;
    try {
      const data = await fetchInitialData();
      allSpecialties.value = data.specialties;
      metroStations.value = data.metroStations;
      await fetchDoctors();
    } catch (e) {
      const err = e as Error;
      error.value = err.message || 'Не удалось инициализировать данные страницы.';
    } finally {
      isLoading.value = false;
    }
  };

  const applyFilters = () => {
    currentPage.value = 1;
    void fetchDoctors();
  };

  const goToNextPage = () => {
    if (!isNextDisabled.value) {
      currentPage.value++;
      void fetchDoctors();
    }
  };

  const goToPrevPage = () => {
    if (!isPrevDisabled.value) {
      currentPage.value--;
      void fetchDoctors();
    }
  };

  return {
    doctors,
    filters,
    allSpecialties,
    metroStations,
    currentPage,
    itemsPerPage,
    totalCount,
    isLoading,
    error,
    totalPages,
    isPrevDisabled,
    isNextDisabled,
    init,
    applyFilters,
    goToNextPage,
    goToPrevPage,
  };
});