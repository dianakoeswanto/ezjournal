import { Request } from 'express-serve-static-core';
import axios from 'axios';

export interface Auth0User {
    firstname: string,
    lastname: string,
    email: string,
};

export const getCurrentUser = async (request: Request): Promise<Auth0User> => {
    const {data: user} = await axios.get('https://ezjournal.au.auth0.com/userinfo', {
        headers: {
            Authorization: `${request.header('Authorization')}`
        },
    });

    return {
        email: user.email,
        firstname: user.given_name,
        lastname: user.family_name,
    };
};
