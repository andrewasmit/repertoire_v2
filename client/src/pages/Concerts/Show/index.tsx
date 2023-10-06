// External Dependencies
import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collapse } from "@mui/material";

// Internal Dependencies
import { PerformedPiece, deleteConcert } from "../../../redux/organizationSlice";
import { destroyConcert } from "../../../hooks/api/concertHooks";
import { useAppDispatch } from "../../../redux/hooks";
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

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

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

  const handleClickEditConcert: ()=>void = useCallback(():void=>{
    setIsEdit(!isEdit);
  }, [isEdit]);

  const handleClickDeleteConcert: ()=>void = useCallback(():void=>{
    setIsOpen(true);
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

      <button onClick={handleClickEditConcert}>
        {!isEdit ? "Edit Concert Details"
        : "Discard Edits" }
      </button> 

      <Collapse in={isEdit} timeout="auto" unmountOnExit>
        <EditConcertForm
          title={name} 
          year={year} 
          concertId={id} 
          handleCloseForm={handleClickEditConcert}
        />
      </Collapse>

      {!isEdit && 
        <button onClick={handleClickDeleteConcert}>Delete Concert</button>
      }

      <ConfirmationDialog 
        isOpen={isOpen}
        handleClose={()=>setIsOpen(false)}
        onConfirm={handleDeleteConcert}
        headerText={`Are you sure you want to delete the concert: ${name}?`}
        bodyText="This will delete the concert program as well as all corresponding performances"
      />
    </div>
  )
}

export default ConcertShow;