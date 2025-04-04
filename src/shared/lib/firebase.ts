import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut as firebaseSignOut,
  getIdToken,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCKbfIszE-RsCr1PlxK4Y6T69tebOtdiOg',
  authDomain: 'rendercrew-2cd3b.firebaseapp.com',
  projectId: 'rendercrew-2cd3b',
  storageBucket: 'rendercrew-2cd3b.firebasestorage.app',
  messagingSenderId: '642910563176',
  appId: '1:642910563176:web:9ec2875f236bf86b2244dd',
};

const clientApp = initializeApp(firebaseConfig);
const auth = getAuth(clientApp);

export {
  auth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  getIdToken,
  updateProfile,
};
