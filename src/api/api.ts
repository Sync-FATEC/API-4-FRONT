import axios from "axios";
import { RegisterForm } from "../type/auth";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;
