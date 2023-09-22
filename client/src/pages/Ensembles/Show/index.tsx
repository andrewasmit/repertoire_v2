// External Depencies
import { FC, useMemo } from "react";

// Internal Depencies
// import EnsembleCard from "./components/EnsembleCard";
// import { useAppSelector } from "../../../redux/hooks";
// import { useAppDispatch } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";
import '../ensembles.css'

// Local Depencies

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
