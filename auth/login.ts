import { 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  browserSessionPersistence 
} from 'firebase/auth';
import { auth } from './firebase';

export const login = async (
  email: string, 
  password: string, 
  rememberMe: boolean = false
): Promise<{ success?: boolean; error?: string }> => {
  try {
    // Set persistence based on rememberMe
    const persistence = rememberMe ? browserLocalPersistence : browserSessionPersistence;
    
    await signInWithEmailAndPassword(auth, email, password);
    
    return { success: true };
  } catch (error: any) {
    let errorMessage = 'Произошла ошибка при входе';
    
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'Пользователь с таким email не найден';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Неверный пароль';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Некорректный формат email';
        break;
      case 'auth/user-disabled':
        errorMessage = 'Этот аккаунт был заблокирован';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Слишком много попыток входа. Попробуйте позже';
        break;
      case 'auth/invalid-credential':
        errorMessage = 'Неверный email или пароль';
        break;
    }
    
    return { error: errorMessage };
  }
};
