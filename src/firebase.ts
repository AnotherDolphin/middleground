import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBCtXVLPQQBj9pU-tjxZqCXkvRYwgng6jQ",
  authDomain: "middleground-1.firebaseapp.com",
  projectId: "middleground-1",
  storageBucket: "middleground-1.appspot.com",
  messagingSenderId: "327613050000",
  appId: "1:327613050000:web:da50e5f83caa02cb36bc15",
  measurementId: "G-QZ933VHZFQ"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export {db, doc, getDoc}