import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from './firebase';

export const resetPassword = async (
  email: string
): Promise<{ success?: boolean; error?: string }> => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'Произошла ошибка при сбросе пароля';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Пользователь с таким email не найден';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Некорректный формат email';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Слишком много попыток. Попробуйте позже';
        break;
    }
    
    return { error: errorMessage };
  }
};
