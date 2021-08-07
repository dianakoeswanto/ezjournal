import express, { Router } from "express";
import Class,{ IClass } from "../../models/Class";
import Lesson, { ILesson } from "../../models/Lesson";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";

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
    console.log("here")
    const classId: string = request.params.id;

    const klass: IClass | null = await Class.findById(classId).populate("teacher").populate("student");
    const lessons: ILesson[] | [] = await Lesson.find({class: klass?._id});

    response.status(200).json({klass, lessons});
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