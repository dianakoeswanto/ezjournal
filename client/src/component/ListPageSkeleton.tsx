import { Box, List, makeStyles, Paper } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import React, { ReactElement } from "react";

const useStyles = makeStyles({
    paper: {
        padding: '20px 20px',
        boxShadow: 'none'
    },
    skeletonRow: {
        padding: '8px 16px',
        display: 'flex',
    }
})

const SkeletonRow = () => {
    const classes = useStyles();
    return (
        <div className={classes.skeletonRow}>
            <div style={{paddingRight: '20px'}}>
                <Skeleton variant="circle" width={40} height={40}/>
            </div>

            <Skeleton variant="text" width="185px" height="40px"/>
        </div>
    );
}

const ListPageSkeleton = (): ReactElement => {
    const classes = useStyles();
    return <Paper className={classes.paper}>
        <Skeleton variant="text" width={185} height={35} />
        <Skeleton variant="text" width={185} height={35} />
        <Box mt={3}>
            <List>
                <SkeletonRow />
                <SkeletonRow />
                <SkeletonRow />
            </List>
        </Box>
    </Paper>
}

export default ListPageSkeleton;