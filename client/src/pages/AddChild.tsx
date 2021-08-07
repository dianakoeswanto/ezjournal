import { TextField } from '@material-ui/core';
import axios, {AxiosResponse} from 'axios';
import React, { useState } from "react";
import SimpleModal from '../component/SimpleModal';
import { IChild, IClass } from '../types/types';
import { useChildren } from '../store/store';
import { useAuth0 } from "@auth0/auth0-react";

type AddChildResponse = {
    newChild: {
        _id: string,
        firstname: string,
        lastname: string,
        classes: object[],
        parent: {
            _id: string,
        },
    }
};

const AddChild = () : React.ReactElement => {
    const [fields, setFields] = useState({
        firstname: '',
        lastname: ''
    });
    const [errors, setErrors] = useState({
        firstname: null,
        lastname: null
    });
    const [open, setOpen] = useState(false);
    const [_, { add }] = useChildren();

    const { getAccessTokenSilently } = useAuth0();

    const resetErrors = () => {
        setErrors({
            firstname: null,
            lastname: null
        })
    }

    const addChild = (
        <form autoComplete="off" noValidate>
            <p>
                <TextField 
                    required
                    fullWidth
                    name="firstname"
                    label="Firstname" 
                    variant="outlined" 
                    onChange={e => {setFields({...fields, firstname: e.target.value})}}
                    error={!!errors.firstname} />
            </p>
            <p>
            <TextField 
                    required
                    fullWidth
                    name="lastname"
                    label="Lastname" 
                    variant="outlined" 
                    onChange={e => setFields({...fields, lastname: e.target.value})}
                    error={!!errors.lastname} />
            </p>
        </form>
    )

    const isFormValid = () : boolean => {
        resetErrors();
        let validationErrors = {}

        Object.entries(fields).map(([key, value]) => {
            if(!value) {
                validationErrors = {...validationErrors, [key] : "Required"};
            }
        });

        const isValid = Object.keys(validationErrors).length === 0
        if(!isValid) {
            setErrors((prevstate) => ({...prevstate, ...validationErrors}));
        }
        return isValid;
    }

    const handleSubmit = async () => {
        if(isFormValid()) {
            const token = await getAccessTokenSilently();
            const response = await axios.post<any, AxiosResponse<AddChildResponse>>('/api/children/', {...fields}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { data: { newChild }} = response;
            const child: IChild = {
                id: newChild._id,
                displayName: `${newChild.firstname} ${newChild.lastname}`,
                firstname: newChild.firstname,
                lastname: newChild.lastname,
                parent: newChild.parent._id,
                classes: newChild.classes as IClass[],
            }
            add(child);
            setOpen(false);
        }
    }

    return (
        <SimpleModal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            title="Add Child"
            content={addChild} 
            open={open}
            onSubmit={handleSubmit} />
      );
}

export default AddChild;