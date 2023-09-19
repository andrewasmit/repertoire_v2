//External Dependencies
import { 
  Routes, 
  Route, 
  // useNavigate, 
} from "react-router-dom";

//Local Dependencies
import Dashboard from "../../pages/Dashboard";
import Ensembles from "../../pages/Ensembles";
import './MainContainer.css'

function MainContainer() {

  // const navigate = useNavigate();

  return (
    <div className="main-container">
      <Routes>
        <Route path='home' element={<Dashboard />} />
        <Route path='ensembles' element={<Ensembles />} />
      </Routes>
    </div>
  )
}

export default MainContainer