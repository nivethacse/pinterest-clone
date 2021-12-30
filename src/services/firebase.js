import firebase from "firebase";
require("firebase/auth");

const firebaseConfig = {
  apiKey: "AIzaSyDqzHjwT3cMyr2M1JitK0hWRBkvXq9WZfI",
  authDomain: "pinterest-5319f.firebaseapp.com",
  projectId: "pinterest-5319f",
  storageBucket: "pinterest-5319f.appspot.com",
  messagingSenderId: "55326443203",
  appId: "1:55326443203:web:87ae8d372ba6342460c476",
  measurementId: "G-VE0WWEQ108",
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
export { db };

export default auth;
