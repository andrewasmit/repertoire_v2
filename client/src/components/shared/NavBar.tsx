// External Depencies
import { useCallback, 
  // useEffect 
} from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../../hooks/userSignOut";
import { useAppDispatch } from "../../redux/hooks";
import { signOut } from "../../redux/userSlice";
import './navigation.css'
import logo from '/logo-no-background.svg'



function NavBar() {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSignOutClick = useCallback(():void=>{
    userSignOut();
    dispatch(signOut());
    navigate('/signin');
  }, [])

  const handleNavToDash = useCallback((): void=>{
    navigate('/home');
  }, []);

  return (
    <div className="navbar">
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <ul>
        <li>
          <button >Home</button>
        </li>
        <li>
          <button onClick={handleNavToDash} >Dashboard</button>
        </li>
        <li>
          <button  >Find New Music</button>
        </li>
        <li>
          <button  >My Account</button>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleSignOutClick}>Sign Out</button>
    </div>
  )
}

export default NavBar;