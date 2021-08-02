import { Container } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';


const getChildren = async (): Promise<ListViewData[]> => {
    const { result } = (await axios.get('/api/children/parent=60fcf0e89ceb9c9790b75e61')).data;
    return result;
}

const Home = (): React.ReactElement => {
    const [title, setTitle] = useState<string>("");
    const [data, setData] = useState<ListViewData[]>([]);

    useEffect(() => {
        (async () => {
        setTitle("My Children");
        setData(await getChildren());
        })();
    }, []);
    
    return (
        <Container fixed>
            <ListView title={title} displayData={data}></ListView>
        </Container>
    );
}

export default Home;