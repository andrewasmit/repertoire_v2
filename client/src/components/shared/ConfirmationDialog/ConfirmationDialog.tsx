// External Dependencies
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle 
} from '@mui/material';

// Internal Dependencies

// Local Dependencies
import './ConfirmationDialog.css'

interface ConfirmationDialogParams {
  isOpen: boolean;
  handleClose: ()=> void
}

function ConfirmationDialog({ isOpen, handleClose }: ConfirmationDialogParams) {


  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          "Are you absolutely sure?"
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            If you do this, there is no coming back.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Nevermind</Button>
          <Button onClick={handleClose} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationDialog;