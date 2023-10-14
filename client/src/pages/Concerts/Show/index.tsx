// External Dependencies
import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

// Internal Dependencies
import { PerformedPiece, deleteConcert } from "../../../redux/organizationSlice";
import { destroyConcert } from "../../../hooks/api/concertHooks";
import { useAppDispatch } from "../../../redux/hooks";
import { useIsOpen } from "../../../hooks/useIsOpen";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";

// Local Dependencies
import EditConcertForm from "./EditConcertForm";


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
      return <div>
        <h4>{performance.piece}</h4>
        <h6>{performance.ensemble}</h6>
      </div>
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

      {performancesToDisplay}

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