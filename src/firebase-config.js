import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDGZohkC3f51OwvaxNeLYwksi4MmnxWxQQ",
  authDomain: "codethat-5d741.firebaseapp.com",
  projectId: "codethat-5d741",
  storageBucket: "codethat-5d741.appspot.com",
  messagingSenderId: "737899326763",
  appId: "1:737899326763:web:0f359b7f699b98f5b1296e",
  measurementId: "G-MLT7RDLG2N",
  databaseURL: "https://codethat-5d741-default-rtdb.firebaseio.com"
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);    //Authentication
const firebaseDB = getDatabase(firebaseApp); //Firestore Database

export { firebaseAuth, firebaseDB };