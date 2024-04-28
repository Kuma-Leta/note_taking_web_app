import firebase from "firebase/compat/app";
import { initializeApp } from "firebase/app";
import "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCv9Ns_BNuk0YMIqxYgwEZyjZ1eG0C0fc8",
  authDomain: "note-taking-web-app-b65f0.firebaseapp.com",
  projectId: "note-taking-web-app-b65f0",
  storageBucket: "note-taking-web-app-b65f0.appspot.com",
  messagingSenderId: "848847705054",
  appId: "1:848847705054:web:5611909e8cd6b4378f434f",
  measurementId: "G-GR56Z8SDXV",
};
export const firebaseConfiguration = () => {
  if (!firebase.apps.length) {
    initializeApp(firebaseConfig);
  }
};
