import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from './firebase';

export const register = async (
  name: string,
  email: string,
  password: string
): Promise<{ success?: boolean; error?: string }> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    
    // Update user profile with display name
    await updateProfile(userCredential.user, {
      displayName: name
    });
    
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'Произошла ошибка при регистрации';
    
    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'Пользователь с таким email уже существует';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Некорректный формат email';
        break;
      case 'auth/weak-password':
        errorMessage = 'Пароль должен содержать минимум 6 символов';
        break;
      case 'auth/operation-not-allowed':
        errorMessage = 'Регистрация временно недоступна';
        break;
    }
    
    return { error: errorMessage };
  }
};
