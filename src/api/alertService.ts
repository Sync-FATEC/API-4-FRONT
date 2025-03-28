import api from './api';

export const alertService = {
    deleteAlert: (id: string) => api.delete(`/alert/delete/${id}`),
}