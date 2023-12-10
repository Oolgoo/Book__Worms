// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: "hureechain.firebaseapp.com",
  databaseURL: process.env.REACT_URI_DATABASE,
  projectId: "hureechain",
  storageBucket: "hureechain.appspot.com",
  messagingSenderId: "938538313737",
  appId: process.env.REACT_APP_APP_ID,
  measurementId: "G-4XVTQV1MB4",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export const auth = getAuth();
export default storage;
