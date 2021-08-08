import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { IClass, ILesson, IUser } from "../types/types";
import { useAuth0 } from '@auth0/auth0-react';
import { DateTime } from 'luxon';
import { Box, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';


const useStyles = makeStyles({
    paper: {
        padding: '20px 20px',
        boxShadow: 'none'
    },
    header: {
        paddingRight: '5px',
        paddingLeft: '10px',
        verticalAlign: 'middle',
    },
    subTitle: {
        paddingRight: '5px',
        paddingLeft: '10px',
        verticalAlign: 'middle',
        color: 'gray',
    },
    emptyMessage: {
        paddingLeft: "10px",
    }
})

const getPageTitle = (klass?: IClass): string => {
    return !klass ? '' : `${klass?.className}: ${klass?.student.firstname} ${klass?.student.lastname}`;
}

const getSubTitle = (lesson?: ILesson): string => {
    return !lesson ? '' : `${DateTime.fromISO(lesson.time.toString()).setLocale("au").toFormat("cccc, dd/MM/yyyy")}`;
}

const getLessonDetails = async (
    classId: string, 
    lessonId: string, 
    token: string
    ) : Promise<{user: IUser, klass: IClass, lesson: ILesson}> => {
        const { data: {user, klass, lesson} } = await axios.get(`/api/classes/${classId}/lessons/${lessonId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return {user, klass, lesson}
}

const TitleSkeleton = () => (
    <>
        <Skeleton variant="text" width={200} />
        <Skeleton variant="text" width={135} />
    </>
);

const ViewLesson = (): ReactElement => {
    const classes = useStyles();
    const { class_id, lesson_id } = useParams<{ class_id: string, lesson_id: string }>();
    const { getAccessTokenSilently } = useAuth0();
    const [klass, setKlass] = useState<IClass>();
    const [lesson, setLesson] = useState<ILesson>();
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getLessonDetails(class_id, lesson_id, token)
                    .then(({user, klass, lesson}) => {
                        setKlass(klass);
                        setLesson(lesson);
                        setLoading(false);
            })
        })
    }, [])

    return (
            <Paper className={classes.paper}>
                <Box>
                    {
                        isLoading ? <TitleSkeleton /> : (
                            <>
                                <Typography className={classes.header} variant="h5">
                                    {getPageTitle(klass)}
                                </Typography>
                                <Typography className={classes.subTitle} variant="subtitle1">
                                    {getSubTitle(lesson)}
                                </Typography>
                            </>
                        )
                    }
                </Box>
                <Box mt={3}>
                    <TextField
                        id="positiveComments"
                        label="The Positives"
                        multiline
                        rows={4}
                        value={ lesson ? lesson?.positiveComments : "Loading content..."}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Box mt={3}>
                    <TextField
                        id="improvements"
                        label="Some Improvements"
                        multiline
                        rows={4}
                        value={ lesson ? lesson?.improvements : "Loading content..."}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
                <Box mt={3}>
                <TextField
                        id="additionalComments"
                        label="Additional Comments"
                        multiline
                        rows={4}
                        value={ lesson ? lesson?.additionalComments : "Loading content..."}
                        variant="outlined"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                </Box>
            </Paper>
    )
}

export default ViewLesson;