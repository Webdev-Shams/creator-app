// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDK9Ejd7eXFblRHSCLrFpGwbxVuHOAQNHU",
  authDomain: "smith-6c364.firebaseapp.com",
  projectId: "smith-6c364",
  storageBucket: "smith-6c364.appspot.com",
  messagingSenderId: "786591902941",
  appId: "1:786591902941:web:36703a3f5737bcce697f34"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth (app);

export default auth;