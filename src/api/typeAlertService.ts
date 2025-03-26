import { CreateTypeAlertType } from "../types/typeAlert/CreateTypeAlertType";
import { UpdateTypeAlertType } from "../types/typeAlert/UpdateTypeAlertType";
import api from "./api";

export const typeAlertService = {
    create: (data: CreateTypeAlertType) => api.post("/typeAlert/", data),
    update: (data: UpdateTypeAlertType) => api.put("/typeAlert/", data),
    read: (id: string) => api.get(`/typeAlert/${id}`),
    list: () => api.get("/typeAlert/"),
    deleteTypeAlert: (id: string) => api.delete(`/typeAlert/${id}`)
};
