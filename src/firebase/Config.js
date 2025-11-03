import firebase from "firebase";
import app from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyC3M9aF4yrevdC0aYoL64s9530k-SFNp-0",
    authDomain: "proyectoint-capilla-sarnicola.firebaseapp.com",
    projectId: "proyectoint-capilla-sarnicola",
    storageBucket: "proyectoint-capilla-sarnicola.firebasestorage.app",
    messagingSenderId: "1029523199045",
    appId: "1:1029523199045:web:aaaba56324dfa12b403f2c"
  };

firebase.initializeApp(firebaseConfig)

export const auth = firebase.auth();
export const db = app.firestore();