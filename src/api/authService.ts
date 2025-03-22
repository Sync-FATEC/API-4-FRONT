import { RegisterForm } from "../types/auth/auth";
import api from "./api";

const authService = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),
};

export default authService;
