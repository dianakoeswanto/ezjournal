import { DateTime } from 'luxon';
export interface IChild {
    _id?: string, // Use this one if accessing the child from a class.
    id: string,
    displayName?: string,
    firstname: string,
    lastname: string,
    parent: string,
    classes: Array<IClass>
}

export interface IClass {
    _id: string;
    className: string;
    classDay: string;
    classTime: string;
    student: IChild;
    teacher: IUser;
}

export interface IUser {
    _id: string,
    email: string,
    name: string,
    isParent?: boolean,
}

export interface IHomeData {
    user: IUser,
    children: IChild[],
    classes: IClass[],
}

export interface ILesson {
    _id: String,
    time: DateTime,
    positiveComments: String,
    additionalComments?: String,
    class: IClass,
    improvements: String,
}

export interface StoreState {
    children: IChild[],
}
