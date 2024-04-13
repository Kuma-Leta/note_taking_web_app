import { Link } from "react-router-dom";
import axios from "axios";
import React, { useState } from "react";
import "../styles/login.css";
// import { GlobalStateContect } from "../GlobalStateContext";
const Login: React.FC = () => {
  // const { isLoggedIn, setIsLoggedIn } = useContext(GlobalStateContect);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
  const [confirmed, setConfirmed] = useState<boolean>(false);
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
      const resultV = await axios.get(
        `http://localhost:5000/login/?${username}&&${password}`,
        {
          params: {
            username: username,
            password: password,
          },
        }
      );
      // console.log(resultV);
      setResult(resultV.data);
      // setIsLoggedIn(true);
    } catch (error: any) {
      // console.log(error);
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
              placeholder="enter username"
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
              {JSON.stringify(result.message)}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};
export default Login;
