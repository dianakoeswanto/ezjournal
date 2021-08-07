import axios from "axios";
import { ReactElement, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ListView from "../component/ListView";
import { IClass, ILesson, IUser } from "../types/types";
import { useLessons } from '../store/lesson-store';
import { useAuth0 } from '@auth0/auth0-react';

export interface LessonsProps {

}

const transformLessonData = (lessons: ILesson[]) => {
    return [];
}

const getLessons = async (classId: string, token: string): Promise<{klass: IClass, lessons: ILesson[]}> => {
    const { data: {klass, lessons} } = await axios.get(`/api/classes/${classId}/lessons`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return {klass, lessons}
}

const Lessons = (props: LessonsProps): ReactElement => {
    const { class_id } = useParams<{ class_id: string }>();
    const { getAccessTokenSilently } = useAuth0();
    const [{ lessons }, { set }] = useLessons();
    const [klass, setKlass] = useState<IClass>();

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getLessons(class_id, token)
                    .then(({klass, lessons}) => {
                        setKlass(klass);
                        set(lessons);
            })
        })
        
    }, [])
    return (
        <ListView 
            title={`${klass?.student.firstname} ${klass?.student.lastname}'s lessons`}
            displayData={transformLessonData(lessons)}
        />
    )
}

export default Lessons;