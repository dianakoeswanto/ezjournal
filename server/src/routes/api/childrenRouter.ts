import express, { Router } from "express";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";

const childrenRouter: Router = Router();

childrenRouter.get('/parent=:parent_id', async(request, response) => {
    const userId: string = request.params.parent_id;
    console.log("Getting children for user id ", userId);

    const children: IStudent[] = await Student.find({parent: userId});
    console.log(children);
    const result = children.map((child) => {
        return {
            id: child._id,
            displayName: `${child.firstname} ${child.lastname}`,
            parent: child.parent,
            classes: child.classes,
        }
    })
    response.status(200).json({result});
});

childrenRouter.get('/:id', async(request, response) => {
    const id: string = request.params.id;
    console.log("Getting children with id", id);

    const child: IStudent | null = await Student.findById(id).populate("classes");
    console.log(child);
    // const result = children.map((child) => {
    //     return {
    //         id: child._id,
    //         displayName: `${child.firstname} ${child.lastname}`,
    //         parent: child.parent,
    //         classes: child.classes,
    //     }
    // })
    response.status(200).json(child);
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