import {markRaw} from 'vue';
import type {
  SectionGridItemData,
  Promotion,
  License,
  GalleryImage,
  AdvantagesData,
  IDoctor,
  HeroData,
  IService,
  IPricingItem
} from '@/types';

// Иконки
import IconNews from '@/assets/icons/news__icon.svg?component';
import IconTech from '@/assets/icons/tech__icon.svg?component';
import IconReviews from '@/assets/icons/reviews__icon.svg?component';
import IconGallery from '@/assets/icons/gallery__icon.svg?component';
import IconLegal from '@/assets/icons/legal__icon.svg?component';
import IconData from '@/assets/icons/processing__icon.svg?component';

// Изображения
import promoImage1 from '@/assets/images/promo__item1.png';
import promoImage2 from '@/assets/images/promo__item2.png';
import promoImage3 from '@/assets/images/promo__item3.png';
import licenseImage1 from '@/assets/images/license-1.png';
import licenseImage2 from '@/assets/images/license-2.png';
import licenseImage3 from '@/assets/images/license-3.png';
import licenseImage4 from '@/assets/images/license-4.png';
import galleryImage1 from '@/assets/images/gallery__item1.png';
import galleryImage2 from '@/assets/images/gallery__item2.png';
import galleryImage3 from '@/assets/images/gallery__item3.png';
import galleryImage4 from '@/assets/images/gallery__item4.png';
import doctorPhoto1 from '@/assets/images/doctor__item1.png';
import doctorPhoto2 from '@/assets/images/doctor__item2.png';
import doctorPhoto3 from '@/assets/images/doctor__item3.png';
import doctorPhoto4 from '@/assets/images/doctor__item4.png';
import blobImage from '@/assets/images/blob.png';
import serviceImage1 from '@/assets/images/service-1.png';
import serviceImage2 from '@/assets/images/service-2.png';
import serviceImage3 from '@/assets/images/service-3.png';
import serviceImage4 from '@/assets/images/service-4.png';
import serviceImage5 from '@/assets/images/service-5.png';
import serviceImage6 from '@/assets/images/service-6.png';


// Экспортируемые данные
export const mockSectionGridItems: SectionGridItemData[] = [
  {id: 1, text: 'НОВОСТИ', to: '/news', icon: markRaw(IconNews)},
  {
    id: 2,
    text: 'ТЕХНОЛОГИИ И ОБОРУДОВАНИЕ',
    to: '/technologies',
    icon: markRaw(IconTech)
  },
  {id: 3, text: 'ОТЗЫВЫ', to: '/reviews', icon: markRaw(IconReviews)},
  {id: 4, text: 'ГАЛЕРЕЯ', to: '/gallery', icon: markRaw(IconGallery)},
  {id: 5, text: 'ПРАВОВАЯ ИНФОРМАЦИЯ', to: '/legal', icon: markRaw(IconLegal)},
  {
    id: 6,
    text: 'ОБРАБОТКА ПЕРСОНАЛЬНЫХ ДАННЫХ',
    to: '/personal-data',
    icon: markRaw(IconData)
  },
];

export const mockPromotions: Promotion[] = [
  {
    id: 1,
    image: promoImage1,
    alt: 'Стоматолог осматривает зубы пациента-ребенка',
    date: 'до 31 декабря 2025 года',
    title: 'Год здоровой улыбки',
    description: 'До конца года действует скидка 500 рублей на повторную процедуру гигиены полости рта.'
  },
  {
    id: 2,
    image: promoImage2,
    alt: 'Лечение зубов ребенка под наркозом',
    date: 'до 1 июня 2025 года',
    title: 'Лечение зубов во сне',
    description: 'Консультация детского стоматолога перед лечение зубов под наркозом - бесплатно!'
  },
  {
    id: 3,
    image: promoImage3,
    alt: 'Врач-стоматолог проводит осмотр пожилому мужчине',
    date: 'с 1 по 31 мая 2025 года',
    title: 'Оставайтесь с нами',
    description: 'Продолжайте обслуживание во взрослом отделении клиники.'
  },
];

