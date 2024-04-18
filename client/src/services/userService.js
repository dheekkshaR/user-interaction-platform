import { REACT_APP_API_URL, api } from "./config";

const USER_API_URL = `${REACT_APP_API_URL}/user`;

const login = async (username, password) => {
    try {
        const res = await api.post(`${USER_API_URL}/loginUser`, {
            username,
            password,
        });

        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

const register = async (name, username, password, age, bio) => {
    try {
        const res = await api.post(`${USER_API_URL}/addNewUser`, {
            name,
            username,
            password,
            age,
            bio,
        });

        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

const getAllUsers = async () => {
    try {
        const res = await api.get(`${USER_API_URL}/getAllUsers`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

const editUserType = async (username, newType) => {
    try {
        const res = await api.post(`${USER_API_URL}/editUserType`, {
            username,
            newType,
        });

        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export { login, register, getAllUsers, editUserType };