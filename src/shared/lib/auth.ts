import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  getIdToken,
  updateProfile,
} from '@/shared/lib/firebase';

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const token = await getIdToken(userCredential.user);

    if (token) {
      const res = await fetch('/api/auth/setToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        console.log('Token set in cookies');
      } else {
        console.error('Error setting token in cookies');
      }

      localStorage.setItem(
        'userRenderCrew',
        JSON.stringify({ user: email, token })
      );
    }

    return token;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signUp = async (
  email: string,
  password: string,
  displayName: string
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    await updateProfile(user, { displayName });

    const token = await getIdToken(userCredential.user);

    if (token) {
      const res = await fetch('/api/auth/setToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      if (res.ok) {
        console.log('Token set in cookies');
      } else {
        console.error('Error setting token in cookies');
      }
    }

    localStorage.setItem(
      'userRenderCrew',
      JSON.stringify({ user: email, token })
    );

    return token;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const signOut = async () => {
  try {
    await firebaseSignOut(auth);

    await fetch('/api/auth/deleteToken', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    localStorage.removeItem('userRenderCrew');
  } catch (error) {
    throw new Error((error as Error).message);
  }
};
