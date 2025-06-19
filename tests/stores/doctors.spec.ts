// Файл: tests/stores/doctors.spec.ts
// ИЗМЕНЕННЫЙ ФАЙЛ
import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useDoctorsStore} from '../../src/stores/doctors';
import * as api from '../../src/api/doctorsApi';
import type {IDoctor} from '../../src/types';
import {createPinia, setActivePinia} from "pinia";

vi.mock('../../src/api/doctorsApi');
const mockedApi = vi.mocked(api);

const mockDoctors: IDoctor[] = [{
  id: 1,
  name: 'Dr. House',
  specialties: ['Diagnostician'],
  photo: '',
  metro: 'A'
}];

describe('useDoctorsStore', () => {

  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('инициализирует фильтры и загружает врачей', async () => {
    const store = useDoctorsStore();
    mockedApi.fetchInitialData.mockResolvedValue({
      specialties: ['A'],
      metroStations: ['B']
    });
    mockedApi.fetchDoctorsFromApi.mockResolvedValue({
      data: mockDoctors,
      totalCount: 1
    });

    await store.init();

    expect(store.isLoading).toBe(false);
    expect(store.allSpecialties).toEqual(['A']);
    expect(store.metroStations).toEqual(['B']);
    expect(store.doctors).toEqual(mockDoctors);
    expect(store.totalCount).toBe(1);
  });

  it('обрабатывает ошибку при инициализации', async () => {
    const store = useDoctorsStore();
    const error = new Error('Init Failed');
    mockedApi.fetchInitialData.mockRejectedValue(error);
    await store.init();
    expect(store.error).toBe(error.message);
  });

  // НОВЫЙ ТЕСТ: Покрывает ветку || в блоке catch метода init
  it('обрабатывает ошибку без message при инициализации', async () => {
    const store = useDoctorsStore();
    mockedApi.fetchInitialData.mockRejectedValue('Some string error'); // Ошибка без message
    await store.init();
    expect(store.error).toBe('Не удалось инициализировать данные страницы.');
  });

  it('обрабатывает ошибку при загрузке врачей', async () => {
    const store = useDoctorsStore();
    const error = new Error('Fetch Failed');
    mockedApi.fetchDoctorsFromApi.mockRejectedValue(error);
    await store.applyFilters(); // Вызовет fetchDoctors
    expect(store.error).toBe(error.message);
    expect(store.doctors).toEqual([]);
    expect(store.totalCount).toBe(0);
  });

  // НОВЫЙ ТЕСТ: Покрывает ветку || в блоке catch метода fetchDoctors
  it('обрабатывает ошибку без message при загрузке врачей', async () => {
    const store = useDoctorsStore();
    mockedApi.fetchDoctorsFromApi.mockRejectedValue({});
    await store.applyFilters();
    expect(store.error).toBe('Произошла неизвестная ошибка при загрузке данных.');
  });

  it('применяет фильтры и сбрасывает пагинацию', async () => {
    const store = useDoctorsStore();
    store.currentPage = 3;
    mockedApi.fetchDoctorsFromApi.mockResolvedValue({data: [], totalCount: 0}); // Мок для успешного выполнения
    await store.applyFilters();
    expect(store.currentPage).toBe(1);
    expect(mockedApi.fetchDoctorsFromApi).toHaveBeenCalled();
  });

  it('переходит на следующую страницу', async () => {
    const store = useDoctorsStore();
    store.totalCount = 10;
    store.itemsPerPage = 4;
    store.currentPage = 1;
    mockedApi.fetchDoctorsFromApi.mockResolvedValue({data: [], totalCount: 10});
    store.goToNextPage();
    expect(store.currentPage).toBe(2);
    expect(mockedApi.fetchDoctorsFromApi).toHaveBeenCalled();
  });

  it('переходит на предыдущую страницу', async () => {
    const store = useDoctorsStore();
    store.currentPage = 2;
    mockedApi.fetchDoctorsFromApi.mockResolvedValue({data: [], totalCount: 10});
    store.goToPrevPage();
    expect(store.currentPage).toBe(1);
    expect(mockedApi.fetchDoctorsFromApi).toHaveBeenCalled();
  });

  it('корректно вычисляет totalPages', () => {
    const store = useDoctorsStore();
    store.totalCount = 10;
    store.itemsPerPage = 4; // 10 / 4 = 2.5 -> 3
    expect(store.totalPages).toBe(3);
  });
});