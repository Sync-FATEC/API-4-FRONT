import api from "./api";

const userService = {
  getDataUser: (id: string) => api.get(`/user/read/${id}`),
};

export default userService;