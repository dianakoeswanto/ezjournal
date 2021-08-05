import { TextField } from "@material-ui/core";
import React, { useState } from "react";
import SimpleModal from "../component/SimpleModal";

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

    const isFormValid = () : boolean => {
        resetErrors();
        let validationErrors = {}

        if(!fields.firstname) {
            validationErrors = {...validationErrors, firstname: 'Required'};
        }
        
        if(!fields.lastname) {
            validationErrors = {...validationErrors, lastname: 'Required'};
        }

        const isValid = Object.keys(validationErrors).length === 0
        if(!isValid) {
            setErrors((prevstate) => ({...prevstate, ...validationErrors}));
        }
        return isValid;
    }

    
    const handleSubmit = () => {
        if(isFormValid()) {
            console.log('submitting');
            handleClose()
        }
    }

    const handleClose = () => {
        resetErrors();
        props.setOpen(false);
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

    return (
        <SimpleModal 
            title="Add Child" 
            content={addChild} 
            open={props.open} 
            setOpen={props.setOpen}
            onSubmit={handleSubmit}
            onClose={handleClose} />
      );
}

export default AddChild;