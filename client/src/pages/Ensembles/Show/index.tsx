// External Depencies
import { FC, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, ButtonGroup, Collapse, Typography, useTheme } from "@mui/material";

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";
import { deleteEns } from "../../../redux/organizationSlice";
import { deleteEnsemble } from "../../../hooks/api/ensembleHooks";
import { findEnsemblePerformances } from "../../../utils/findEnsemblePerformances";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";
import { useIsOpen } from "../../../hooks/useIsOpen";

// Local Depencies
import '../ensembles.css'
import EditEnsembleForm from "./EditEnsembleForm";

// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level, id
})=>{

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  const { isOpen, handleClose, handleOpen } = useIsOpen();
  const { 
    toggleIsOpen: toggleEditMode, 
    isOpen: isEditOpen  
  } = useIsOpen();

  const { concertPrograms } = useAppSelector(state=> state.organization);

  const ensPerformances = useMemo(()=>{
    if (concertPrograms){
      return findEnsemblePerformances(id, concertPrograms);
    }
  }, [concertPrograms]);


  const handleBackClick: ()=> void  = useCallback(():void=>{
    navigate('/ensembles')
  }, [])


  const handleConfirmDelete: ()=> void = useCallback((): void=>{
    handleClose();
    deleteEnsemble(id);
    dispatch(deleteEns(id));
    navigate('/ensembles');
  }, [])

  
  const performancesToDisplay: JSX.Element[] = useMemo(()=>{
    return ensPerformances.map(performance=>{
    const handleNavToConcertShow = ()=>{
      navigate(`/concerts/${performance.concertId}`)
    }

    const handleNavToPieceShow = ()=>{
      navigate(`/library/${performance.performance.piece_id}`)
    }

    return <div className="ens-performance" key={performance.name}>
      <h3 onClick={handleNavToPieceShow}>{performance.performance.piece}</h3>
      <h4 onClick={handleNavToConcertShow}>{performance.name} -{performance.year}</h4>
    </div>
  })
}, [ensPerformances]);

const headerStyles = {
  // backgroundColor: theme.palette.secondary.main,
  background: `url(${'../../../../public/instruments.jpeg'}) no-repeat center center/cover`,
  padding: 3,
  opacity: 0.8,
}

const headerTextStyles = {
  color: theme.palette.secondary.main, 
  opacity: .9, 
  backgroundColor: theme.palette.primary.main, 
  width: 'auto',
  padding: 0.5,
}

  return (
    <div>
      <Box sx={headerStyles}>
        <Button 
          variant='contained' 
          color="primary" 
          onClick={handleBackClick}
          sx={{ marginBottom: 2 }}
        >
          BACK
        </Button>

        <Typography variant="h3" sx={headerTextStyles} >{name}</Typography>
        <Typography variant="h5" sx={headerTextStyles} >{grade_level}th grade</Typography>

        <ButtonGroup sx={{ backgroundColor: theme.palette.secondary.main, marginTop: 1 }}>
          <Button  variant="outlined" color='primary' onClick={toggleEditMode}>
            {!isEditOpen ? "Edit Ensemble Details"
            : "Discard Edits" }
          </Button> 

          {!isEditOpen && 
            <Button 
              variant="contained" 
              color='primary' 
              onClick={handleOpen}
            >
              Delete Ensemble
            </Button>
          }
        </ButtonGroup>

        <Collapse in={isEditOpen} timeout="auto" unmountOnExit>
          <EditEnsembleForm 
            name={name} 
            gradeLevel={grade_level} 
            ensembleId={id} 
            handleCloseForm={toggleEditMode}
          />
        </Collapse>
      </Box>

      {performancesToDisplay.length > 0 ? 
        <Typography variant="h4">Performances from {name}</Typography> : 
        <Typography variant="h5">{name} has not yet performed</Typography>
      }

      {performancesToDisplay}

      <ConfirmationDialog 
        isOpen={isOpen} 
        handleClose={handleClose}
        onConfirm={handleConfirmDelete}
        headerText={`Are you sure you want to delete ${name}`}
        bodyText="Deleting this ensemble will also erase all corresponding performances. This action is permanent and cannot be undone."
      />
    </div>
  )
}

export default EnsembleShow;
