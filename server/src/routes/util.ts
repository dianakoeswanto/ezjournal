import { Request } from 'express-serve-static-core';
import axios from 'axios';

export interface Auth0User {
    firstname: string,
    lastname: string,
    email: string,
};

const userInfoCache = new Map();
export const getCurrentUser = async (request: Request): Promise<Auth0User> => {
    // @ts-ignore
    const cachedUser = userInfoCache.get(request.user.sub);
    if (cachedUser) {
        console.log('User info cache hit!');
        return {
            email: cachedUser.email,
            firstname: cachedUser.given_name,
            lastname: cachedUser.family_name,
        };
    }

    console.log('User info cache missed!');
    const {data: user} = await axios.get('https://ezjournal.au.auth0.com/userinfo', {
        headers: {
            Authorization: `${request.header('Authorization')}`
        },
    });

    // @ts-ignore
    userInfoCache.set(request.user.sub, user);
    return {
        email: user.email,
        firstname: user.given_name,
        lastname: user.family_name,
    };
};
