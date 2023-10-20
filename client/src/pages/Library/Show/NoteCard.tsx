// External Dependencies
import { useCallback, useMemo } from "react"
import { useDispatch } from "react-redux";
import { Button, Typography } from "@mui/material";

// Internal Dependencies
import { Note, deleteNote } from "../../../redux/organizationSlice"
import { useAppSelector } from "../../../redux/hooks"
import { useIsOpen } from "../../../hooks/useIsOpen";
import ConfirmationDialog from "../../../components/shared/ConfirmationDialog/ConfirmationDialog";
import { destroyNote } from "../../../hooks/api/noteHooks";


function NoteCard({ id, piece_id, user_id, note }: Note) {

  const { users } = useAppSelector(state=>state.organization);
  const { currentUser } = useAppSelector(state=>state.user);
  const dispatch = useDispatch();

  const {
    handleOpen: handleOpenConfirmation, 
    handleClose: handleCloseConfirmation, 
    isOpen: isConfirmationOpen
  } = useIsOpen();

  const author = useMemo(()=>{
    if(user_id === currentUser?.id){
      return currentUser?.username
    } 
    return users?.filter(user=>user.id === user_id)[0].username
  },[users, user_id]);

  const handleDeleteNote = useCallback(()=>{
    destroyNote(id)
    dispatch(deleteNote([piece_id, id]))
    handleCloseConfirmation();
  }, [handleCloseConfirmation]);

  return (
    <div>
      <Typography variant="h6" >{note}</Typography>
      <Typography variant="body1" >-{author}</Typography>

      {user_id === currentUser?.id && 
        <Button onClick={handleOpenConfirmation}>Delete Note</Button>
      }

      <ConfirmationDialog  
        isOpen={isConfirmationOpen}
        handleClose={handleCloseConfirmation}
        onConfirm={handleDeleteNote}
        bodyText="Are you really, really sure?"
        headerText="Are you sure you want to delete this note?"
      />
    </div>
  )
}

export default NoteCard