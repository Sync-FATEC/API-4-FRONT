import api from "./api";

const dashboardService = {
    listDashboard: () => api.get("/dashboard/list"),
  
}

export default dashboardService