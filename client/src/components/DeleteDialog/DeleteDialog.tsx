import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@mui/material';

export default function DeleteDialog({isOpen, handleClose}: {isOpen: boolean, handleClose: Function}) {

  return (
    <Dialog
      open={isOpen}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {'Delete this task permanently?'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          You can not undo this operation.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={() => handleClose(false)}>Keep</Button>
        <Button onClick={() => handleClose(true)} color={'error'}>Delete</Button>
      </DialogActions>
    </Dialog>
  );
}
