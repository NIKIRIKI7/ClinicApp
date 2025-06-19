import {afterEach, beforeEach, vi} from 'vitest';
import {setActivePinia, createPinia} from 'pinia';

// Мокаем библиотеку уведомлений, чтобы не рендерить ее в каждом тесте.
// Мы можем просто проверять, что ее методы были вызваны.
const mockToast = {
  success: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warning: vi.fn(),
};

vi.mock('vue-toastification', () => ({
  useToast: () => mockToast,
}));

// Создаем свежий экземпляр Pinia для каждого теста,
// чтобы избежать утечек состояния между тестами.
beforeEach(() => {
  setActivePinia(createPinia());
});

afterEach(() => {
  vi.clearAllMocks();
});