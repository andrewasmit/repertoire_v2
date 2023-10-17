// External Dependencies
import { Box, Button, Typography } from "@mui/material"

// Internal Dependencies
import { PerformedPiece, deletePerformance } from "../../../redux/organizationSlice"
import { useNavigate, useParams } from "react-router-dom"
import { useCallback, useMemo } from "react";
import { useIsOpen } from "../../../hooks/useIsOpen";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";
import { useAppDispatch } from "../../../redux/hooks";
import { deletePerformanceApi } from "../../../hooks/api/performanceHooks";



function Performance({ performance_id, piece, piece_id, ensemble, ensemble_id }: PerformedPiece) {

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const params = useParams();
  const { isOpen, handleClose, handleOpen } = useIsOpen();

  const concertId = useMemo(()=>{
    if(params){
      return params.id
    }
  }, [params]);


  const handleNavToEns = useCallback(()=>{
    navigate(`/ensembles/${ensemble_id}`);
  }, [ensemble_id]);


  const handleNavToPiece = useCallback(()=>{
    navigate(`/library/${piece_id}`);
  }, [piece_id]);


  const handleDeletePerformanceClick = useCallback(()=>{
    // Redux takes in an array of 2 arguments; Concert ID and Performance ID
    // The call to the backend takes in only the performanceId
    dispatch(deletePerformance([concertId, performance_id]));
    deletePerformanceApi(performance_id);
    handleClose();
  }, [concertId, performance_id, handleClose, params]);


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
        onClick={handleOpen}
      >
        Delete Performance
      </Button>

      <ConfirmationDialog 
        isOpen={isOpen}
        handleClose={handleClose}
        onConfirm={handleDeletePerformanceClick}
        headerText={`Are you sure?`}
        bodyText={`This will permanently delete ${ensemble}'s performance of ${piece}`}
      />
    </Box>
  )
}

export default Performance