import {describe, it, expect} from 'vitest';
import {fetchDoctorsFromApi, fetchInitialData} from '../../src/api/doctorsApi';
import {
  allDoctorsMock,
  allSpecialtiesMock,
  metroStationsMock
} from '../../src/api/mockData';

// Тестируем логику фильтрации и пагинации в мок-API
describe('doctorsApi', () => {
  describe('fetchDoctorsFromApi', () => {
    it('возвращает всех врачей без фильтров', async () => {
      const filters = {name: '', specialty: '', metro: ''};
      const response = await fetchDoctorsFromApi(filters, 1, 10);
      expect(response.data.length).toBe(allDoctorsMock.length);
      expect(response.totalCount).toBe(allDoctorsMock.length);
    });

    it('фильтрует врачей по имени', async () => {
      const filters = {name: 'Иванов', specialty: '', metro: ''};
      const response = await fetchDoctorsFromApi(filters, 1, 10);
      expect(response.data.length).toBe(1);
      expect(response.data[0].name).toContain('Иванов');
    });

    it('фильтрует врачей по специальности', async () => {
      const filters = {name: '', specialty: 'Ортодонт', metro: ''};
      const response = await fetchDoctorsFromApi(filters, 1, 10);
      expect(response.totalCount).toBe(3);
      expect(response.data.every(d => d.specialties.includes('Ортодонт'))).toBe(true);
    });

    it('фильтрует врачей по метро', async () => {
      const filters = {name: '', specialty: '', metro: 'Кропоткинская'};
      const response = await fetchDoctorsFromApi(filters, 1, 10);
      expect(response.totalCount).toBe(3);
      expect(response.data.every(d => d.metro === 'Кропоткинская')).toBe(true);
    });

    it('корректно применяет пагинацию', async () => {
      const filters = {name: '', specialty: '', metro: ''};
      const page = 2;
      const limit = 3;
      const response = await fetchDoctorsFromApi(filters, page, limit);

      const expectedData = allDoctorsMock.slice((page - 1) * limit, page * limit);

      expect(response.data.length).toBe(limit);
      expect(response.data).toEqual(expectedData);
    });
  });

  describe('fetchInitialData', () => {
    it('возвращает специальности и станции метро', async () => {
      const response = await fetchInitialData();
      expect(response.specialties).toEqual(allSpecialtiesMock);
      expect(response.metroStations).toEqual(metroStationsMock);
    });
  });
});