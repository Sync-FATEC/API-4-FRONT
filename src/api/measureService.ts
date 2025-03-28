import api from "./api";

export const measureService = {
    deleteMeasure: (id: string) => api.delete(`/measure/delete/${id}`),
}