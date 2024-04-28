import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "../styles/login.css";
import { IoLogoGoogle } from "react-icons/io";

// import { createContext,useContext } from "react";
// import { GlobalStateContect } from "../GlobalStateContext";
interface childProps {
  updateFunction: (value: boolean) => void;
}
const Login: React.FC<childProps> = ({ updateFunction }) => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContect);

  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
  // const [isLoggedIn,setIsLoggedIn]=useState<boolean>(false)
  // interface Login {
  //   username: string;
  //   password: string;
  // }
  function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setUsername(event.target.value);
  }
  function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
    setPassword(event.target.value);
  }
  function handleConfirmPasswordChange(
    event: React.ChangeEvent<HTMLInputElement>
  ) {
    setConfirmPassword(event.target.value);
  }
  async function formSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      // const loginInfo:Login={username,password}
      if (password !== confirmPassword) {
        alert("the password didn't match each other");
        return;
      }
      setConfirmed(true);
      const resultV = await axios.get(`http://localhost:5001/login`, {
        params: {
          username: username,
          password: password,
        },
      });
      console.log(resultV);
      setResult(resultV.data);
      updateFunction(true);
    } catch (error: any) {
      // setIsLoggedIn(true);
      if (error.code === "ERR_NETWORK") {
        setResult({ message: "something went wrong" });
        return;
      }
      console.log(error);
      setResult(error.response.data);
    }
  }

  return (
    <div className="login">
      <div className="loginForm">
        <form onSubmit={formSubmitHandler} className="form">
          <h2>LOGIN</h2>
          <div>
            <input
              placeholder="enter email"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              required
            />
          </div>
          <div>
            <input
              placeholder="enter password"
              type="password"
              onChange={handlePasswordChange}
              value={password}
              required
            />
          </div>
          <div>
            <input
              placeholder="confirm your password"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </div>
          <div>
            <button type="submit" className="loginbtn">
              login
            </button>
          </div>
          <p>
            don't have an account ? <Link to="/signup">signup</Link>
          </p>
          {result && confirmed && (
            <p>
              {username} you have
              {result.message}
            </p>
          )}
          <hr />
          <span>or</span>
          <div className="sign-in-with-google">
            <button>
              <IoLogoGoogle size={28} className="google-logo" />
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
