// External Depencies
import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
// import EnsembleCard from "./components/EnsembleCard";
// import { useAppSelector } from "../../../redux/hooks";
// import { useAppDispatch } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";

// Local Depencies
import '../ensembles.css'


// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level
})=>{

  const navigate = useNavigate();

  const handleBackClick = useCallback(()=>{
    navigate('/ensembles')
  }, [])

  return (
    <div className='ens-show'>
      <button className="back-btn" onClick={handleBackClick}>BACK</button>
      <h3>{name}</h3>
      <h4>{grade_level}th grade</h4>
    </div>
  )
}

export default EnsembleShow;
