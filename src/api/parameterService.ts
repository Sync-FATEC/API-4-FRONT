import api from "./api";

export const parameterService = {
    createParameter: (idStation: string, idTypeParameter: string) => api.post("/parameter/create", {idStation, idTypeParameter}),
    deleteParameter: (id: string) => api.delete(`/parameter/delete/${id}`)
}