import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild, IUser } from '../types/types';
import AddChild from './AddChild';
import { useChildren } from '../store/store';
import { useCurrentUser } from '../hooks/use-current-user';
import { useAuth0 } from '@auth0/auth0-react';


const getChildren = async (user: IUser, token: string): Promise<IChild[]> => {
    return (await axios.get(`/api/children/parent=${user.id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data.result as IChild[];
}

const transformChildren = (children: IChild[]): ListViewData[] => children.map((child) => ({
    id: child.id,
    displayName: child.displayName,
    linkURL: `/children/${child.id}/classes`
}));

const Home = (): React.ReactElement => {
    const user = useCurrentUser();
    const { getAccessTokenSilently } = useAuth0();
    const [{ children }, { set }] = useChildren();

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getChildren(user, token).then(children => set(children));
            });
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
