import { create } from "domain";
import api from "./api";
import { CreateStationType } from "../types/station/CreateStationType";
import UpdateStation from "../pages/Station/UpdateStation/UpdateStation";
import { UpdateStationType } from "../types/station/UpdateStationType";

const stationService = {
    readStation: (id: string) => api.get(`/station/read/${id}`),
    listStations: () => api.get("/station/list"),
    createStation: (station: CreateStationType) => api.post("/station/create", station),
    UpdateStation: (station: UpdateStationType) => api.put(`/station/update`, station),
    deleteStation: (id: string) => api.delete(`/station/delete/${id}`)
}

export default stationService