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


// Component Definition
const EnsembleShow: FC<Ensemble> = ({
  name, grade_level, id
})=>{

  const [isOpen, setIsOpen] = useState(false);

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
    console.log(`EDIT ENS w/ ID of ${id} clicked`);
  }, []);

  const handleConfirmDelete: ()=> void = useCallback((): void=>{
    setIsOpen(false);
    deleteEnsemble(id);
    dispatch(deleteEns(id));
    navigate('/ensembles');
  }, [])

  
  const performancesToDisplay = ensPerformances?.map(performance=>{
    const handleNavToConcertShow = ()=>{
      navigate(`/concerts/${performance.concertId}`)
    }

    const handleNavToPieceShow = ()=>{
      navigate(`/library/${performance.performance.piece_id}`)
    }

    return <div className="ens-performance">
      <h3 onClick={handleNavToPieceShow}>{performance.performance.piece}</h3>
      <h4 onClick={handleNavToConcertShow}>{performance.name} -{performance.year}</h4>
    </div>
  })

  return (
    <div className='ens-show'>
      <button className="back-btn" onClick={handleBackClick}>BACK</button>

      <h3 className="heading">{name}</h3>
      <h4 className="heading">{grade_level}th grade</h4>

      <button onClick={handleClickEditEns}>Edit Ensemble Details</button>
      <button onClick={handleClickDeleteEns}>Delete Ensemble</button>

      {performancesToDisplay.length > 0 ? 
        <h2>Performances from {name}</h2> : 
        <h2>{name} has not yet performed</h2>
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
