import {
  allDoctorsMock,
  allSpecialtiesMock,
  metroStationsMock
} from './mockData';
import type {IDoctor, IDoctorsFilter, IDoctorsApiResponse} from '@/types';

/**
 * @description Имитирует асинхронный запрос к API для получения списка врачей.
 */
export const fetchDoctorsFromApi = (filters: IDoctorsFilter, page: number, limit: number): Promise<IDoctorsApiResponse> => {
  const filtered = allDoctorsMock.filter(doctor => {
    const nameMatch = doctor.name.toLowerCase().includes(filters.name.toLowerCase());
    const specialtyMatch = filters.specialty ? doctor.specialties.includes(filters.specialty) : true;
    const metroMatch = filters.metro ? doctor.metro === filters.metro : true;
    return nameMatch && specialtyMatch && metroMatch;
  });

  const totalCount = filtered.length;
  const paginatedData = filtered.slice((page - 1) * limit, page * limit);

  return Promise.resolve({data: paginatedData, totalCount});
};

/**
 * @description Имитирует получение данных для инициализации фильтров.
 */
export const fetchInitialData = (): Promise<{
  specialties: string[],
  metroStations: string[]
}> => {
  return Promise.resolve({
    specialties: allSpecialtiesMock,
    metroStations: metroStationsMock,
  });
};