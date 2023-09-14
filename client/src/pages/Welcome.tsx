// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
// import { userSignOut } from "../hooks/userSignOut";
// import { useAppDispatch, useAppSelector } from "../redux/hooks";
// import { signOut } from "../redux/userSlice";

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
      <h1>This is the Welcome Page</h1>
      <button onClick={handleNavigateToSignIn}>Sign in to my account</button>
    </div>
  )
}

export default Welcome