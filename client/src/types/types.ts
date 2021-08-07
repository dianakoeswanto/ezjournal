export interface IChild {
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
    id: string,
    email: string,
    name: string,
}

export interface StoreState {
    children: IChild[],
}
