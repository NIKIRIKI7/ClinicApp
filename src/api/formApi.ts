export interface IFormData {
  name: string;
  phone: string;
}

export interface IApiFieldError {
  field: keyof IFormData; // 'name' | 'phone'
  message: string;
}

export interface IApiResponse {
  success: boolean;
  message: string;
}

export const sendFormRequest = (formData: IFormData, formType: string): Promise<IApiResponse> => {
  console.log(`API call: Отправка данных из формы "${formType}"...`, formData);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (formData.phone.includes('000')) {
        const fieldError: IApiFieldError[] = [{
          field: 'phone',
          message: 'Этот номер телефона находится в черном списке.',
        }];
        console.error(`API call: Ошибка валидации для формы "${formType}"!`, fieldError);
        return reject(fieldError);
      }

      if (formData.name && formData.phone && Math.random() > 0.1) {
        console.log(`API call: Успех для формы "${formType}"!`);
        resolve({
          success: true,
          message: 'Ваша заявка успешно отправлена! Мы скоро с вами свяжемся.',
        });
      } else {
        console.error(`API call: Общая ошибка для формы "${formType}"!`);
        reject(new Error('Сетевая ошибка. Не удалось отправить данные.'));
      }
    }, 1500);
  });
};