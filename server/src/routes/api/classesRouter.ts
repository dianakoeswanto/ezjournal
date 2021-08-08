import express, { Router } from 'express';
import Class,{ IClass } from '../../models/Class';
import Lesson, { ILesson } from '../../models/Lesson';
import Student, { IStudent } from '../../models/Student';
import User, { IUser } from '../../models/User';
import { getCurrentUser } from '../util';
import { DateTime } from 'luxon';

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
    const lessons: ILesson[] | [] = await Lesson.find({class: klass?._id}).sort({time: -1});

    response.status(200).json({user, klass, lessons});
});

classesRouter.post('/:class_id/lesson', async(request, response) => {
    const { time, positiveComments, additionalComments, improvements } = request.body;
    const classId = request.params.class_id;
    //TODO check body

    const klass: IClass | null = await Class.findById(classId);
    const lesson: ILesson = new Lesson({
            time: DateTime.fromFormat(time, "yyyy-MM-dd", {locale: "en-AU"}),
            positiveComments,
            additionalComments,
            improvements,
            class: klass,
    });
    const newLesson = await (await lesson.save()).populate("class");
    response.status(200).json({newLesson});
})

classesRouter.get('/:class_id/lessons/:lesson_id', async(request, response) => {
    const lessonId = request.params.lesson_id;
    const classId = request.params.class_id;
    //TODO check body

    const auth0User = await getCurrentUser(request);
    const user: IUser | null = await User.findOne({ email: auth0User.email });

    const klass: IClass | null = await Class.findById(classId).populate("student").populate("teacher");
    const lesson: ILesson | null = await Lesson.findById(lessonId);
    response.status(200).json({user, klass, lesson});
})


export default classesRouter;