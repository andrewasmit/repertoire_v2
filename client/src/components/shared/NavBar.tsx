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

  return (
    <div className="navbar">
      <h2>This is the NAVBAR</h2>
      <button className="logout-btn" onClick={handleSignOutClick}>Sign Out</button>
    </div>
  )
}

export default NavBar;