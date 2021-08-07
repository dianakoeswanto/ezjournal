import {createStore, createHook, Action} from 'react-sweet-state';
import { ILesson } from '../types/types';

interface LessonStore {
    lessons: ILesson[],
}

const initialState: LessonStore = {
    lessons: [],
};

const actions = {
    setLessons: (lessons: ILesson[]): Action<LessonStore> =>
        ({ setState }) =>
            setState({ lessons }),
    addLesson: (lesson: ILesson): Action<LessonStore> =>
        ({ setState, getState }) => {
            const { lessons } = getState();
            setState({ lessons: [lesson, ...lessons] })
        }
};

type Actions = typeof actions;
const Store = createStore<LessonStore, Actions>({
    initialState,
    actions,
    name: 'ezjournal-store',
});

export const useLessons = createHook(Store);
