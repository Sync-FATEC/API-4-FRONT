import axios from "axios";
import { RegisterForm } from "../types/auth/auth";
import { create } from "domain";
import { CreateStationType } from "../types/station/CreateStationType";
import UpdateStation from "../pages/Station/UpdateStation/UpdateStation";
import { UpdateStationType } from "../types/station/UpdateStationType";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

export default api;
