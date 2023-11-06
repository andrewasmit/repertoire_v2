// External Depencies
import { FC, useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

// Internal Depencies
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { Ensemble } from "../../../redux/organizationSlice";
import { deleteEns } from "../../../redux/organizationSlice";
import { deleteEnsemble } from "../../../hooks/api/ensembleHooks";
import { findEnsemblePerformances } from "../../../utils/findEnsemblePerformances";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";

// Local Depencies
import '../ensembles.css'
import EditEnsembleForm from "./EditEnsembleForm";
import { Button, Collapse, Typography } from "@mui/material";


// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level, id
})=>{

  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { concertPrograms } = useAppSelector(state=> state.organization);

  const ensPerformances = useMemo(()=>{
    if (concertPrograms){
      return findEnsemblePerformances(id, concertPrograms);
    }
  }, [concertPrograms]);


  const handleBackClick: ()=> void  = useCallback(():void=>{
    navigate('/ensembles')
  }, [])

  const handleClickDeleteEns: ()=> void = useCallback((): void=>{
    setIsOpen(true);
  }, []);

  const handleCloseDialog: ()=> void = useCallback((): void=>{
    setIsOpen(false);
  }, []);

  const handleClickEditEns: ()=> void = useCallback((): void=>{
    setIsEdit(!isEdit)
  }, [isEdit]);

  const handleConfirmDelete: ()=> void = useCallback((): void=>{
    setIsOpen(false);
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

  return (
    <div className='ens-show'>
      <Button variant='contained' color="secondary" onClick={handleBackClick}>BACK</Button>

      <Typography variant="h3" >{name}</Typography>
      <Typography variant="h5">{grade_level}th grade</Typography>

      <Button  variant="outlined" color='primary' onClick={handleClickEditEns}>
        {!isEdit ? "Edit Ensemble Details"
        : "Discard Edits" }
      </Button> 

      {!isEdit && 
        <Button 
          variant="contained" 
          color='primary' 
          onClick={handleClickDeleteEns}
        >
          Delete Ensemble
        </Button>
      }

      <Collapse in={isEdit} timeout="auto" unmountOnExit>
        <EditEnsembleForm 
          name={name} 
          gradeLevel={grade_level} 
          ensembleId={id} 
          handleCloseForm={handleClickEditEns}
        />
      </Collapse>

      {performancesToDisplay.length > 0 ? 
        <Typography variant="h4">Performances from {name}</Typography> : 
        <Typography variant="h5">{name} has not yet performed</Typography>
      }

      {performancesToDisplay}

      <ConfirmationDialog 
        isOpen={isOpen} 
        handleClose={handleCloseDialog}
        onConfirm={handleConfirmDelete}
        headerText={`Are you sure you want to delete ${name}`}
        bodyText="Deleting this ensemble will also erase all corresponding performances. This action is permanent and cannot be undone."
      />
    </div>
  )
}

export default EnsembleShow;
