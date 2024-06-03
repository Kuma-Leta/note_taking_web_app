// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//step 1 :import the necessary modules
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//step2 :Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCv9Ns_BNuk0YMIqxYgwEZyjZ1eG0C0fc8",
  authDomain: "note-taking-web-app-b65f0.firebaseapp.com",
  projectId: "note-taking-web-app-b65f0",
  storageBucket: "note-taking-web-app-b65f0.appspot.com",
  messagingSenderId: "848847705054",
  appId: "1:848847705054:web:5611909e8cd6b4378f434f",
  measurementId: "G-GR56Z8SDXV",
};

// step 3 :Initialize Firebase
const app = initializeApp(firebaseConfig);
// step 4
export const auth = getAuth(app);
//sign up with email and password
export const signupWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  // console.log(userCredential);
  // console.log(userCredential.user);
  return userCredential;
  // } catch (error: any) {
  //   console.log(error.code);
  //   return error.code
};
//sign in with email and password using firebase
export const signInWithFirebase = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  return userCredential;
};
