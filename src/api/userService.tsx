import api from "./api";

const userService = {
    getDataUser: (id: string) => api.get(`/user/read/${id}`),
    editUser: (data: any) => api.put(`/user/update`, data),
};

export default userService;