import { FormControl, makeStyles, MenuItem, TextField } from "@material-ui/core";
import axios from "axios";
import { ReactElement, useState } from "react";
import { useParams } from "react-router-dom";
import SimpleModal from "../component/SimpleModal";

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const useStyles = makeStyles({
    leftFormControl: {
        width: '49%',
    },
    rightFormControl: {
        width: '49%',
        float: 'right'
    }
});

const AddClass = (): ReactElement => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState({
        className: '',
        classDay: '',
        classTime: '',
        teacherName: '',
        teacherEmail: ''
    });

    const[errors, setErrors] = useState({...fields})
    
    const resetErrors = () => {
        setErrors({
            className: '',
            classDay: '',
            classTime: '',
            teacherName: '',
            teacherEmail: ''
        })
    }

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


    const addClassForm = (
        <form autoComplete="off" noValidate>
            <p>
                <TextField 
                    required
                    fullWidth
                    name="classname"
                    label="Class name" 
                    variant="outlined" 
                    onChange={e => {setFields({...fields, className: e.target.value})}}
                    error={!!errors.className} 
                />
            </p>
            <p>
                <FormControl variant="filled" className={classes.leftFormControl}>
                    <TextField
                        required
                        select
                        id="classDay"
                        label="Day of class"
                        value={fields.classDay}
                        variant="outlined"
                        onChange={e => {setFields({...fields, classDay: e.target.value})}}
                        error={!!errors.classDay} >
                            {
                                days.map(day => (
                                    <MenuItem key={day} value={day}>{day}</MenuItem>
                                ))
                            }
                    </TextField>
                </FormControl>
                <FormControl variant="filled" className={classes.rightFormControl}>
                    <TextField
                        required
                        id="classTime"
                        label="Time of class"
                        type="time" 
                        variant="outlined"
                        defaultValue='09:00'
                        onChange={e => {setFields({...fields, classTime: e.target.value})}}
                        error={!!errors.classTime} />
                </FormControl>
            </p>
            <p>
                <FormControl variant="filled" className={classes.leftFormControl}>
                    <TextField
                        required
                        id="teacherName"
                        label="Teacher's name"
                        variant="outlined"
                        onChange={e => {setFields({...fields, teacherName: e.target.value})}}
                        error={!!errors.teacherName} />
                </FormControl>
                <FormControl variant="filled" className={classes.rightFormControl}>
                    <TextField
                        required
                        id="teacherEmail"
                        label="Teacher's email"
                        onChange={e => {setFields({...fields, teacherEmail: e.target.value})}}
                        error={!!errors.teacherEmail}
                        variant="outlined" />
                </FormControl>
            </p>
        </form>
    );

    const handleSubmit = () => {
        // if(isFormValid()) {
        //     console.log("Form valid, submitting");
        //     axios.post('/api/children/classes', {...fields, studentId: id})
        //         .then(() => setOpen(false));
        // }
    }

    return (
        <SimpleModal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            title="Add Child"
            content={addClassForm} 
            open={open}
            onSubmit={handleSubmit} />
      );
}

export default AddClass;