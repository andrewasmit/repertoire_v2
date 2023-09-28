// External Depencies
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
// import EnsembleCard from "./components/EnsembleCard";
// import { useAppSelector } from "../../../redux/hooks";
import { useAppDispatch } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";
import { deleteEns } from "../../../redux/organizationSlice";

// Local Depencies
import '../ensembles.css'
import { deleteEnsemble } from "../../../hooks/api/ensembleHooks";


// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level, id
})=>{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBackClick = useCallback(()=>{
    navigate('/ensembles')
  }, [])

  const handleDeleteEns = useCallback(()=>{
    navigate('/ensembles')
    deleteEnsemble(id);
    dispatch(deleteEns(id))
  }, [])

  return (
    <div className='ens-show'>
      <button className="back-btn" onClick={handleBackClick}>BACK</button>

      <h3>{name}</h3>
      <h4>{grade_level}th grade</h4>
      
      <button onClick={handleDeleteEns}>Delete Ensemble</button>
    </div>
  )
}

export default EnsembleShow;
