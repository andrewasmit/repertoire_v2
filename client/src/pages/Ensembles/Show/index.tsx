// External Depencies
import { FC } from "react";

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

  return (
    <div className='ens-show'>
      <h3>{name}</h3>
      <h4>{grade_level}th grade</h4>
    </div>
  )
}

export default EnsembleShow;
