import express, { Router } from "express";
import Class,{ IClass } from "../../models/Class";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";

const classesRouter: Router = Router();

classesRouter.get('/student=:student_id', async(request, response) => {
    const studentId: string = request.params.student_id;
    console.log("Getting classes for user id ", studentId);

    const student: IStudent | null = await Student.findById(studentId).populate("classes");
    response.status(200).json({classes: student?.classes});
});

classesRouter.get('/teacher=:teacher_id', async(request, response) => {
    const teacherId: string = request.params.teacher_id;
    console.log("Getting classes for user id ", teacherId);

    const classes: IClass[] = await Class.find({teacher: teacherId});
    response.status(200).json({classes});
});

classesRouter.post('/', async(request, response) => {
    //get user id from param
    //Check if teacher / parent
    //if parent, get classname, class time, teacher name, teacher email
        //save class
    
    //if teacher, get classname, class time, student name, parent name, parent email
        //save class
})

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