import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAZtDlgQKdm3zXY0ZYMNMt7lvETLgN4omg",
  authDomain: "career-pilot-ef052.firebaseapp.com",
  projectId: "career-pilot-ef052",
  storageBucket: "career-pilot-ef052.firebasestorage.app",
  messagingSenderId: "1003367814735",
  appId: "1:1003367814735:web:327b4f0cdbee4e09267c3a",
  measurementId: "G-FJ509NMSGG"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);