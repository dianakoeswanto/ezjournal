import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild } from '../types/types';


const getChildren = async (): Promise<IChild[]> => {
    return (await axios.get('/api/children/parent=60fcf0e89ceb9c9790b75e61')).data.result as IChild[];
}

const getChildrenDisplayData = async (): Promise<ListViewData[]> => {
    const children = await getChildren();
    return children.map((child: IChild) => {
        return {
            id: child.id,
            displayName: child.displayName,
            linkURL: `/children/${child.id}/classes`
        } as ListViewData
    })
}

const Home = (): React.ReactElement => {
    const [title, setTitle] = useState<string>("");
    const [data, setData] = useState<ListViewData[]>([]);

    useEffect(() => {
        (async () => {
        setTitle("My Children");
        setData(await getChildrenDisplayData());
        })();
    }, []);
    
    return (
        <Container fixed>
            <ListView title={title} displayData={data}></ListView>
        </Container>
    );
}

export default Home;