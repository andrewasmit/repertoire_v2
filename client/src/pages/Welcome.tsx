// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'

function Welcome() {

  const navigate = useNavigate();
  
  const handleNavigateToSignIn = useCallback(()=>{
      navigate('/signin');
    }, []);

  return (
    <div>
      <img src={logo} className="logo" alt="logo" />
      <h1>This is the General Landing Page</h1>
      <h2>You need to sign in to actually use the app</h2>
      <button onClick={handleNavigateToSignIn}>Sign in to my account</button>
    </div>
  )
}

export default Welcome