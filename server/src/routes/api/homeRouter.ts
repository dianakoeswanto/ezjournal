import { Router } from "express";
import Class, { IClass } from "../../models/Class";
import Student, { IStudent } from "../../models/Student";
import User, { IUser } from "../../models/User";

const homeRouter: Router = Router();

homeRouter.get('/:user_id', async(request, response) => {
    const userId: string = request.params.user_id;

    const user: IUser | null = await User.findById(userId);
    if(!user) {
        response.status(400).send(`Unable to find user with id ${userId}`);
    }

    if(user!.isParent) {
        const children: IStudent[] = await Student.find({parent: user!.id});
        const result = children.map((child) => {
            return {
                id: child._id,
                displayName: `${child.firstname} ${child.lastname}`,
                firstname: child.firstname,
                lastname: child.lastname
            }
        })
        response.status(200).json({user, children: result});
    } else {
        const classes: IClass[] = await Class.find({teacher: user!.id}).populate("student");
        response.status(200).json({user, classes})
    }
});

export default homeRouter;