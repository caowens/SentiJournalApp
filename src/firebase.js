// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAPiIA4GKM9FJo7-xPsQ9n5qhs2LK-b5j0",
  authDomain: "sentijournal-fb-app.firebaseapp.com",
  projectId: "sentijournal-fb-app",
  storageBucket: "sentijournal-fb-app.appspot.com",
  messagingSenderId: "215231695245",
  appId: "1:215231695245:web:a373e214749eacf9e055c4",
  measurementId: "G-SS83V9MHPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db }