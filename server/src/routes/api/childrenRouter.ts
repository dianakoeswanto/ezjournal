import { Router } from 'express';
import Class, { IClass } from '../../models/Class';
import Student, { IStudent } from '../../models/Student';
import User, { IUser } from '../../models/User';
import { getCurrentUser } from '../util';

const childrenRouter: Router = Router();

childrenRouter.get('/parent=:parent_id', async(request, response) => {
    const userId: string = request.params.parent_id;

    const children: IStudent[] = await Student.find({parent: userId});
    const result = children.map((child) => {
        return {
            id: child._id,
            displayName: `${child.firstname} ${child.lastname}`,
            firstname: child.firstname,
            lastname: child.lastname
        }
    })
    response.status(200).json({children: result});
});

childrenRouter.get('/:id', async(request, response) => {
    const id: string = request.params.id;

    const child: IStudent | null = await Student.findById(id).populate("classes");
    response.status(200).json(child);
});

childrenRouter.post('/', async(request, response) => {
    const auth0User = await getCurrentUser(request);
    const user: IUser | null = await User.findOne({ email: auth0User.email });
    if (!user) {
        response.status(401).json({ error: 'Unauthorized' });
        return;
    }

    const { firstname, lastname } = request.body;
    const child: IStudent = new Student({firstname, lastname, parent: user});
    const newChild: IStudent = await child.save();
    const allChildren: IStudent[] = await Student.find().populate("parent");
    
    response.status(200).json({newChild, allChildren});
})

childrenRouter.post('/classes', async(request, response) => {
    const { studentId, className, classDay, classTime, teacherName, teacherEmail } = request.body;
    const child: IStudent | null = await Student.findById(studentId);
    if(!child) {
        response.status(404).send(`Unable to find student with id ${studentId}`);
        return;
    }

    let teacher = await User.findOne({ email: teacherEmail });
    if (!teacher) {
        teacher = new User({name: teacherName, email: teacherEmail});
        await teacher.save();
    }

    const newClass: IClass = new Class({className, classDay, classTime, teacher, student: child});
    await newClass.save();

    child.classes.push(newClass._id);
    await child.save();

    response.status(200).json({newClass});
})


export default childrenRouter;