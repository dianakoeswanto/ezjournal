import {createStore, createHook, Action} from 'react-sweet-state';
import { IClass } from '../types/types';

interface StudentClassStore {
    studentClasses: IClass[],
}

const initialState: StudentClassStore = {
    studentClasses: [],
};

const actions = {
    set: (studentClasses: IClass[]): Action<StudentClassStore> =>
        ({ setState }) =>
            setState({ studentClasses }),
    add: (studentClass: IClass): Action<StudentClassStore> =>
        ({ setState, getState }) => {
            const { studentClasses } = getState();
            setState({ studentClasses: [...studentClasses, studentClass] })
        }
};

type Actions = typeof actions;
const Store = createStore<StudentClassStore, Actions>({
    initialState,
    actions,
    name: 'ezjournal-store',
});

export const useStudentClasses = createHook(Store);
