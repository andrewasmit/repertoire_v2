// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../hooks/userSignOut";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { signOut } from "../redux/userSlice";

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'


function Home() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector(state=>state.user);

  const handleSignInClick = useCallback(()=>{
    navigate('/signin');
  }, []);

  const handleSignOutClick = useCallback(()=>{
    userSignOut();
    dispatch(signOut());
    navigate('/signin');
  }, [])

  return (
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <h1>Repertoire</h1>
      <h4>This is the Home Page</h4>

      {currentUser !== null && 
        <button onClick={handleSignInClick}>Sign in to your account</button>
      }

      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
}

export default Home;
