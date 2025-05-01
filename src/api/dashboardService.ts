import api from './api';

export interface DashboardFilters {
  date?: string;
  startDate?: string;
  endDate?: string;
}

const dashboardService = {
  getDashboard: (stationId: string) => api.get(`/dashboard/public/${stationId}`),
  listDashboard: (stationId: string, startDate: string, endDate: string) =>
    api.get('/dashboard/list', {
      params: { stationId, startDate, endDate },
    }),
};

export default dashboardService;
