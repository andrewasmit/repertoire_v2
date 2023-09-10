// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'

function Home() {


  const navigate = useNavigate();
  const handleSignInClick = useCallback(()=>{
    navigate('/signin');
  }, []);

  return (
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <h1>Repertoire</h1>
      <h4>This is the Home Page</h4>
      <button onClick={handleSignInClick}>Sign in to your account</button>
    </div>
  );
}

export default Home;
