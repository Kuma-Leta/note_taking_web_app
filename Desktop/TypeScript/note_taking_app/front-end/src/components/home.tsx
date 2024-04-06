// import Login from "./Login";
import { Link } from "react-router-dom";
import "../styles/home.css";
const Home: React.FC = () => {
  return (
    <>
      <h1> home page</h1>
      <Link to="/signup">signup</Link>
      <Link to="/login">login </Link>
    </>
  );
};
export default Home;
