import axios from 'axios';
import { ReactElement, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ListView from '../component/ListView';
import { useChildClasses } from '../store/child-class-store';
import { IChild, IClass } from '../types/types';
import AddClass from './AddClass';
import { useAuth0 } from '@auth0/auth0-react';
import MenuBookIcon from '@material-ui/icons/MenuBook';

const getChildWithClasses = async (studentId: string, token: string): Promise<{child: IChild, classes: IClass[]}> => {
    const {data : {child, classes}} = await axios.get(`/api/classes?student=${studentId}`, {
        headers: { Authorization: `Bearer ${token}` }
    });
    return {child, classes};
}

const transformClasses = (classes: IClass[]) => classes.map((klass) => ({
        id: klass._id,
        displayName: `${klass.className} with ${klass.teacher?.name} - ${klass.classDay} ${klass.classTime}`,
        linkURL: `classes/${klass._id}/lessons`
}))

const ChildClasses = () : ReactElement => {
    const { id } = useParams<{ id: string }>();
    const [title, setTitle] = useState<string>('Classes');
    const [{childClasses}, {set}] = useChildClasses();
    const { getAccessTokenSilently } = useAuth0();
    const [isLoading, setLoading] = useState(true);

    // @ts-ignore
    useEffect(async () => {
        const token = await getAccessTokenSilently();
        const { child, classes } = await getChildWithClasses(id, token);
        setTitle(`${child.firstname}'s Classes`);
        set(classes);
        setLoading(false);
    }, []);

    return (
        <ListView 
            title={title} 
            displayData={transformClasses(childClasses)} 
            addButton={<AddClass studentId={id} />}
            avatarIcon={<MenuBookIcon />}
            isLoading={isLoading}
        />
    )
}

export default ChildClasses;