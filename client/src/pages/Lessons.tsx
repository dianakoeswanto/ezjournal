import axios from "axios";
import React, { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListView, { ListViewData } from "../component/ListView";
import { IClass, ILesson, IUser } from "../types/types";
import { useLessons } from '../store/lesson-store';
import { useAuth0 } from '@auth0/auth0-react';
import AddLesson from './AddLesson';
import { DateTime } from 'luxon';
import ScheduleIcon from '@material-ui/icons/Schedule';

export interface LessonsProps {

}

const isTeacher = (user?: IUser, teacher?: IUser) : boolean => {
    console.log("=====", user);
    console.log("=====", teacher);
    console.log("````", user?._id === teacher?._id);
    return user?._id === teacher?._id
}

const getPageTitle = (user?:IUser, teacher?: IUser, klass?: IClass): string => {
    if(isTeacher(user, teacher)) {
        console.log("teacher");
        return `${klass?.student.firstname} ${klass?.student.lastname} ${klass?.className}'s lessons`
    }

    return `${klass?.student.firstname} ${klass?.className} lessons with ${teacher?.name}`;
}

const transformLessons = (lessons: ILesson[]) => lessons.map((lesson) => ({
    id: lesson._id,
    displayName: `${DateTime.fromISO(lesson.time.toString()).setLocale("au").toFormat("cccc, dd/MM/yyyy")}`,
    linkURL: `lessons/${lesson._id}`
}) as ListViewData)

const getLessons = async (classId: string, token: string): Promise<{user: IUser, klass: IClass, lessons: ILesson[]}> => {
    const { data: {user, klass, lessons} } = await axios.get(`/api/classes/${classId}/lessons`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {user, klass, lessons}
}

const Lessons = (props: LessonsProps): ReactElement => {
    const { class_id } = useParams<{ class_id: string }>();
    const { getAccessTokenSilently } = useAuth0();
    const [{ lessons }, { setLessons }] = useLessons();
    const [klass, setKlass] = useState<IClass>();
    const [user, setUser] = useState<IUser>();

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getLessons(class_id, token)
                    .then(({user, klass, lessons}) => {
                        setUser(user);
                        setKlass(klass);
                        setLessons(lessons);
            })
        })
        
    }, [])
    return (
        <ListView 
            title={getPageTitle(user, klass?.teacher, klass)}
            displayData={transformLessons(lessons)}
            avatarIcon={<ScheduleIcon />}
            addButton={isTeacher(user, klass?.teacher) ? <AddLesson classId={class_id}/> : undefined }
        />
    )
}

export default Lessons;