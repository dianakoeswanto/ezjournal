import {
    Button,
    createStyles,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
    makeStyles,
    Theme
} from "@material-ui/core";
import React from "react";
import {AddCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
        padding: '20px',
    },
    paper: {
        width: '500px'
    },
    headerIcon: {
      width: 'fit-content',
      padding: '5px'
    }
  }),
);

interface SimpleModalProps {
    onOpen: () => void,
    onClose: () => void,
    open: boolean,
    title: string,
    content: React.ReactElement,
    onSubmit: () => void,
}

const SimpleModal = ({ onOpen, onClose, open, title, content, onSubmit }: SimpleModalProps): React.ReactElement => {
    const classes = useStyles();

    return (
        <>
            <IconButton className={classes.headerIcon} color="primary" onClick={onOpen}>
                <AddCircle />
            </IconButton>
            <div className={classes.paper}>
                <Dialog open={open} aria-labelledby="form-dialog-title" onClose={onClose} fullWidth>
                    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                    <DialogContent>
                        {content}
                    </DialogContent>
                    <DialogActions className={classes.buttonContainer}>
                        <Button color="primary" onClick={onClose} variant="outlined">
                            Cancel
                        </Button>
                        <Button color="primary" onClick={onSubmit} variant="contained">
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </>
      );
}

export default SimpleModal