import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCoBg_DQasXwHpsU1IZMiIgzLJnv8DO64U",
  authDomain: "online-learning-platform-7bba5.firebaseapp.com",
  projectId: "online-learning-platform-7bba5",
  storageBucket: "online-learning-platform-7bba5.appspot.com",
  messagingSenderId: "1041491147993",
  appId: "1:1041491147993:web:91e9bdacde63b35d7bd2c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);