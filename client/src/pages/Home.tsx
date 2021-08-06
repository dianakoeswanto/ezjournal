import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild } from '../types/types';
import AddChild from './AddChild';


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
    const [openModal, setOpenModal] = useState<boolean>(false);

    useEffect(() => {
        (async () => {
            setData(await getChildrenDisplayData());
        })();
    }, []);

    const addChildModal = (
        <AddChild open={openModal} setOpen={setOpenModal} />
    )
   
    return (
        <ListView 
            title="My Children" 
            displayData={data} 
            addButton={{
                childComponent: addChildModal,
                setOpen: setOpenModal
            }} 
        />
    );
}

export default Home;