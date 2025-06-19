import {describe, it, expect, vi} from 'vitest';
import {sendFormRequest} from '../../src/api/formApi';

describe('formApi', () => {
  it('успешно отправляет корректные данные', async () => {
    const formData = {name: 'Тест', phone: '1234567890'};
    vi.spyOn(Math, 'random').mockReturnValue(0.5); // Гарантируем успех

    const response = await sendFormRequest(formData, 'TestForm');
    expect(response.success).toBe(true);
    expect(response.message).toContain('успешно отправлена');
  });

  it('отклоняет промис с ошибкой валидации для "черного списка"', async () => {
    const formData = {name: 'Тест', phone: '000'};
    await expect(sendFormRequest(formData, 'TestForm')).rejects.toEqual([
      {
        field: 'phone',
        message: 'Этот номер телефона находится в черном списке.'
      },
    ]);
  });

  it('отклоняет промис с общей ошибкой', async () => {
    const formData = {name: 'Тест', phone: '1234567890'};
    vi.spyOn(Math, 'random').mockReturnValue(0.05); // Гарантируем ошибку

    await expect(sendFormRequest(formData, 'TestForm')).rejects.toThrow('Сетевая ошибка');
  });
});