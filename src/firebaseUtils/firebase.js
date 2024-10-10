import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const ENV = process.env;
const firebaseConfig = {
  apiKey: ENV.REACT_APP_API_KEY,
  authDomain: 'auth-tfjs.firebaseapp.com',
  projectId: 'auth-tfjs',
  storageBucket: 'auth-tfjs.appspot.com',
  messagingSenderId: ENV.REACT_APP_SENDER_ID,
  appId: ENV.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
