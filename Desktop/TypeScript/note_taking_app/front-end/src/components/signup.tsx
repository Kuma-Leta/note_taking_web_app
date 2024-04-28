import "../styles/signUp.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { firebaseConfiguration } from "./firebaseConfig";
// import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
const SignUp: React.FC = () => {
  useEffect(() => {
    firebaseConfiguration();
  }, []);
  // interface signUp {
  //   email: string;
  //   password: string;
  // }
  // let result:object={}

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }
  const signupWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    console.log(email, password);
    const firebaseResponse = firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    console.log(firebaseResponse);
    return firebaseResponse;
  };
  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const userCredential = await signupWithEmailAndPassword(email, password);
      console.log(userCredential);
      setResult(userCredential.user);
    } catch (error: any) {
      setResult(error.message);
    }
  }

  return (
    <div className="signUp">
      <div className="signUpForm">
        <form onSubmit={SignUpSubmitHandler} className="form">
          <h2>SIGNUP</h2>
          <div>
            <input
              name="email"
              placeholder="enter your email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="create password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              placeholder="confirm your password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
          </div>
          <div>
            <button type="submit" className="signupbtn">
              Signup
            </button>
          </div>
          <p>
            already have an account ? <Link to="/login">login</Link>
          </p>
        </form>

        {result && (
          <p className="signUpResponse">{JSON.stringify(result.message)}</p>
        )}

        {/* <p className="signUpResponse"></p> */}
      </div>
    </div>
  );
};
export default SignUp;
