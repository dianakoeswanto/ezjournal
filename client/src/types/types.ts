export interface IChild {
    id: string,
    displayName: string,
    parent: string,
    classes: Array<Object>
}

export interface IClass {
    id: string;
    className: string;
    classTime: Date;
    student: Object;
    teacher: Object;
}
