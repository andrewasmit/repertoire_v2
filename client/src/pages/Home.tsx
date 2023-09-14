// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../hooks/userSignOut";
import { useAppDispatch } from "../redux/hooks";
import { signOut } from "../redux/userSlice";

// Local Depencies
import "../App.css";
import logo from '/logo-no-background.svg'


function Home() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOutClick = useCallback(()=>{
    userSignOut();
    dispatch(signOut());
    navigate('/signin');
  }, [])

  //Grab organization information

  return (
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <h1>Repertoire</h1>
      <h2>This is the Home Page</h2>
      <h3>This is where the dashboard will be with all of your information</h3>

      <button onClick={handleSignOutClick}>Sign Out</button>
    </div>
  );
}

export default Home;
