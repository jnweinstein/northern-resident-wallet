import { createContext, useContext, useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import { collection } from 'firebase/firestore';
import { User, signInWithEmailAndPassword } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebaseAuth';
import { Redirect } from 'expo-router';

type AuthContextProps = {
    user: any;
    userProfile: any;
    loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  userProfile: null,
  loading: false,
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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (userChanged: any) => {
      console.log('auth state changed: user: ', userChanged)
      
      setLoading(true);
      if (user) { // if signed in now
        setUser(userChanged)
        Redirect({href: "(app)/(tabs)"})
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
    // return () => {
    //   // unsubscribe from auth state changes
    //   unsubscribe();
    // }
  }, []);

  return (
    <AuthContext.Provider value={{user, userProfile, loading}}
      >
      {props.children}
    </AuthContext.Provider>
  );
}
