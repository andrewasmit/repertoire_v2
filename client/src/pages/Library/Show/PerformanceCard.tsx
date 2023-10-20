// External Dependencies
import { useCallback, useMemo } from "react"

// Internal Dependencies
import { useAppSelector } from "../../../redux/hooks"
import { Box } from "@mui/material";
import { NavigateBeforeRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

// Local Typings
interface PerformanceParams{
  concertId: number;
  name: string;
  performance: Performance;
  year: number | string;
}

interface Performance{
  ensemble: string;
  ensemble_id: number;
  performance_id: number;
  piece: string;
  piece_id: number;
}

function PerformanceCard({ concertId, name, performance, year }: PerformanceParams) {

  const navigate = useNavigate();
  const handleNavToConcert = useCallback(()=>{
    navigate(`/concerts/${concertId}`);
  },[concertId])

  const cardStyles = {
    backgroundColor: '#f4f4f4',
    ':hover':{ 
      color: '#333', 
      backgroundColor: '#cef987', 
      opacity:0.98,
      boxShadow: 1,
      cursor: 'pointer'
    },
  }
  
  return (
    <Box component={'div'} onClick={handleNavToConcert} sx={cardStyles}>
      <h2>Performed by {performance.ensemble}</h2>
      <h3>{name} {year}</h3>
    </Box>
  )
}

export default PerformanceCard