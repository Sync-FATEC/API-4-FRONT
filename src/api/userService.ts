import { create } from "domain";
import api from "./api";

const userService = {
    getDataUser: (id: string) => api.get(`/user/read/${id}`),
    editUser: (data: any) => api.put(`/user/update`, data),
    registerUser: (data: any) => api.post(`/auth/register`, data),
    ListClients: () => api.get(`/user/list`),
    deleteUser: (id: string) => api.delete(`/user/delete/${id}`),
    createPassword: (data: any) => api.post(`/auth/createpassword`, data),
};

export default userService;