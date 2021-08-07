import {createStore, createHook, Action} from 'react-sweet-state';
import { IChild, StoreState } from '../types/types';

const initialState: StoreState = {
    children: [],
};

const actions = {
    set: (children: IChild[]): Action<StoreState> =>
        ({ setState }) =>
            setState({ children }),
    add: (child: IChild): Action<StoreState> =>
        ({ setState, getState }) => {
            const { children } = getState();
            setState({ children: [...children, child] })
        }
};

type Actions = typeof actions;
const Store = createStore<StoreState, Actions>({
    initialState,
    actions,
    name: 'ezjournal-store',
});

export const useChildren = createHook(Store);

const getChildById = (state: StoreState, childId: string) => ({
    child: state.children.find((child: IChild) => child.id === childId),
})
export const useChild = createHook(Store, {
    selector: getChildById,
})
