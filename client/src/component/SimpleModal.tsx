import { Button, createStyles, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Theme } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttonContainer: {
        padding: '20px',
    },
    paper: {
        width: '500px'
    }
  }),
);

interface SimpleModalProps {
    title: string,
    content: React.ReactElement,
    open: boolean
    onSubmit: () => void
    onClose: () => void
}

const SimpleModal = (props: SimpleModalProps): React.ReactElement => {
    const classes = useStyles();

    return (
        <div className={classes.paper}>
            <Dialog open={props.open} aria-labelledby="form-dialog-title" onClose={props.onClose} fullWidth>
                <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
                <DialogContent>
                    {props.content}
                </DialogContent>
                <DialogActions className={classes.buttonContainer}>
                    <Button color="primary" onClick={props.onClose} variant="outlined">
                        Cancel
                    </Button>
                    <Button color="primary" onClick={props.onSubmit} variant="contained">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
      );
}

export default SimpleModal