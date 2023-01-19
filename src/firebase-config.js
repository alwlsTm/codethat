// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGZohkC3f51OwvaxNeLYwksi4MmnxWxQQ",
  authDomain: "codethat-5d741.firebaseapp.com",
  projectId: "codethat-5d741",
  storageBucket: "codethat-5d741.appspot.com",
  messagingSenderId: "737899326763",
  appId: "1:737899326763:web:0f359b7f699b98f5b1296e",
  measurementId: "G-MLT7RDLG2N"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const firebaseAuth = getAuth(firebaseApp);