// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your AI-TRAINING-TASKS DB
 const firebaseConfig = {
  apiKey: "AIzaSyCi0HuAzjVsBxIq6EuKkmlGtnDxiUwouXE",
  authDomain: "quick-pay-c17ae.firebaseapp.com",
  projectId: "quick-pay-c17ae",
  storageBucket: "quick-pay-c17ae.firebasestorage.app",
  messagingSenderId: "148295193494",
  appId: "1:148295193494:web:dd085e964ef68fb18b43b7",
  measurementId: "G-F2S2DL8HYV"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);
export const storage = getStorage(app);