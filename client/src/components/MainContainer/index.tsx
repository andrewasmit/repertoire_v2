//External Dependencies
import { 
  Routes, 
  Route, 
  // useNavigate, 
} from "react-router-dom";

//Local Dependencies
import Dashboard from "../../pages/Dashboard";


function MainContainer() {

  // const navigate = useNavigate();

  return (
    <>
      <Routes>
        <Route path='/home' element={<Dashboard />} />
      </Routes>
      {/* <Dashboard /> */}
    </>
  )
}

export default MainContainer