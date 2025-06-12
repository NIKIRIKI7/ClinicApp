// src/api/doctorsApi.ts

// ИСПРАВЛЕНИЕ: Добавлено ключевое слово `type` для type-only импорта.
import type {IDoctor, IDoctorsFilter} from '@/stores/doctors';
// В реальном проекте импорты будут удалены, URL будут приходить с бэкенда
import doctorPhoto1 from '@/assets/images/doctor__item1.png';
import doctorPhoto2 from '@/assets/images/doctor__item2.png';
import doctorPhoto3 from '@/assets/images/doctor__item3.png';
import doctorPhoto4 from '@/assets/images/doctor__item4.png';
import doctorPhoto5 from '@/assets/images/doctor__item4.png';
import doctorPhoto6 from '@/assets/images/doctor__item3.png';
import doctorPhoto7 from '@/assets/images/doctor__item2.png';
import doctorPhoto8 from '@/assets/images/doctor__item1.png';

/**
 * @type {IDoctor[]}
 * @description Полная база данных врачей. В реальном мире это будет на сервере.
 * @private
 */
const _allDoctors: IDoctor[] = [
  {
    id: 1,
    name: 'Анна Иванова',
    specialties: ['Терапевт', 'Пародонтолог'],
    photo: doctorPhoto1,
    metro: 'Парк Культуры'
  },
  {
    id: 2,
    name: 'Александр Петров',
    specialties: ['Ортодонт'],
    photo: doctorPhoto2,
    metro: 'Кропоткинская'
  },
  {
    id: 3,
    name: 'Алла Матвеева',
    specialties: ['Стоматолог детский'],
    photo: doctorPhoto3,
    metro: 'Арбатская'
  },
  {
    id: 4,
    name: 'Анастасия Кирова',
    specialties: ['Ортодонт'],
    photo: doctorPhoto4,
    metro: 'Смоленская'
  },
  {
    id: 5,
    name: 'Сергей Васильев',
    specialties: ['Хирург'],
    photo: doctorPhoto5,
    metro: 'Парк Культуры'
  },
  {
    id: 6,
    name: 'Мария Семенова',
    specialties: ['Терапевт'],
    photo: doctorPhoto6,
    metro: 'Кропоткинская'
  },
  {
    id: 7,
    name: 'Иван Козлов',
    specialties: ['Стоматолог детский', 'Ортодонт'],
    photo: doctorPhoto7,
    metro: 'Арбатская'
  },
  {
    id: 8,
    name: 'Елена Смирнова',
    specialties: ['Пародонтолог'],
    photo: doctorPhoto8,
    metro: 'Смоленская'
  },
];

/**
 * @interface IApiResponse
 * @description Описывает структуру ответа от API.
 * @property {IDoctor[]} data - Массив врачей для текущей страницы.
 * @property {number} totalCount - Общее количество врачей, соответствующих фильтрам.
 */
export interface IApiResponse {
  data: IDoctor[];
  totalCount: number;
}

/**
 * @function fetchDoctorsFromApi
 * @description Имитирует асинхронный запрос к API для получения списка врачей.
 * @param {IDoctorsFilter} filters - Объект с фильтрами.
 * @param {number} page - Номер страницы.
 * @param {number} limit - Количество элементов на странице.
 * @returns {Promise<IApiResponse>}
 */
export const fetchDoctorsFromApi = (filters: IDoctorsFilter, page: number, limit: number): Promise<IApiResponse> => {
  console.log('API call with filters:', filters, 'Page:', page);

  return new Promise(resolve => {
    setTimeout(() => {
      // 1. Фильтрация
      const filtered = _allDoctors.filter(doctor => {
        const nameMatch = doctor.name.toLowerCase().includes(filters.name.toLowerCase());
        const specialtyMatch = filters.specialty ? doctor.specialties.includes(filters.specialty) : true;
        const metroMatch = filters.metro ? doctor.metro === filters.metro : true;
        return nameMatch && specialtyMatch && metroMatch;
      });

      // 2. Пагинация
      const start = (page - 1) * limit;
      const end = start + limit;
      const paginatedData = filtered.slice(start, end);

      resolve({
        data: paginatedData,
        totalCount: filtered.length,
      });
    }, 500); // Имитация задержки сети
  });
};

/**
 * @function fetchInitialData
 * @description Имитирует получение данных для инициализации фильтров (специальности, метро).
 * @returns {Promise<{specialties: string[], metroStations: string[]}>}
 */
export const fetchInitialData = (): Promise<{
  specialties: string[],
  metroStations: string[]
}> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const specialties = new Set(_allDoctors.flatMap(doc => doc.specialties));
      const metroStations = new Set(_allDoctors.map(doc => doc.metro as string));
      resolve({
        specialties: Array.from(specialties),
        metroStations: Array.from(metroStations),
      });
    }, 200);
  });
};