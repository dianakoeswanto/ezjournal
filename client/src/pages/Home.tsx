import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ListView, { ListViewData } from '../component/ListView';
import { IChild, IClass, IHomeData } from '../types/types';
import AddChild from './AddChild';
import { useChildren } from '../store/store';
import { useAuth0 } from '@auth0/auth0-react';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

const breadcrumbs = [{
    label: 'Home',
    to: '/',
    Icon: HomeIcon,
}];

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

const getHomeData = async (token: string): Promise<IHomeData> => {
    return (await axios.get(`/api/home`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })).data as IHomeData;
}

const Home = (): React.ReactElement => {
    const { getAccessTokenSilently } = useAuth0();
    const [{ children }, { set }] = useChildren();
    const [classes, setClasses] = useState<IClass[]>([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getAccessTokenSilently()
            .then((token) => {
                getHomeData(token)
                    .then(data => {
                            set(data.children);
                            setClasses(data.classes)
                        setLoading(false);
                        }
                    )
            });
    }, []);

    return (
        <div>
            {
                children.length === 0 && classes.length !== 0 ? (
                    <ListView
                        title="My Classes"
                        displayData={transformClasses(classes)}
                        avatarIcon={<MenuBookIcon />}
                        isLoading={isLoading}
                        breadcrumbs={breadcrumbs}
                    />
                ) : (
                    <ListView
                        title="My Children"
                        displayData={transformChildren(children)}
                        addButton={<AddChild />}
                        isLoading={isLoading}
                        breadcrumbs={breadcrumbs}
                    />
                )
            }
        </div>
    );
}

export default Home;
