declare module '../../utils/Firebase'

import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

    apiKey: "AIzaSyAEkUqTvCgBv9h8HBl2GB06N6kzmUuEqEo",
  
    authDomain: "estatehub-e90b8.firebaseapp.com",
  
    projectId: "estatehub-e90b8",
  
    storageBucket: "estatehub-e90b8.firebasestorage.app",
  
    messagingSenderId: "581464939758",
  
    appId: "1:581464939758:web:4b7597d76eb5497597e7ff",
  
    measurementId: "G-FMBCL56XRT"
  
  };
  
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(); 