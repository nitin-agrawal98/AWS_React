import {CognitoUserPool} from 'amazon-cognito-identity-js';
import config from '../config/config';
const cognito = {
    ClientId: config.ClientId,
    UserPoolId: config.UserPoolId,
}
export default new CognitoUserPool(cognito);