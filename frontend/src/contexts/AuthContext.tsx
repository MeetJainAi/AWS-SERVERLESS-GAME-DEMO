import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCurrentUser, signIn, signOut, signUp } from '@aws-amplify/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(true);
      setUsername(user.username);
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        signIn: async (email, password) => {
          await signIn({ username: email, password });
          await checkAuthState();
        },
        signOut: async () => {
          await signOut();
          setIsAuthenticated(false);
          setUsername(null);
        },
        signUp: async (email, password) => {
          await signUp({
            username: email,
            password,
            options: {
              userAttributes: {
                email,
              },
            },
          });
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 