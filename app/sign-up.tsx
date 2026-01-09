import { useRouter } from 'expo-router';
import { useEffect } from 'react';

/**
 * This route redirects to the login page.
 * The login page now handles both login and sign-up in a single unified interface.
 */
export default function SignUpScreen() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to login page (which now includes sign-up)
    router.replace('/login' as any);
  }, [router]);

  return null;
}
