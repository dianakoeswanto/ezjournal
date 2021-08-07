import {createStore, createHook, Action} from 'react-sweet-state';
import { IClass, ILesson } from '../types/types';

interface LessonStore {
    lessons: ILesson[],
}

const initialState: LessonStore = {
    lessons: [],
};

const actions = {
    set: (lessons: ILesson[]): Action<LessonStore> =>
        ({ setState }) =>
            setState({ lessons }),
    add: (lesson: ILesson): Action<LessonStore> =>
        ({ setState, getState }) => {
            const { lessons } = getState();
            setState({ lessons: [...lessons, lesson] })
        }
};

type Actions = typeof actions;
const Store = createStore<LessonStore, Actions>({
    initialState,
    actions,
    name: 'ezjournal-store',
});

export const useLessons = createHook(Store);
