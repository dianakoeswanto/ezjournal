import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild, IUser } from '../types/types';
import AddChild from './AddChild';
import { useChildren } from '../store/store';
import { useCurrentUser } from '../hooks/use-current-user';


const getChildren = async (user: IUser): Promise<IChild[]> => {
    const children =  (await axios.get(`/api/children/parent=${user.id}`)).data.children as IChild[];
    console.log(children);
    return children;
}

const transformChildren = (children: IChild[]): ListViewData[] => children.map((child) => ({
    id: child.id,
    displayName: `${child.firstname} ${child.lastname}`,
    linkURL: `/children/${child.id}/classes`
}));

const Home = (): React.ReactElement => {
    const user = useCurrentUser();
    const [{ children }, { set }] = useChildren();

    useEffect(() => {
        getChildren(user).then(children => set(children));
    }, []);
   
    return (
        <ListView 
            title="My Children" 
            displayData={transformChildren(children)}
            addButton={<AddChild />}
        />
    );
}

export default Home;
