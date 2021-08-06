import axios from 'axios';
import React, { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListView, { ListViewData } from '../component/ListView';
import { IClass } from '../types/types';
import AddClass from './AddClass';

const getClasses = async (studentId: string): Promise<IClass[]> => {
    return (await axios.get(`/api/classes/student=${studentId}`)).data.result as IClass[];
}

const getClassesDisplayData = (classes: IClass[]): ListViewData[] => {
    return classes.map((clazz: IClass) => {
        return {
            id: clazz.id,
            displayName: `${clazz.className} - ${clazz.classTime.toLocaleDateString()}`,
            linkURL: `children/:id/classes/:class_id/lessons`
        } as ListViewData;
    });
}

const getPageTitle = async (studentId: string): Promise<string> => {
    const student = (await axios.get(`/api/children/${studentId}`)).data;
    return !student ? "Classes" : `${student.firstname}'s Classes`;
}

const Classes = () : ReactElement => {
    const [data, setData] = useState<ListViewData[]>([]);
    const [title, setTitle] = useState<string>('Classes');
    const { id } = useParams<{ id: string }>();
    
    useEffect(() => {
        (async () => {
            const classes = await getClasses(id) || [];
            setTitle(await getPageTitle(id));
            setData(getClassesDisplayData(classes));
        })();
    }, []);

    return (
        <ListView title={title} displayData={data} addButton={<AddClass />}></ListView>
    );
}

export default Classes;