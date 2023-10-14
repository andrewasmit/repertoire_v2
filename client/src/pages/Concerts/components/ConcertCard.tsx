// External Dependencies
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

// Internal Dependencies
import { PerformedPiece } from "../../../redux/organizationSlice"

// Local Dependencies
import '../concerts.css'

type ConcertCardParams = {
  year: number | string;
  id: number;
  name: string;
  program: PerformedPiece[] | null;
}

function ConcertCard({ year, id, name, program }: ConcertCardParams) {

  const navigate = useNavigate();

  const handleNavToShowPage = useCallback((): void=>{
    navigate(`/concerts/${id}`);
  }, []);


  const performancesToDisplay = program?.map(performance=>{
    return <li key ={performance.performance_id}>
      <h5>{performance.piece}</h5>
      <h6>{performance.ensemble}</h6>
    </li>
  });


  return (
    <div id={`concert-${id}`} className="concert-card" onClick={handleNavToShowPage}>
      <div className="concert-card-wrapper">
        <h3>{name}</h3>
        <h4>{year}</h4>
        <ul>
          {performancesToDisplay}
        </ul>
      </div>
    </div>
  )
}

export default ConcertCard;