import express, { Router } from "express";
import Class,{ IClass } from "../../models/Class";
import Lesson, { ILesson } from "../../models/Lesson";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";
import { getCurrentUser } from '../util';
import { DateTime } from 'luxon';

const classesRouter: Router = Router();

classesRouter.get('/student=:student_id', async(request, response) => {
    const studentId: string = request.params.student_id;

    const child: IStudent | null = await Student.findById(studentId);
    if(!child) {
        response.status(400).send(`Unable to find student with id ${studentId}`);
    }
    
    const classes: IClass[] = await Class.find({student: studentId}).populate("teacher");
    response.status(200).json({child, classes});
});

classesRouter.get('/teacher=:teacher_id', async(request, response) => {
    const teacherId: string = request.params.teacher_id;

    const classes: IClass[] = await Class.find({teacher: teacherId});
    response.status(200).json({classes});
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


export default classesRouter;