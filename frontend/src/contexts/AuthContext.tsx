import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp, fetchUserAttributes } from 'aws-amplify/auth';

interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  displayName: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  confirmSignUpCode: (email: string, code: string) => Promise<void>;
  needsConfirmation: boolean;
  setNeedsConfirmation: (value: boolean) => void;
  tempEmail: string;
  setTempEmail: (email: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);
  const [tempEmail, setTempEmail] = useState('');

  useEffect(() => {
    checkAuthState();
  }, []);

  async function checkAuthState() {
    try {
      const user = await getCurrentUser();
      setIsAuthenticated(true);
      setUsername(user.username);
      
      // Get user attributes including name
      try {
        const attributes = await fetchUserAttributes();
        setDisplayName(attributes.name || user.username.split('@')[0]);
      } catch (error) {
        console.error('Error getting user attributes:', error);
        setDisplayName(user.username.split('@')[0]);
      }
    } catch {
      setIsAuthenticated(false);
      setUsername(null);
      setDisplayName(null);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        displayName,
        needsConfirmation,
        setNeedsConfirmation,
        tempEmail,
        setTempEmail,
        signIn: async (email, password) => {
          try {
            const { isSignedIn } = await signIn({ username: email, password });
            if (isSignedIn) {
              await checkAuthState();
            }
          } catch (error: any) {
            if (error.message === 'User is not confirmed.') {
              setNeedsConfirmation(true);
              setTempEmail(email);
              throw new Error('Please verify your email address');
            }
            throw error;
          }
        },
        signOut: async () => {
          await signOut();
          setIsAuthenticated(false);
          setUsername(null);
          setDisplayName(null);
        },
        signUp: async (email, password, name) => {
          await signUp({
            username: email,
            password,
            options: {
              userAttributes: {
                email,
                name,
                preferred_username: name
              },
            },
          });
          
          setNeedsConfirmation(true);
          setTempEmail(email);
          setDisplayName(name);
        },
        confirmSignUpCode: async (email, code) => {
          await confirmSignUp({
            username: email,
            confirmationCode: code
          });
          setNeedsConfirmation(false);
        }
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
} 