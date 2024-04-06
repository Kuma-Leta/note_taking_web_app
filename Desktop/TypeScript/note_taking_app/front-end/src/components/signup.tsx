import "../styles/signUp.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp: React.FC = () => {
  interface signUp {
    username: string;
    password: string;
  }
  // let result:object={}
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [result, setResult] = useState<any>(null);
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
  async function SignUpSubmitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }
    try {
      const signUpInfo: signUp = { username, password };
      const response = await axios.post(
        ` http://localhost:5000/signup`,
        signUpInfo
      );
      console.log(response);
      setResult(response.data);
    } catch (error: any) {
      setResult(error.response.data);
    }
  }

  return (
    <div className="signUp">
      <div className="signUpForm">
        <form onSubmit={SignUpSubmitHandler} className="form">
          <h2>SIGNUP</h2>
          <div>
            <input
              name="username"
              placeholder="create username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
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
