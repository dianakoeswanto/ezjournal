import { TextField } from "@material-ui/core";
import axios from "axios";
import React, { useState } from "react";
import SimpleModal from "../component/SimpleModal";

const PARENT_ID = '60fcf0e89ceb9c9790b75e61';

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

    const handleSubmit = () => {
        if(isFormValid()) {
            axios.post('/api/children/', {...fields, parentId: PARENT_ID})
                .then(() => setOpen(false));
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