import { Avatar, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import { AddCircle } from "@material-ui/icons";
import { Dispatch, ReactElement } from "react";
import { Link } from "react-router-dom";

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
    },
    emptyMessage: {
        paddingLeft: "10px",
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
    addButton?: ReactElement,
}

const ListView = (props : ListViewProps): ReactElement => {
    const classes = useStyles();
    return <Paper className={classes.paper}>
        <Box>
            <Typography className={classes.header} variant="h5">{props.title}</Typography>
            { props.addButton }
        </Box>
        <Box mt={3}>
            <List>
                {props.displayData.length === 0 && <div className={classes.emptyMessage}>No records found.</div>}
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