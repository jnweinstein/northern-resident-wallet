import { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseAuth';

type AuthContextProps = {
    user: any,
    userProfile: any,
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userProfile: null,
  loading: false
});

// This hook can be used to access the user info.
export function useAuth() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useAuth must be wrapped in an <AuthProvider />');
    }
  }

  return value;
}

export function AuthProvider(props: React.PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  onAuthStateChanged(auth, (userChanged: any) => {
    console.log('user', userChanged)
    
    setLoading(true);
    if (user) { // if signed in now
      setUser(userChanged)
      // const usersRef = collection(db, 'users')
      // const query = usersRef.where('user_id', '==', /* insert uuid */);
      // query.get().then((querySnapshot: any) => {
      //     if (!querySnapshot.empty) {
      //         const doc = querySnapshot.docs[0];
      //         console.log('Document data:', doc.data());
      //     } else {
      //         console.log('No matching documents found');
      //     }
      // })
      // .catch((error: any) => {
      //     console.error('Error getting document:', error);
      // });
    } else { // user is signed out
      setUser(null);
      setUserProfile(null);
      console.log("logged user out")
    }
    setLoading(false);
  })

  return (
    <AuthContext.Provider value={{user, userProfile, loading}}
      >
      {props.children}
    </AuthContext.Provider>
  );
}
