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
  handleClose: ()=> void;
  onConfirm: ()=> void;
  headerText: string;
  bodyText: string;

}

function ConfirmationDialog({ 
  isOpen, 
  handleClose, 
  onConfirm, 
  bodyText, 
  headerText 
}: ConfirmationDialogParams) {

  return (
    <div>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {headerText}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {bodyText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onConfirm} autoFocus variant="contained">
            Yes, Do It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationDialog;