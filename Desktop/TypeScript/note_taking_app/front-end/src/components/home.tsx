// import Login from "./Login";
import { Link } from "react-router-dom";
import "../styles/home.css";
const Home: React.FC = () => {
  return (
    <>
      <div className="home_container">
        <div className="home_left">
          <h3> SIMPLIFY YOUR NOTE TAKING </h3>
          <h1>BOOST YOUR PRODUCTIVITY WITH OUR NOTE TAKING WEB APP</h1>
          <h2>START ORGANIZING YOUR NOTES TODAY</h2>
          <div className="links_container">
            <Link to="/signup">signup</Link>
            <Link to="/login">login </Link>
          </div>
        </div>
        <div className="noteImage">
          <img src="note_image.jpg" alt="no image" />
        </div>
      </div>
    </>
  );
};
export default Home;
