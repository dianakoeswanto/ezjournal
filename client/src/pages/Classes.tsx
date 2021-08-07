import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../component/ListView';
import { useStudentClasses } from '../store/student-class-store';
import { IChild, IClass } from '../types/types';
import AddClass from './AddClass';

const getChildWithClasses = async (studentId: string): Promise<{child: IChild, classes: IClass[]}> => {
    const {data : {child, classes}} = await axios.get(`/api/classes/student=${studentId}`);
    return {child, classes};
}

const transformClasses = (studentId: string, classes: IClass[]) => classes.map((klass) => ({
        id: klass._id,
        displayName: `${klass.className} with ${klass.teacher?.name} - ${klass.classDay} ${klass.classTime}`,
        linkURL: `classes/${klass._id}/lessons`
}))

const Classes = () : ReactElement => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState<string>('Classes');
    const [{studentClasses}, {set}] = useStudentClasses();
    
    useEffect(() => {
        getChildWithClasses(id).then(({child, classes}) => {
            setTitle(`${child.firstname}'s Classes`);
            set(classes);
        })
    }, []);

    return (
        <ListView 
            title={title} 
            displayData={transformClasses(id, studentClasses)} 
            addButton={<AddClass studentId={id} />} 
        />
    )
}

export default Classes;