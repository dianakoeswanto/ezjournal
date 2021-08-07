import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListView, { ListViewData } from "../component/ListView";
import { IClass, ILesson, IUser } from "../types/types";
import { useLessons } from '../store/lesson-store';
import { useAuth0 } from '@auth0/auth0-react';
import AddChild from "./AddChild";
import { MapSharp } from "@material-ui/icons";

export interface LessonsProps {

}

const isTeacher = (user?: IUser, teacher?: IUser) : boolean => {
    return user?.id === teacher?.id
}

const transformLessons = (lessons: ILesson[]) => lessons.map((lesson) => ({
    id: lesson._id,
    displayName: `Lesson at ${lesson.time}`,
    linkURL: `${lesson._id}`
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
                        console.log(user, klass, lessons);
                        setUser(user as IUser);
                        setKlass(klass);
                        setLessons(lessons);
            })
        })
        
    }, [])
    return (
        <ListView 
            title={`${klass?.student.firstname} ${klass?.student.lastname}'s lessons`}
            displayData={transformLessons(lessons)}
            addButton={isTeacher(user!, klass!.teacher) ? <AddChild /> : undefined }
        />
    )
}

export default Lessons;