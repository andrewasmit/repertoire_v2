// External Dependencies
import { FC, useCallback } from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Typography } from '@mui/material';


interface PerformanceProps{
  concertId: number,
  piece_id: number,
  name: string,
  piece: string,
  year: string | number,
}

const Performance: FC<PerformanceProps> = ({
  concertId, 
  piece_id, 
  piece, 
  year, 
  name, 
})=>{

  const navigate = useNavigate();

  const handleNavToPiece = useCallback(()=>{
    navigate(`/pieces/${piece_id}`)
  }, [piece_id]);

  const handleNavToConcert = useCallback(()=>{
    navigate(`/concerts/${concertId}`)
  }, [concertId]);

  return (
    <Box className="ens-performance" key={name}>
      <Typography variant="h5" onClick={handleNavToPiece}>"{piece}"</Typography>
      <Typography variant="body1" onClick={handleNavToConcert}>{name} -{year}</Typography>
      <Divider />
    </Box>
  )
}

export default Performance;