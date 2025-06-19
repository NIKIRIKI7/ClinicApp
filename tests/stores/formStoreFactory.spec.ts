import {describe, it, expect, vi, beforeEach} from 'vitest';
import {
  createFormStore,
  FORM_STATUS
} from '../../src/stores/factories/createFormStore';
import * as api from '../../src/api/formApi';
import {useNotifier} from '../../src/composables/useNotifier';

// Мокаем API и Notifier
vi.mock('@/api/formApi');
vi.mock('@/composables/useNotifier'); // ИСПРАВЛЕНИЕ: Мокируем сам composable

const mockedApi = vi.mocked(api);
const mockedNotifier = vi.mocked(useNotifier);

// Тестируем фабрику на примере useCallbackStore
describe('createFormStore Factory', () => {
  const useTestFormStore = createFormStore('testForm', {formType: 'Test'});

  // ИСПРАВЛЕНИЕ: Создаем шпионов, которые будут возвращаться моком
  const showSuccess = vi.fn();
  const showError = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    // Настраиваем мок, чтобы он возвращал наших шпионов
    mockedNotifier.mockReturnValue({
      showSuccess,
      showError,
    });
  });


  it('успешно отправляет форму', async () => {
    const store = useTestFormStore();
    store.name = 'John Doe';
    store.phone = '12345';

    const successResponse = {success: true, message: 'Success!'};
    mockedApi.sendFormRequest.mockResolvedValue(successResponse);

    await store.submitForm();

    expect(mockedApi.sendFormRequest).toHaveBeenCalledWith({
      name: 'John Doe',
      phone: '12345'
    }, 'Test');
    expect(store.status).toBe(FORM_STATUS.SUCCESS);
    expect(showSuccess).toHaveBeenCalledWith('Success!'); // Проверяем вызов шпиона
    expect(store.liveAnnouncerText).toBe('Success!');
  });

  it('обрабатывает общую ошибку сервера', async () => {
    const store = useTestFormStore();
    const error = new Error('Server Down');
    mockedApi.sendFormRequest.mockRejectedValue(error);

    await store.submitForm();

    expect(store.status).toBe(FORM_STATUS.ERROR);
    expect(showError).toHaveBeenCalledWith('Server Down'); // Проверяем вызов шпиона
    expect(store.liveAnnouncerText).toContain('Server Down');
    expect(store.fieldErrors).toEqual({});
  });

  it('обрабатывает ошибку валидации полей', async () => {
    const store = useTestFormStore();
    const fieldErrors: api.IApiFieldError[] = [{
      field: 'phone',
      message: 'Invalid phone'
    }];
    mockedApi.sendFormRequest.mockRejectedValue(fieldErrors);

    await store.submitForm();

    expect(store.status).toBe(FORM_STATUS.ERROR);
    expect(showError).not.toHaveBeenCalled(); // Проверяем, что шпион не был вызван
    expect(store.fieldErrors.phone).toBe('Invalid phone');
    expect(store.liveAnnouncerText).toContain('Invalid phone');
  });

  it('не отправляет форму, если уже идет загрузка', async () => {
    const store = useTestFormStore();
    store.status = FORM_STATUS.LOADING;

    await store.submitForm();

    expect(mockedApi.sendFormRequest).not.toHaveBeenCalled();
  });
});