// External Dependencies
import { Box, Button, Typography } from "@mui/material"

// Internal Dependencies
import { PerformedPiece } from "../../../redux/organizationSlice"
import { useNavigate } from "react-router-dom"
import { useCallback, useMemo } from "react";



function Performance({ performance_id, piece, piece_id, ensemble, ensemble_id }: PerformedPiece) {

  const navigate = useNavigate();

  const handleNavToEns = useCallback(()=>{
    navigate(`/ensembles/${ensemble_id}`);
  }, [ensemble_id]);

  const handleNavToPiece = useCallback(()=>{
    navigate(`/library/${piece_id}`);
  }, [piece_id]);

  const handleDeletePerformanceClick = useCallback(()=>{
    console.log(`Performance # ${performance_id} was clicked to be deleted.`)
  }, [performance_id]);

  const hoverStyle = useMemo(()=>{
    return {
      padding: .5,
      ':hover':{ 
        color: '#333', 
        backgroundColor: '#cef987', 
        opacity:0.98,
        boxShadow: 1,
        cursor: 'pointer'
      },
    }
  }, []);

  return (
    <Box 
      component= 'div' 
      sx={{ 
        backgroundColor: '#f4f4f4', 
        borderBottom: '1px dotted #333',
        '&:last-child':{
          borderBottom: 'none'
        },
        maxWidth: 500, 
        '&:nth-of-type(2)':{
          backgroundColor: '#fff'
        },
        padding: 1
      }}
    >
      <Typography 
        variant="h5" 
        onClick={handleNavToPiece} 
        sx={hoverStyle} 
      >
        {piece}
      </Typography>

      <Typography 
        variant="h6" 
        onClick={handleNavToEns} 
        sx={{ ...hoverStyle, fontSize: 16 }}
      >
        {ensemble}
      </Typography>

      <Button 
        onClick={handleDeletePerformanceClick}
      >
        Delete Performance
      </Button>
    </Box>
  )
}

export default Performance