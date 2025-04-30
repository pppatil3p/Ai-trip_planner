// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD02Oi_4UPD1ht5li-Gk_DQ6pBRcSS87KQ",
  authDomain: "ai-trip-82820.firebaseapp.com",
  projectId: "ai-trip-82820",
  storageBucket: "ai-trip-82820.appspot.com",
  messagingSenderId: "668341398200",
  appId: "1:668341398200:web:9310bb2b853b419d2ca24d",
  measurementId: "G-GJXPW03SPS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };