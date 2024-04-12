// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "docudog.firebaseapp.com",
  projectId: "docudog",
  storageBucket: "docudog.appspot.com",
  messagingSenderId: "534399607747",
  appId: "1:534399607747:web:7c5a7af1e6b37a95a99376",
  measurementId: "G-50P74P2CNV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;