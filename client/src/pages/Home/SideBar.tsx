// External Depencies
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import '../../pages/Home/home.css'

function SideBar() {

  const navigate = useNavigate();

  const handleNavToEnsembles = useCallback(()=>{
    navigate('ensembles')
  }, []);

  const handleNavToHome = useCallback(()=>{
    navigate('home')
  }, []);

  return (
    <div className="side-navbar">
      <h2>This is the SIDEBAR</h2>
      
      <button onClick={handleNavToHome} className="nav-btn">Home</button>

      <button onClick={handleNavToEnsembles} className="nav-btn">Ensembles</button>
    </div>
  )
}

export default SideBar;