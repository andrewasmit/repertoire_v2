//External Dependencies
import { 
  Routes, 
  Route, 
  // useNavigate, 
} from "react-router-dom";

//Local Dependencies
import Dashboard from "../../pages/Dashboard";
import Ensembles from "../../pages/Ensembles";


function MainContainer() {

  // const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='home' element={<Dashboard />} />
        <Route path='ensembles' element={<Ensembles />} />
      </Routes>
      {/* <Dashboard /> */}
    </>
  )
}

export default MainContainer