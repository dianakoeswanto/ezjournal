import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild, IClass, IHomeData, IUser } from '../types/types';
import AddChild from './AddChild';
import { useChildren } from '../store/store';
import { useCurrentUser } from '../hooks/use-current-user';
import { useAuth0 } from '@auth0/auth0-react';

const transformChildren = (children: IChild[]): ListViewData[] => children.map((child) => ({
    id: child.id,
    displayName: `${child.firstname} ${child.lastname}`,
    linkURL: `/children/${child.id}/classes`
}));

const transformClasses = (classes: IClass[]): ListViewData[] => classes.map((klass) => ({
    id: klass._id,
    displayName: `${klass.student.firstname} ${klass.student.lastname} - ${klass.classDay} ${klass.classTime}`,
    linkURL: `/classes/${klass._id}/lessons`
}));

const getHomeData = async (userId: string, token: string): Promise<IHomeData> => {
    return (await axios.get(`/api/home/${userId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data as IHomeData;
}

const Home = (): React.ReactElement => {
    const user = useCurrentUser();
    const { getAccessTokenSilently } = useAuth0();
    const [{ children }, { set }] = useChildren();
    const [classes, setClasses] = useState<IClass[]>([]);
    let returnedUser: IUser = {id: '', email: '', name: ''};

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getHomeData(user.id, token)
                    .then(data => {
                        returnedUser = data.user;
                        console.log(returnedUser.isParent);
                        if(data.user.isParent) {
                            set(data.children as IChild[]);
                        } else {
                            setClasses(data.classes as IClass[])
                        }
                    })
            });
    }, []);
   
    return (
        <div>
            <ListView 
                title="My Children" 
                displayData={transformChildren(children)}
                addButton={<AddChild />}
            />
        </div>

        
    );
}

export default Home;
