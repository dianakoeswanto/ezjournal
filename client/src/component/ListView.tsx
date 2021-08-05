import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React, { ReactElement, useState } from "react";
import { Link } from "react-router-dom";
import AddChild from "../pages/AddChild";
import SimpleModal from "./SimpleModal";
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
    paper: {
        padding: '20px 20px',
        boxShadow: 'none'
    },
    header: {
        paddingRight: '5px',
        paddingLeft: '10px',
        width: 'fit-content',
        display: 'inline',
        verticalAlign: 'middle',
    },
    headerIcon: {
        width: 'fit-content',
        padding: '5px'
    }
})

export interface ListViewData {
    id: string,
    displayName: string,
    linkURL: string
}
interface ListViewProps {
    title: string,
    avatarIcon?: JSX.Element,
    displayData: ListViewData[],
    addButton?: boolean
}

const ListView = (props : ListViewProps): ReactElement => {
    const classes = useStyles();
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    // const addModalComponent = props.addModalComponent;

    return <Paper className={classes.paper}>
        <Box>
            <Typography className={classes.header} variant="h5">{props.title}</Typography>
            { 
                props.addButton && 
                        <IconButton className={classes.headerIcon} color="primary" onClick={() => {setOpenModal(true)}}>
                            <AddCircle />
                        </IconButton>
            }
            {
                props.addButton && 
                    <AddChild open={openModal} setOpen={setOpenModal} />
            }
            
        </Box>
        <Box mt={3}>
            <List>
                {props.displayData.map((data) => {
                    return(
                    <Link to={data.linkURL}>
                        <ListItem key={data.id} button>
                            <ListItemAvatar>
                                <Avatar src="/broken-image.jpg">
                                    {props.avatarIcon}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText id={data.id} primary={data.displayName} />
                        </ListItem>
                    </Link>
                    )
                })}
            </List>
        </Box>
    </Paper>
}

export default ListView;