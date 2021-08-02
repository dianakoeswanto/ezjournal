import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import React from "react";
// import { Link } from "react-router-dom";

const useStyles = makeStyles({
    paper: {
        padding: '20px 20px'
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
    _id: string,
    displayName: string
}
interface ListViewProps {
    title: string,
    avatarIcon?: JSX.Element,
    displayData: ListViewData[]
}

const ListView = ({ title, avatarIcon, displayData } : ListViewProps): React.ReactElement => {
    const classes = useStyles();
    
    return <Paper className={classes.paper}>
        <Box>
            <Typography className={classes.header} variant="h5">{title}</Typography>
            <IconButton className={classes.headerIcon} color="primary"><AddCircle /></IconButton>
        </Box>
        <Box mt={3}>
            <List>
                {displayData.map((data) => {
                    return(
                    <ListItem key={data._id} button>
                        <ListItemAvatar>
                            <Avatar src="/broken-image.jpg">
                                {avatarIcon}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText id="someId" primary={data.displayName} />
                    </ListItem>
                    )
                    
                })}
                
            </List>
        </Box>
    </Paper>
}

export default ListView;