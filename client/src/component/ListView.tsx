import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, Typography } from "@material-ui/core";
import { ReactElement } from "react";
import { Link } from "react-router-dom";
import ListPageSkeleton from "./ListPageSkeleton";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import BreadcrumbLink from '@material-ui/core/Link';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import ScheduleIcon from '@material-ui/icons/Schedule';

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
};
export interface BreadcrumbData {
    label: string,
    to: string,
    Icon: React.ElementType,
};
export interface ListViewProps {
    title: string,
    avatarIcon?: JSX.Element,
    displayData: ListViewData[],
    addButton?: ReactElement,
    isLoading: boolean,
    breadcrumbs?: BreadcrumbData[],
};

const ListView = (props : ListViewProps): ReactElement => {
    const classes = useStyles();
    if (props.isLoading) {
        return <ListPageSkeleton />;
    }

    return <Paper className={classes.paper}>
        {props.breadcrumbs  && props.breadcrumbs!.length > 0 &&(
            <Breadcrumbs aria-label="breadcrumb" style={{paddingLeft: "6px", paddingBottom: "12px"}}>
                {props.breadcrumbs!.map(({label, to, Icon}) => (
                    <BreadcrumbLink key={label} component={Link} to={to} style={{display: "flex"}}>
                        <Icon style={{height: "20px", width: "20px", paddingRight: "3px"}} />
                        {label}
                    </BreadcrumbLink>
                ))}
            </Breadcrumbs>
        )}

        <Box>
            <Typography className={classes.header} variant="h5">{props.title}</Typography>
            { props.addButton }
        </Box>
        <Box mt={3}>
            <List>
                {props.displayData.length === 0 && <div className={classes.emptyMessage}>No records found.</div>}
                {props.displayData.map((data) => {
                    return(
                    <Link key={data.id} to={data.linkURL}>
                        <ListItem key={data.id} button>
                            <ListItemAvatar>
                                <Avatar>
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