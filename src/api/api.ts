import axios from "axios";
import { RegisterForm } from "../types/auth/auth";
import { create } from "domain";
import { CreateStationType } from "../types/station/CreateStationType";
import UpdateStation from "../pages/Station/UpdateStation/UpdateStation";
import { UpdateStationType } from "../types/station/UpdateStationType";

const api = axios.create({
  baseURL: "http://localhost:5000",
});

const links = {
  registerUser: (registerForm: RegisterForm) => api.post("/auth/register", registerForm),

  // STATION

  createStation: (createStation: CreateStationType) => api.post("/station/create", createStation),
  UpdateStation: (updateStation: UpdateStationType) => api.put("/station/update", updateStation),
  readStation: (id: string) => api.get("/station/read/" + id),
};

export { links };
export default api;
