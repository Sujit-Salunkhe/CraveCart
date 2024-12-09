// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoALjcZ-jZGYcCQkOLM0FmI6eQFACMkfQ",
  authDomain: "cravecart-f7963.firebaseapp.com",
  projectId: "cravecart-f7963",
  storageBucket: "cravecart-f7963.appspot.com",
  messagingSenderId: "1042200324610",
  appId: "1:1042200324610:web:6629905d89804414f9551b",
  measurementId: "G-G5TRW8XBQ3"
};

// Initialize Firebase
const app = getApps().length === 0  ? initializeApp(firebaseConfig): getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();

export {auth};