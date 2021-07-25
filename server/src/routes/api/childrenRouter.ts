import express, { Router } from "express";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";

const childrenRouter: Router = Router();

childrenRouter.get('/parent=:parent_id', async(request, response) => {
    const userId: string = request.params.parent_id;
    console.log("Getting children for user id ", userId);

    const children: IStudent[] = await Student.find({parent: userId});
    response.status(200).json({children});
});

childrenRouter.post('/', async(request, response) => {
    const { firstname, lastname, parentId } = request.body;
    //todo check if all body are passed in

    const user: IUser | null = await User.findById(parentId);
    const child: IStudent = new Student({firstname, lastname, parent: user});
    const newChild: IStudent = await child.save();
    const allChildren: IStudent[] = await Student.find().populate("parent");
    response.status(200).json({newChild, allChildren});
})


export default childrenRouter;