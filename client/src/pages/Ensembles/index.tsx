// External Depencies
import { useMemo } from "react";

// Internal Depencies
import EnsembleCard from "./EnsembleCard";
import { useAppSelector } from "../../redux/hooks";
// import { useAppDispatch } from "../../redux/hooks";

// Local Depencies

function Ensembles() {

  const { ensembles, organization } = useAppSelector(state=>state.organization);

  const ensembleCards = useMemo(()=>{
    return ensembles?.map(ens=>{
      return <EnsembleCard 
                id={ens.id} 
                key={ens.id} 
                name={ens.name} 
                grade={ens.grade_level} 
              />
    });
  }, [ensembles])

  return (
    <div>
      <h1>{organization?.name}</h1>
      <h2>Here are the ensembles currently in your organization</h2>

      {ensembleCards}
    </div>
  );
}

export default Ensembles;
