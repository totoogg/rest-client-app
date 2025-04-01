import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  getIdToken,
  auth,
} from '@/shared/lib/firebase';

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    if (token) {
      localStorage.setItem('authToken', token);
    }

    return token;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    if (token) {
      localStorage.setItem('authToken', token);
    }

    return token;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);
    localStorage.removeItem('authToken');
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAuthToken = () => {
  return localStorage.getItem('authToken');
};
