import {createStore, createHook, Action} from 'react-sweet-state';
import { IClass } from '../types/types';

interface ChildClassStore {
    childClasses: IClass[],
}

const initialState: ChildClassStore = {
    childClasses: [],
};

const actions = {
    set: (childClasses: IClass[]): Action<ChildClassStore> =>
        ({ setState }) =>
            setState({ childClasses }),
    add: (childClass: IClass): Action<ChildClassStore> =>
        ({ setState, getState }) => {
            const { childClasses } = getState();
            setState({ childClasses: [...childClasses, childClass] })
        }
};

type Actions = typeof actions;
const Store = createStore<ChildClassStore, Actions>({
    initialState,
    actions,
    name: 'ezjournal-store',
});

export const useChildClasses = createHook(Store);
