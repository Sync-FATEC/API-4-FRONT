import api from './api';

export interface DashboardFilters {
  date?: string;
  startDate?: string;
  endDate?: string;
}

const dashboardService = {
  getDashboard: (filters?: DashboardFilters) => api.get('/dashboard/public'),
  listDashboard: (filters?: DashboardFilters) =>
    api.get('/dashboard/list', {
      params: filters,
    }),
};

export default dashboardService;