export const mockLicenses: License[] = [
  {id: 1, src: licenseImage1, alt: 'Лицензия 1'},
  {id: 2, src: licenseImage2, alt: 'Лицензия 2'},
  {id: 3, src: licenseImage3, alt: 'Лицензия 3'},
  {id: 4, src: licenseImage4, alt: 'Лицензия 4'},
  {id: 5, src: licenseImage4, alt: 'Лицензия 5'},
];

export const mockGalleryImages: GalleryImage[] = [
  {
    id: 1,
    src: galleryImage1,
    alt: 'Интерьер клиники: стоматологическое кресло'
  },
  {
    id: 2,
    src: galleryImage2,
    alt: 'Интерьер клиники: рабочее место специалиста'
  },
  {id: 3, src: galleryImage3, alt: 'Интерьер клиники: процедурный кабинет'},
  {id: 4, src: galleryImage4, alt: 'Интерьер клиники: зона ожидания'},
  {id: 5, src: galleryImage1, alt: 'Интерьер клиники: вид сверху на кресло'},
];

export const mockAdvantages: AdvantagesData = {
  title: 'Наши преимущества',
  blob: {src: blobImage, alt: 'Декоративный фоновый элемент'},
  items: [
    {
      id: 1,
      title: 'Команда профессионалов',
      description: 'На сегодняшний момент в нашем штате более 100 специалистов, в том числе кандидаты медицинских наук и врачи с международными сертификатами: стоматологи-терапевты, пародонтологи, хирурги-имплантологи, гнатологи, стоматологи-ортопеды и ортодонты. Отделения нашей стоматологии располагают также собственной зуботехнической лабораторией, среди сотрудников которой 10 квалифицированных зубных техников.'
    },
    {
      id: 2,
      title: 'Передовые технологии и оборудование',
      description: `Высокотехнологичное оснащение отделений стоматологии позволяет выполнять качественную диагностику и стоматологические процедуры различного уровня сложности:
        <ul style="list-style-position: inside; padding-left: 0; margin-top: 10px;">
          <li>компьютерные томографы Vatech и Galileos;</li>
          <li>микроскопы Leica;</li>
          <li>имплантологические системы ведущих мировых брендов;</li>
          <li>рентген-аппарат нового поколения;</li>
          <li>аппараты для профессионального отбеливания зубов ZOOM4, ZOOM3, Blanche Brillante;</li>
          <li>компьютерная анестезия;</li>
          <li>компьютерная диагностика тканей пародонта.</li>
        </ul>`
    },
  ],
};

export const mockHeroData: HeroData = {
  titleLines: ['ЗДОРОВЬЕ', 'КРАСОТА', 'КАЧЕСТВО'],
  badgeText: 'СТОМАТОЛОГИЧЕСКОЕ\nОБОРУДОВАНИЕ ИЗ\nГЕРМАНИИ',
  buttonText: 'ЗАПИСАТЬСЯ НА ПРИЕМ',
};

export const allDoctorsMock: IDoctor[] = [
  {
    id: 1,
    name: 'Иванов Иван Иванович',
    specialties: ['Терапевт', 'Хирург'],
    photo: doctorPhoto1,
    metro: 'Кропоткинская'
  },
  {
    id: 2,
    name: 'Петрова Анна Сергеевна',
    specialties: ['Ортодонт'],
    photo: doctorPhoto2,
    metro: 'Парк Культуры'
  },
  {
    id: 3,
    name: 'Сидоров Сергей Петрович',
    specialties: ['Хирург', 'Имплантолог'],
    photo: doctorPhoto3,
    metro: 'Кропоткинская'
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
    photo: doctorPhoto2,
    metro: 'Парк Культуры'
  },
  {
    id: 6,
    name: 'Мария Семенова',
    specialties: ['Терапевт'],
    photo: doctorPhoto3,
    metro: 'Кропоткинская'
  },
  {
    id: 7,
    name: 'Иван Козлов',
    specialties: ['Стоматолог детский', 'Ортодонт'],
    photo: doctorPhoto1,
    metro: 'Арбатская'
  },
  {
    id: 8,
    name: 'Елена Смирнова',
    specialties: ['Пародонтолог'],
    photo: doctorPhoto4,
    metro: 'Смоленская'
  },
];

