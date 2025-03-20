import api from "./api";
import { RegisterForm } from "../type/auth";

const authService = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),
};

export default authService;
