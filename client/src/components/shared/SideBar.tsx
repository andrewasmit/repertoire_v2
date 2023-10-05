// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import './navigation.css'

function SideBar() {

  const navigate = useNavigate();

  const handleNavToEnsembles = useCallback(()=>{
    navigate('ensembles')
  }, []);

  const handleNavToHome = useCallback(()=>{
    navigate('home')
  }, []);

  const handleNavToConcerts = useCallback(()=>{
    navigate('concerts')
  }, []);

  const handleNavToLibrary = useCallback(()=>{
    navigate('library')
  }, []);

  return (
    <div className="side-navbar">
      
      <button onClick={handleNavToHome} className="nav-btn">Home</button>
      <button onClick={handleNavToEnsembles} className="nav-btn">Ensembles</button>
      <button onClick={handleNavToConcerts} className="nav-btn">Concerts</button>
      <button onClick={handleNavToLibrary} className="nav-btn">Library</button>
    </div>
  )
}

export default SideBar;