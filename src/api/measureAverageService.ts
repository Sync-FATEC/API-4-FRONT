import api from "./api";

export const measureAverageService = {
    getMeasureAverageLast7Days: (stationId: string) => api.get(`/measureAverage/public/${stationId}`),
    getMeasureAverageDate: (stationId: string, date: string) => api.get(`/measureAverage/${stationId}/${date}`),
    getMeasureAverageBetweenDates: (stationId: string, startDate: string, endDate: string) => api.get(`/measureAverage/${stationId}/${startDate}/${endDate}`),
}
