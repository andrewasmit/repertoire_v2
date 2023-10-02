//External Dependencies
import { 
  Routes, 
  Route, 
  useParams
} from "react-router-dom";
import { useMemo } from "react";

// Internal Dependencies
import { useAppSelector } from "../../redux/hooks";

//Local Dependencies
import Dashboard from "../../pages/Dashboard";
import Ensembles from "../../pages/Ensembles";
import EnsembleShow from "../../pages/Ensembles/Show";
import NewEnsembleForm from "../../pages/Ensembles/Add/NewEnsembleForm";
import './MainContainer.css'
import Concerts from "../../pages/Concerts";

// Component Definition
function MainContainer() {

  const params = useParams();
  const { ensembles } = useAppSelector(state=>state.organization);

  const ensemble = useMemo(()=>{
    if(params.id !== undefined){
      return ensembles?.filter(ens=>ens.id === parseInt(params.id))[0];
    }
  },[params, ensembles]);

  return (
    <div className="main-container">
      <Routes>
        <Route path='home' element={<Dashboard />} />
        <Route path='ensembles' element={<Ensembles />} />
        <Route path='ensembles/:id' element={<EnsembleShow id={ensemble?.id} name={ensemble?.name} grade_level={ensemble?.grade_level} />} />
        <Route path='ensembles/new' element={<NewEnsembleForm />} />
        <Route path='concerts' element={<Concerts />} />
      </Routes>
    </div>
  )
}

export default MainContainer