export const servicesMock: IService[] = [
  {
    id: 1,
    title: 'ЛЕЧЕНИЕ ЗУБОВ',
    slug: 'lechenie-zubov',
    description: 'Любому из нас хочется иметь здоровые крепкие зубы и сияющую улыбку. К сожалению, так получается далеко не всегда. Плохая экология, некачественные продукты питания и множество других факторов способствуют тому, что со временем наши зубы начинают постепенно утрачивать свою природную красоту и разрушаться.',
    image: serviceImage1,
  },
  {
    id: 2,
    title: 'ПРОТЕЗИРОВАНИЕ',
    slug: 'protezirovanie',
    description: 'Если сравнительно недавно даже незначительно поврежденные зубы удалялись и устанавливались протезы, то сегодня работа стоматолога направлена на максимально возможное восстановление зубов с дефектами. Даже если ткани зуба сильно разрушены, мастерство наших стоматологов и современные материалы позволят провести полноценное протезирование и создать имплант.',
    image: serviceImage2,
  },
  {
    id: 3,
    title: 'ОТБЕЛИВАНИЕ',
    slug: 'otbelivanie',
    description: 'Процедура отбеливания зубов состоит из нескольких этапов. Для начала перед отбеливанием необходимо улучшить состояние ротовой полости и провести гигиеническую чистку. Только после профессиональной процедуры чистки можно приступать к отбеливанию.',
    image: serviceImage3,
  },
  {
    id: 4,
    title: 'ВОССТАНОВЛЕНИЕ',
    slug: 'vosstanovlenie',
    description: 'Времена обычных пломб, которые были легко заметны невооруженным глазом, давно прошли. На смену привычному пломбированию пришла реставрация зубов. Стоматолог, как настоящий художник-реставратор, восстанавливает утраченную зубную поверхность.',
    image: serviceImage4,
  },
  {
    id: 5,
    title: 'ХИРУРГИЯ',
    slug: 'hirurgiya',
    description: 'Сегодня существует немалое количество малоинвазивных методик, которые позволяют ускорить процесс заживления в период реабилитации к минимуму. Поэтому пациентам нужно бояться не самого вмешательства, а последствий не лечения.',
    image: serviceImage5,
  },
  {
    id: 6,
    title: 'ОРТОДОНТИЯ',
    slug: 'ortodontiya',
    description: 'Ортодонтия – это раздел стоматологии, направленный на диагностику, профилактику, лечение аномалий развития зубного ряда и построение улыбки. Опытные врачи-ортодонты – это конструкторы вашего прикуса, они способны привести положение челюсти в идеальное состояние.',
    image: serviceImage6,
  },
];

export const mockPricingItems: IPricingItem[] = [
  { id: 1, title: 'Консультация стоматолога', price: 1500, slug: 'consultation' },
  { id: 2, title: 'Лечение кариеса', price: 3400, slug: 'caries-treatment' },
  { id: 3, title: 'Пломбирование зубов', price: 5000, slug: 'filling' },
  { id: 4, title: 'Лечение пульпита', price: 5200, slug: 'pulpitis-treatment' },
];

export const allSpecialtiesMock: string[] = Array.from(new Set(allDoctorsMock.flatMap(doc => doc.specialties)));
export const metroStationsMock: string[] = Array.from(new Set(allDoctorsMock.map(doc => doc.metro).filter(Boolean) as string[]));