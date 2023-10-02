// import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import ConcertCard from "./components/ConcertCard";
import './concerts.css'

function Concerts() {

  // const navigate = useNavigate();
  const { concertPrograms, organization } = useAppSelector(state=>state.organization)

  console.log("IN CONCERTS: ", concertPrograms);

  const concertProgramsToDisplay = concertPrograms?.map(concert=>{
    return <ConcertCard 
              key={concert.concert_id} 
              id ={concert.concert_id} 
              name={concert.name}
              year={concert.year}
              program={concert.program}
            />
  })

  return (
    <div>
      <h1>{organization?.name}'s</h1>
      <h2>Concert History</h2>

      {concertProgramsToDisplay}
    </div>
  )
}

export default Concerts;