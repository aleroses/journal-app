// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getEnvironments } from "../helpers/getEnvironments";

const {
  VITE_APIKEY,
  VITE_AUTHDOMAIN,
  VITE_DATABASEURL,
  VITE_PROJECTID,
  VITE_STORAGEBUCKET,
  VITE_MESSAGINGSENDERID,
  VITE_APPID,
} = getEnvironments();
// console.log(env);

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyClS8Dtp-O686mpBJW6-4EwgwASeKqFLMw",
//   authDomain: "journalapp-72f2d.firebaseapp.com",
//   projectId: "journalapp-72f2d",
//   storageBucket: "journalapp-72f2d.firebasestorage.app",
//   messagingSenderId: "339972861287",
//   appId: "1:339972861287:web:4ac56da1de5f56a6bc53c2",
// };

// Testing

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCYxZgelzrA7JRP0rrRtMVMlslgJY9I8jA",
//   authDomain: "appcompras-518fb.firebaseapp.com",
//   databaseURL:
//     "https://appcompras-518fb-default-rtdb.firebaseio.com",
//   projectId: "appcompras-518fb",
//   storageBucket: "appcompras-518fb.firebasestorage.app",
//   messagingSenderId: "365427579609",
//   appId: "1:365427579609:web:49ef881499d7673fc67cc8",
// };

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: VITE_APIKEY,
  authDomain: VITE_AUTHDOMAIN,
  databaseURL: VITE_DATABASEURL,
  projectId: VITE_PROJECTID,
  storageBucket: VITE_STORAGEBUCKET,
  messagingSenderId: VITE_MESSAGINGSENDERID,
  appId: VITE_APPID,
};

// console.log(firebaseConfig );

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
