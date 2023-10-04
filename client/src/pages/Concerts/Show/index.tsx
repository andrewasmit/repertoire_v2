// External Dependencies
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Internal Dependencies
import { PerformedPiece, deleteConcert } from "../../../redux/organizationSlice";
import { destroyConcert } from "../../../hooks/api/concertHooks";
import { useAppDispatch } from "../../../redux/hooks";


type ConcertParams = {
  id: number | string;
  name: string;
  year: number;
  program: PerformedPiece[]
}

function ConcertShow({ id, name, year, program}: ConcertParams) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const performancesToDisplay = useMemo(()=>{ 
    return program.map(performance=>{
      return <div>
        <h4>{performance.piece}</h4>
        <h6>{performance.ensemble}</h6>
      </div>
    })
  }, [program]);

  const handleNavBackToConcerts: ()=>void = useCallback(():void=>{
    navigate('/concerts');
  }, []);

  const handleDeleteEnsemble: ()=> void = useCallback(():void =>{
    destroyConcert(id);
    dispatch(deleteConcert(id));
    navigate('/concerts');
  }, [])

  return (
    <div>
      <button onClick={handleNavBackToConcerts}>Back</button>
      <h2>{name}</h2>
      <h4>{year}</h4>
      {performancesToDisplay}
      <button>Edit Concert</button>
      <button onClick={handleDeleteEnsemble}>Delete Concert</button>
    </div>
  )
}

export default ConcertShow;