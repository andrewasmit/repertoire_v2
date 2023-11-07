// External Dependencies
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";

// Internal Dependencies
import { PerformedPiece } from "../../../redux/organizationSlice"

// Local Dependencies
import '../concerts.css'
import { List, ListItem, Typography } from "@mui/material";

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

  console.log("PROGRAM: ", program)
  
  const performancesToDisplay = program?.map(performance=>{
    return <ListItem 
              key ={performance.performance_id}
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                ':nth-child(odd)':{
                  background: '#efefef'
                }
              }}
            >
              <Typography variant="body2"><i>{performance.piece}</i></Typography>
            </ListItem>
  });


  return (
    <div id={`concert-${id}`} className="concert-card" onClick={handleNavToShowPage}>
      <div className="concert-card-wrapper">
        <Typography variant="h5" color="secondary" >{name}</Typography>
        <Typography variant="h6" color="secondary">{year}</Typography>
        <List>
          {performancesToDisplay}
        </List>
      </div>
    </div>
  )
}

export default ConcertCard;