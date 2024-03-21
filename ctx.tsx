import React from 'react';
import { useStorageState } from './useStorageState';
import { User } from 'firebase/auth';
import { signIn, signUp, signOutUser } from './firebaseAuth';

interface AuthContextProps {
    user: User | null,
    signIn: (email: string, password: string) => Promise<User | null>;
    signUp: (email: string, password: string) => Promise<User | null>;
    signOut: () => Promise<void>;
    session?: string | null;
    isLoading: boolean;
}

const AuthFx = {
    user: null,
    signIn: (email: string, password: string) => {
        return AuthFx.user = signIn(email, password);
    },
    signUp: signUp,
    signOut: signOutUser,
    session: null,
    isLoading: false,
}
const AuthContext = React.createContext<AuthContextProps>(AuthFx);

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider(props: React.PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider value={AuthFx}
      >
      {props.children}
    </AuthContext.Provider>
  );
}
