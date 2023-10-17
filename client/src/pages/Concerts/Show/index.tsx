// External Dependencies
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Collapse } from "@mui/material";

// Internal Dependencies
import { PerformedPiece, deleteConcert } from "../../../redux/organizationSlice";
import { destroyConcert } from "../../../hooks/api/concertHooks";
import { useAppDispatch } from "../../../redux/hooks";
import { useIsOpen } from "../../../hooks/useIsOpen";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";

// Local Dependencies
import EditConcertForm from "./EditConcertForm";
import Performance from "../components/Performance";


type ConcertParams = {
  id: number | string;
  name: string;
  year: number;
  program: PerformedPiece[]
}

function ConcertShow({ id, name, year, program}: ConcertParams) {

  const { 
    isOpen: isDialogOpen, 
    handleClose: handleCloseDialog, 
    handleOpen: handleOpenDialog 
  } = useIsOpen();

  const { 
    isOpen: isEditOpen,
    handleClose: handleCloseEdit,
    toggleIsOpen: toggleEdit
  } = useIsOpen();

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const performancesToDisplay = useMemo(()=>{ 
    return program.map(performance=>{
      return <Performance
                key={performance.performance_id} 
                ensemble={performance.ensemble}
                ensemble_id={performance.ensemble_id}
                performance_id={performance.performance_id}
                piece={performance.piece}
                piece_id={performance.piece_id}
              />
    })
  }, [program]);

  const handleNavBackToConcerts: ()=>void = useCallback(():void=>{
    navigate('/concerts');
  }, []);

  const handleDeleteConcert: ()=> void = useCallback(():void =>{
    destroyConcert(id);
    dispatch(deleteConcert(id));
    navigate('/concerts');
  }, [])

  return (
    <div>
      <button onClick={handleNavBackToConcerts}>Back</button>

      <h2>{name}</h2>
      <h4>{year}</h4>
      <Box 
        component= 'div' 
        sx={{ 
          display: 'block',
          margin: 'auto',
          width: 500,
          border: '1px solid #333',
          // justifyContent: 'center',
          // alignItems: 'center',
          // padding: 2,
          // margin: 5
        }}
      >
        {performancesToDisplay}
      </Box>

      <button onClick={toggleEdit}>
        {!isEditOpen ? "Edit Concert Details"
        : "Discard Edits" }
      </button> 

      <Collapse in={isEditOpen} timeout="auto" unmountOnExit>
        <EditConcertForm
          title={name} 
          year={year} 
          concertId={id} 
          handleCloseForm={handleCloseEdit}
        />
      </Collapse>

      {!isEditOpen && 
        <button onClick={handleOpenDialog}>Delete Concert</button>
      }

      <ConfirmationDialog 
        isOpen={isDialogOpen}
        handleClose={handleCloseDialog}
        onConfirm={handleDeleteConcert}
        headerText={`Are you sure you want to delete the concert: ${name} from ${year}?`}
        bodyText="This will also delete all corresponding performances"
      />
    </div>
  )
}

export default ConcertShow;