import { PerformedPiece } from "../../../redux/organizationSlice"
import '../concerts.css'


type ConcertCardParams = {
  year: number;
  id: number;
  name: string;
  program: PerformedPiece[];
}


function ConcertCard({ year, id, name, program }: ConcertCardParams) {

  const performancesToDisplay = program.map(performance=>{
    // ensemble, ensemble_id, performance_id, piece
    return <li>
      <h5>{performance.piece}</h5>
      <h6>{performance.ensemble}</h6>
    </li>
  })
  return (
    <div id={`concert-${id}`} className="concert-card">
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

export default ConcertCard