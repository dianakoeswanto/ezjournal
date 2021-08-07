import express, { Router } from 'express';
import Class,{ IClass } from '../../models/Class';
import Lesson, { ILesson } from '../../models/Lesson';
import Student, { IStudent } from '../../models/Student';
import User, { IUser } from '../../models/User';
import { getCurrentUser } from '../util';

const classesRouter: Router = Router();

classesRouter.get('/', async(request, response) => {
    const studentId = request.query.student;
    if (!studentId) {
        response.status(400).send('Bad request: missing student id.');
        return;
    }

    const child: IStudent | null = await Student.findById(studentId);
    if(!child) {
        response.status(404).send(`Unable to find student with id ${studentId}`);
        return;
    }

    const classes: IClass[] = await Class.find({student: (studentId as string)}).populate("teacher");
    response.status(200).json({child, classes});
});

classesRouter.get('/:id/lessons', async(request, response) => {
    const classId: string = request.params.id;

    const auth0User = await getCurrentUser(request);
    const user: IUser | null = await User.findOne({ email: auth0User.email });
    const klass: IClass | null = await Class.findById(classId).populate("teacher").populate("student");
    const lessons: ILesson[] | [] = await Lesson.find({class: klass?._id});

    response.status(200).json({user, klass, lessons});
});

// classesRouter.post('/', async(request, response) => {
//     const { className, classTime, studentId, teacherId } = request.body;
//     //TODO check body

//     const teacher: IUser | null = await User.findById(teacherId);
//     const student: IStudent | null = await Student.findById(studentId);

//     const klass: IClass = new Class({className, classTime, student, teacher});
//     const newClass: IClass = await klass.save();
//     const allClasses: IClass[] = await Class.find().populate("student").populate("teacher");
    
//     response.status(200).json({newClass, allClasses});
// })


export default classesRouter;