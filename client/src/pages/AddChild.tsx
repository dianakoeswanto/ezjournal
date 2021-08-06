import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import SimpleModal from "../component/SimpleModal";

const PARENT_ID = '60fcf0e89ceb9c9790b75e61';
interface AddChildProps {
    open: boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AddChild = (props: AddChildProps) : React.ReactElement => {
    const [fields, setFields] = useState({
        firstname: '',
        lastname: ''
    })
    const [errors, setErrors] = useState({
        firstname: null,
        lastname: null
    })

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
            const result = await axios.post('/api/children/', {...fields, parentId: PARENT_ID});
            handleClose()
        }
    }

    const handleClose = () => {
        resetErrors();
        console.log('handle close');
        props.setOpen(false);
    }

    return (
        <SimpleModal 
            title="Add Child" 
            content={addChild} 
            open={props.open} 
            onSubmit={handleSubmit}
            onClose={handleClose} />
      );
}

export default AddChild;