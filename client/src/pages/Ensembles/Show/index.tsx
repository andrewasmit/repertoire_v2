// External Depencies
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
// import EnsembleCard from "./components/EnsembleCard";
// import { useAppSelector } from "../../../redux/hooks";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";
import { deleteEns } from "../../../redux/organizationSlice";
import { deleteEnsemble } from "../../../hooks/api/ensembleHooks";
import { PerformedPiece } from "../../../redux/organizationSlice";
import { findEnsemblePerformances } from "../../../utils/findEnsemblePerformances";

// Local Depencies
import '../ensembles.css'



// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level, id
})=>{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { concertPrograms } = useAppSelector(state=> state.organization);

  const ensPerformances = useMemo(()=>{
    if (concertPrograms){
      return findEnsemblePerformances(id, concertPrograms);
    }
  }, [concertPrograms]);


  const handleBackClick: ()=> void  = useCallback(():void=>{
    navigate('/ensembles')
  }, [])

  const handleDeleteEns: ()=> void = useCallback((): void=>{
    navigate('/ensembles')
    deleteEnsemble(id);
    dispatch(deleteEns(id))
  }, [])

  
  const performancesToDisplay = ensPerformances?.map(performance=>{
    return <div>
      <h3>{performance.piece}</h3>
      <h4>The Concert Name</h4>
    </div>
  })


  return (
    <div className='ens-show'>
      <button className="back-btn" onClick={handleBackClick}>BACK</button>

      <h3>{name}</h3>
      <h4>{grade_level}th grade</h4>

      <button onClick={handleDeleteEns}>Delete Ensemble</button>


      {performancesToDisplay.length > 0 ? 
        <h2>Performances from {name}</h2> : 
        <h2>{name} has not yet performed</h2>
      }
      {performancesToDisplay}

    </div>
  )
}

export default EnsembleShow;
