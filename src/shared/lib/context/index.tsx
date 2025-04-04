'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactElement,
} from 'react';
import { auth, onAuthStateChanged } from '@/shared/lib/firebase';

const UserContext = createContext<string | null>(null);

export const useUser = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: { children: ReactElement }) => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        firebaseUser.getIdToken().then(() => {
          setUser(firebaseUser.displayName || firebaseUser.email);
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
