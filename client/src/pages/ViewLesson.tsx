import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import {Link, useLocation, useParams} from "react-router-dom";
import { IClass, ILesson, IUser } from "../types/types";
import { useAuth0 } from '@auth0/auth0-react';
import { DateTime } from 'luxon';
import { Box, makeStyles, Paper, TextField, Typography } from "@material-ui/core";
import Skeleton from '@material-ui/lab/Skeleton';
import BreadcrumbLink from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import {BreadcrumbData} from "../component/ListView";
import HomeIcon from "@material-ui/icons/Home";
import PersonRoundedIcon from "@material-ui/icons/PersonRounded";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import ScheduleIcon from '@material-ui/icons/Schedule';


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
    const { pathname } = useLocation();

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

    const breadcrumbs: BreadcrumbData[] = [];
    if (klass && lesson) {
        breadcrumbs.push({
            label: 'Home',
            to: '/',
            Icon: HomeIcon,
        });

        if (pathname.includes('children')) { // current user is a parent
            breadcrumbs.push({
                label: `${klass.student.firstname}'s Classes`,
                to: `/children/${klass.student!._id}/classes`,
                Icon: PersonRoundedIcon,
            });
        }

        const lessonsLabel  = pathname.includes('children')
            ? `${klass?.student.firstname} ${klass?.className} lessons with ${klass.teacher?.name}`
            : `${klass?.student.firstname} ${klass?.student.lastname}: ${klass?.className} lessons`
        breadcrumbs.push({
            label: lessonsLabel,
            to : pathname.substr(0, pathname.lastIndexOf('/')),
            Icon: MenuBookIcon,
        });

        breadcrumbs.push({
            label: getSubTitle(lesson),
            to: pathname,
            Icon: ScheduleIcon,
        });
    }

    return (
            <Paper className={classes.paper}>
                <Box>
                    {
                        isLoading ? <TitleSkeleton /> : (
                            <>
                                <Breadcrumbs aria-label="breadcrumb" style={{paddingLeft: "6px", paddingBottom: "12px"}}>
                                    {breadcrumbs.map(({label, to, Icon}) => (
                                        <BreadcrumbLink key={label} component={Link} to={to} style={{display: "flex"}}>
                                            <Icon style={{height: "20px", width: "20px", paddingRight: "3px"}} />
                                            {label}
                                        </BreadcrumbLink>
                                    ))}
                                </Breadcrumbs>
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