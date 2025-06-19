import {useToast} from 'vue-toastification';

/**
 * @composable useNotifier
 * @description Централизованное управление toast-уведомлениями.
 */
export function useNotifier() {
  const toast = useToast();

  /**
   * @function showSuccess
   * @description Показывает уведомление об успехе.
   * @param {string} message - Текст уведомления.
   */
  const showSuccess = (message: string) => {
    toast.success(message);
  };

  /**
   * @function showError
   * @description Показывает уведомление об ошибке.
   * @param {string} message - Текст уведомления.
   */
  const showError = (message: string) => {
    toast.error(message);
  };

  return {
    showSuccess,
    showError,
  };
}