// External Dependencies
import { 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  useTheme
} from '@mui/material';

// Local Dependencies
// import './ConfirmationDialog.css'

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

  const theme = useTheme();

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
          <Button onClick={handleClose} color='primary' >
            Cancel
          </Button>
          <Button onClick={onConfirm} autoFocus variant="contained" color="secondary" >
            Yes, Do It!
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default ConfirmationDialog;