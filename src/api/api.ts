import axios from "axios";
import { RegisterForm } from "../type/auth";

const api = axios.create({
  baseURL: "http://172.17.0.3:5000",
});

const links = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),
};

export { links };
export default api;
