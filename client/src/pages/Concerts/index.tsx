// External Dependencies
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, useTheme } from "@mui/material";

// Internal Dependencies
import { useCallback } from "react";
import { useAppSelector } from "../../redux/hooks";

// Local Dependencies
import ConcertCard from "./components/ConcertCard";
import './concerts.css'

function Concerts() {

  const navigate = useNavigate();
  const theme = useTheme();
  const { concertPrograms, organization } = useAppSelector(state=>state.organization)

  const concertProgramsToDisplay = concertPrograms?.map(concert=>{
    return <ConcertCard 
              key={concert.concert_id} 
              id ={concert.concert_id} 
              name={concert.name}
              year={concert.year}
              program={concert.program}
            />
  })

  const handleNavigateToAddNewConcert = useCallback(()=>{
    return navigate('/concerts/new');
  },[])

  const btnStyles = {
    marginTop: 3,
    border: `${theme.palette.info.main} 1px solid`,
    ':hover':{
      color: theme.palette.primary.main,
      bgcolor: theme.palette.info.main,
      border: `${theme.palette.secondary.main} 1px solid`,
    }
  };

  const gridStyles = {
    background: `url(${"../../../public/concert.jpg"}) no-repeat center center/cover`,
    opacity: 0.95,
    height: '100vh',
    marginBottom: '70px',
    overflow: 'auto'
  }

  return (
    <Box sx={gridStyles}>
      <Box 
        sx={{ 
          background: theme.palette.primary.main, 
          color: theme.palette.secondary.main,
          opacity:0.85,
          padding: 5,
          }} 
        >
          <Typography 
            variant="h3" 
            sx={{ marginTop: 0, padding: 1, color: theme.palette.info.main }}
          >
            {organization?.name}
          </Typography>

          <Typography variant="h4">
            Concert Archive
          </Typography>

        <Button variant="contained" onClick={handleNavigateToAddNewConcert} color='secondary' sx={btnStyles}>
          Add New Concert
        </Button>
      </Box>

      {concertProgramsToDisplay}
    </Box>
  )
}

export default Concerts;