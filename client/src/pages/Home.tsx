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
    const [data, setData] = useState<ListViewData[]>([]);

    useEffect(() => {
        (async () => {
            setData(await getChildrenDisplayData());
        })();
    }, []);

   
    return (
        <>
            <ListView title="My Children" displayData={data} addButton={true}></ListView>
            
        </>
    );
}

export default Home;