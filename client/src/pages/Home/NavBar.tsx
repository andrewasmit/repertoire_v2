// External Depencies
import { useCallback, 
  // useEffect 
} from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { userSignOut } from "../../hooks/userSignOut";
import { useAppDispatch,
  //  useAppSelector 
  } from "../../redux/hooks";
import { signOut } from "../../redux/userSlice";
import '../../pages/Home/home.css'


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
      <h2>This is the NAVBAR</h2>
      <ul>
        <li>
          <button >Home</button>
        </li>
        <li>
          <button onClick={handleNavToDash} >Dashboard</button>
        </li>
        <li>
          <button  >About Us</button>
        </li>
      </ul>
      <button className="logout-btn" onClick={handleSignOutClick}>Sign Out</button>
    </div>
  )
}

export default NavBar;