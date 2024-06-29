import {CognitoUser, AuthenticationDetails, CognitoUserSession} from 'amazon-cognito-identity-js';
import { UserData } from './types';
import userpool from '../cognito/cognito';
import { post } from './api';

export const signup = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
        const userData: UserData = {
            email,
            password,
            given_name: firstName,
            family_name: lastName,
        };
        return await post('signup', userData, '');
    } catch (err) {
        return Promise.reject(err);
    }
}

export const login = (email: string, password: string): Promise<CognitoUserSession> => {
    return new Promise((resolve, reject) => {
        const user = new CognitoUser({
            Username: email,
            Pool: userpool,
        });

        const authDetails = new AuthenticationDetails({
            Username: email,
            Password: password,
        });

        user.authenticateUser(authDetails, {
            onSuccess: (result) => {
                console.log('Login success');
                resolve(result);
            },
            onFailure: (err) => {
                console.log("Login Failed", err);
                reject(err);
            }
        });
    });
}

export const logout = () => {
    const user = userpool.getCurrentUser();
    user?.signOut();
    window.location.href = '/';
}