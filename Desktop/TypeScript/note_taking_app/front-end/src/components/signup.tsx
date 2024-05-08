import "../styles/signUp.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signupWithEmailAndPassword } from "./firebaseConfig";
// import axios from "axios";
// import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const SignUp: React.FC = () => {
  // useEffect(() => {
  //   analytics();
  // }, []);
  // interface signUp {
  //   email: string;
  //   password: string;
  // }
  // let result:object={}

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState<any>(null);
  const [signUpSuccess, setSignupSuccess] = useState(false);
  const navigate = useNavigate();
  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const userCredential = await signupWithEmailAndPassword(email, password);
      // console.log(userCredential.user);
      if (userCredential) {
        setSignupSuccess(true);
      }
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Email is already in use.Try another instead");
      }
      setSignupSuccess(false);
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
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="password"
              placeholder="create password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <input
              name="confirmPassword"
              placeholder="confirm your password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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

        {signUpSuccess && (
          <p className="signUpResponse">
            Congratulations ! you have successfully created account
          </p>
        )}
        {error && <p className="signupError">{error}</p>}

        {/* <p className="signUpResponse"></p> */}
      </div>
    </div>
  );
};
export default SignUp;
