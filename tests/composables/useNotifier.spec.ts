import {describe, it, expect, vi} from 'vitest';
import {useNotifier} from '../../src/composables/useNotifier';
import {useToast} from 'vue-toastification';

const mockToast = useToast();

describe('useNotifier', () => {
  it('вызывает toast.success при вызове showSuccess', () => {
    const {showSuccess} = useNotifier();
    const message = 'Операция успешна';
    showSuccess(message);
    expect(mockToast.success).toHaveBeenCalledWith(message);
  });

  it('вызывает toast.error при вызове showError', () => {
    const {showError} = useNotifier();
    const message = 'Произошла ошибка';
    showError(message);
    expect(mockToast.error).toHaveBeenCalledWith(message);
  });
});