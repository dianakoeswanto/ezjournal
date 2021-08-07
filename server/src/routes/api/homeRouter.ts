import { Router } from 'express';
import Class, { IClass } from '../../models/Class';
import Student, { IStudent } from '../../models/Student';
import User, { IUser } from '../../models/User';
import { getCurrentUser } from '../util';

const homeRouter: Router = Router();

homeRouter.get('/', async(request, response) => {
    const auth0User = await getCurrentUser(request); // Get user info from auth0.

    let user: IUser | null = await User.findOne({ email: auth0User.email }); // Map auth0 user to *our* user
    if (user) {
        if(!user.name) {
            // Partially created user, likely created when a new class is created and we couldn't find an existing user with
            // matching email.
            user.name = `${auth0User.firstname} ${auth0User.lastname}`;
            await user.save();
        }
    } else {
        user = await User.create({
            email: auth0User.email,
            name: `${auth0User.firstname} ${auth0User.lastname}`,
        });
    }

    // Now we have a user, find children and classes related to the user.
    const children: IStudent[] = await Student.find({parent: user!.id});
    const transformedChildren = children.map((child) => {
        return {
            id: child._id,
            displayName: `${child.firstname} ${child.lastname}`,
            firstname: child.firstname,
            lastname: child.lastname
        };
    });
    const classes: IClass[] = await Class.find({teacher: user!.id}).populate("student");

    response.status(200).json({user, children: transformedChildren, classes});
});

export default homeRouter;