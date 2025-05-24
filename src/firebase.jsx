import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDwPIY0_76psssvoHulHa-5zFPmayZcYX8",
  authDomain: "todo-app-90.firebaseapp.com",
  projectId: "todo-app-90",
  storageBucket: "todo-app-90.firebasestorage.app",
  messagingSenderId: "68275519195",
  appId: "1:68275519195:web:19e119c5a61217c9df56fe",
  measurementId: "G-829PT5KVL4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);