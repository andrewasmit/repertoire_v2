// External Depencies
import { useCallback } from "react";
import { useNavigate } from 'react-router-dom';

// Local Dependencies
import MyAccountBtn from "./MyAccountBtn";
import './navigation.css'
import logo from '/logo-no-background.svg'


function NavBar() {

  const navigate = useNavigate();

  const handleNavToDash = useCallback((): void=>{
    navigate('/home');
  }, []);

  const handleNavToEnsembles = useCallback((): void=>{
    navigate('/ensembles');
  }, []);

  const handleNavToConcerts = useCallback((): void=>{
    navigate('/concerts');
  }, []);

  const handleNavToLibrary = useCallback((): void=>{
    navigate('/library');
  }, []);

  const handleNavToBrowse = useCallback((): void=>{
    navigate('/browse');
  }, []);

  return (
    <div className="navbar">
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        <img src={logo} className="logo" alt="Main logo" />
      </a>
      <ul>
        <li>
          <button onClick={handleNavToDash} >Dashboard</button>
        </li>
        <li>
          <button onClick={handleNavToEnsembles} >Ensembles</button>
        </li>
        <li>
          <button onClick={handleNavToConcerts} >Concerts</button>
        </li>
        <li>
          <button onClick={handleNavToLibrary} >Library</button>
        </li>
        <li>
          <button onClick={handleNavToBrowse} >Find New Music</button>
        </li>
      </ul>
      <MyAccountBtn />
    </div>
  )
}

export default NavBar;