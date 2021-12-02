export type DeleteDialogProps = {
  isOpen: boolean;
  handleClose: HandleDeleteDialogCloseFunction;
}

type HandleDeleteDialogCloseFunction = {
  (data: boolean): void;
}
