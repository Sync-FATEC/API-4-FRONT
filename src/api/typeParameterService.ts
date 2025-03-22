import { CreateTypeParameterType } from "../types/TypeParameter/CreateTypeParameter";
import { UpdateTypeParameterType } from "../types/TypeParameter/UpdateTypeParameter";
import api from "./api";

export const typeParameterService = {
    createTypeParameter: (typeParameter: CreateTypeParameterType) => api.post("/typeParameter/create", typeParameter), 
    updateTypeParameter: (typeParameter: UpdateTypeParameterType) => api.put("/typeParameter/update", typeParameter),
    deleteTypeParameter: (id: string) => api.delete(`/typeParameter/delete/${id}`),
    readTypeParameter: (id: string) => api.get(`/typeParameter/read/${id}`),
    listTypeParameters: () => api.get("/typeParameter/list"),
}