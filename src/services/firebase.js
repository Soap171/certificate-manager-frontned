// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCfPuKvZtGKjXcQ3rXJ8GQ4VO3Gy8ZFX2I",
  authDomain: "e-certificate-manager-66fc8.firebaseapp.com",
  projectId: "e-certificate-manager-66fc8",
  storageBucket: "e-certificate-manager-66fc8.appspot.com",
  messagingSenderId: "219534126547",
  appId: "1:219534126547:web:1e8c28249be342a6751326",
  measurementId: "G-P2D3YX6FBG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const imageDb = getStorage(app);
