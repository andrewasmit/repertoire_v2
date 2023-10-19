//External Dependencies
import { 
  Routes, 
  Route, 
  useParams
} from "react-router-dom";
import { useMemo } from "react";

// Internal Dependencies
import { useAppSelector } from "../../redux/hooks";
import Dashboard from "../../pages/Dashboard";
import Ensembles from "../../pages/Ensembles";
import EnsembleShow from "../../pages/Ensembles/Show";
import NewEnsembleForm from "../../pages/Ensembles/Add/NewEnsembleForm";
import Concerts from "../../pages/Concerts";
import NewConcertForm from "../../pages/Concerts/Add/NewConcertForm";
import ConcertShow from "../../pages/Concerts/Show";
import Library from "../../pages/Library";
import LibraryShow from "../../pages/Library/Show/LibraryShow";

//Local Dependencies
import './MainContainer.css'


// Component Definition
function MainContainer() {

  const params = useParams();
  const { ensembles, concertPrograms, library } = useAppSelector(state=>state.organization);

  const ensemble = useMemo(()=>{
    if(params.id !== undefined){
      return ensembles?.filter(ens=>ens.id === parseInt(params.id))[0];
    }
  },[params, ensembles]);

  const concert = useMemo(()=>{
    if(params.id !== undefined){
      return concertPrograms?.filter(concert=>concert.concert_id === parseInt(params.id))[0];
    }
  }, [params, concertPrograms])

  const piece = useMemo(()=>{
    if(params.id !== undefined){
      return library?.filter(piece=>piece.id === parseInt(params.id))[0];
    }
  }, [params, library])

  return (
    <div className="main-container">
      <Routes>
        <Route path='home' element={<Dashboard />} />
        <Route path='ensembles' element={<Ensembles />} />
        <Route path='ensembles/:id' element={<EnsembleShow id={ensemble?.id} name={ensemble?.name} grade_level={ensemble?.grade_level} />} />
        <Route path='ensembles/new' element={<NewEnsembleForm />} />
        <Route path='concerts' element={<Concerts />} />
        <Route path='concerts/new' element={<NewConcertForm />} />
        <Route path='concerts/:id' element={<ConcertShow id={concert?.concert_id} name={concert?.name} year={concert?.year} program={concert?.program} />} />
        <Route path='library' element={<Library />} />
        <Route path='library/:id' element={<LibraryShow />} />
      </Routes>

    </div>
  )
}

export default MainContainer