import axios from "axios";
import config from "../config/config";

const getHeaders = (idToken: string) => {
    return {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${idToken}`,
    }
}

export const get = async <T>(url: string, idToken: string): Promise<T> => {
    try {
        const headers = getHeaders(idToken);
        return await axios.get(config.ApiUrl + url, { headers });
    } catch (err) {
        return Promise.reject(err);
    }
};

export const post = async (url: string, body: object, idToken: string) => {
    try {
        const headers = getHeaders(idToken);
        return axios.post(config.ApiUrl + url, body, { headers });
    } catch (err) {
        return Promise.reject(err);
    }
}