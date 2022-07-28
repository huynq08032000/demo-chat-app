// Import the functions you need from the SDKs you need
import * as firebase from 'firebase/app';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNz5fOSFViyjO4LAy0opn0ZmMaftI3nOg",
  authDomain: "chat-app-demo-ec690.firebaseapp.com",
  projectId: "chat-app-demo-ec690",
  storageBucket: "chat-app-demo-ec690.appspot.com",
  messagingSenderId: "43374109799",
  appId: "1:43374109799:web:a6199f092ec664d03520c2",
  measurementId: "G-7BHZPS9Q7S"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const db = getFirestore(app)


export {auth, db};
