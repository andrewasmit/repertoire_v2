// External Depencies
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import EnsembleCard from "./components/EnsembleCard";
import { useAppSelector } from "../../redux/hooks";
// import { useAppDispatch } from "../../redux/hooks";

// Local Depencies

function Ensembles() {

  const { ensembles, organization } = useAppSelector(state=>state.organization);

  const navigate = useNavigate();

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

  const handleAddEnsClick = useCallback(()=>{
    navigate('/ensembles/new');
  }, []);

  return (
    <div className="ens-page">
      <h1 id="ens-name">{organization?.name}</h1>
      <h2>Here are the ensembles currently in your organization</h2>
      <button onClick={handleAddEnsClick}>Add New Ensemble</button>

      <div id="ens-card-container">
        {ensembleCards}
      </div>
    </div>
  );
}

export default Ensembles;
