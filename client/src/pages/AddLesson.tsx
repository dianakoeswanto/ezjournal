import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import SimpleModal from "../component/SimpleModal";
import { DateTime } from "luxon";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { ILesson } from "../types/types";
import { useLessons } from "../store/lesson-store";

interface AddLessonProps {
    classId: string,
}

const AddLesson = (props: AddLessonProps): React.ReactElement => {
    const [open, setOpen] = useState(false);
    const [fields, setFields] = useState({
        time: DateTime.now().toFormat("yyyy-MM-dd"),
        positiveComments: '',
        additionalComments: '',
        improvements: '',
    })
    const [errors, setErrors] = useState({...fields, time: ''});
    const { getAccessTokenSilently } = useAuth0();
    const [_, { addLesson }] = useLessons();

    const addLessonForm = (
        <form autoComplete="off" noValidate>
            <p>
                <TextField 
                    required
                    fullWidth
                    name="lessonTime"
                    label="Lesson Date" 
                    variant="outlined" 
                    type="date"
                    defaultValue={fields.time}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    onChange={e => {setFields({...fields, time: e.target.value})}}
                    error={!!errors.time} 
                />
            </p>
            <p>
                <TextField 
                    required
                    fullWidth
                    multiline
                    name="positiveComments"
                    label="What did this student do well in?" 
                    variant="outlined" 
                    rows={5}
                    rowsMax={5}
                    onChange={e => {setFields({...fields, positiveComments: e.target.value})}}
                    error={!!errors.positiveComments} 
                />
            </p>
            <p>
                <TextField 
                    required
                    fullWidth
                    multiline
                    name="improvements"
                    label="What are some improvements that can be made?" 
                    variant="outlined" 
                    rows={5}
                    rowsMax={5}
                    onChange={e => {setFields({...fields, improvements: e.target.value})}}
                    error={!!errors.improvements} 
                />
            </p>
            <p>
                <TextField 
                    required
                    fullWidth
                    multiline
                    name="additionalComments"
                    label="Any other additional comments?" 
                    variant="outlined" 
                    rows={3}
                    rowsMax={5}
                    onChange={e => {setFields({...fields, additionalComments: e.target.value})}}
                    error={!!errors.additionalComments} 
                />
            </p>
        </form>
    )

    const resetErrors = () => {
        setErrors({
            time: '',
            positiveComments: '',
            improvements: '',
            additionalComments: ''
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

    const handleSubmit = async () => {
        if(isFormValid()) {
            const token = await getAccessTokenSilently();
            const response = await axios.post(`/api/classes/${props.classId}/lesson`, {...fields}, {
                headers: { Authorization: `Bearer ${token}` }
            });

            const { data: { newLesson }} = response;
            addLesson(newLesson)
            setOpen(false);
        }
    }

    return (
        <SimpleModal
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            title="Add Lesson"
            content={addLessonForm} 
            open={open}
            onSubmit={handleSubmit} />
    );
}

export default AddLesson;