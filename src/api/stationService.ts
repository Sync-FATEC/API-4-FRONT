import { create } from "domain";
import api from "./api";
import { CreateStationType } from "../types/station/CreateStationType";
import UpdateStation from "../pages/Station/UpdateStation/UpdateStation";
import { UpdateStationType } from "../types/station/UpdateStationType";

const stationService = {
    readStation: (id: string) => api.get(`/stations/read/${id}`),
    listStations: () => api.get("/stations/list"),
    createStation: (station: CreateStationType) => api.post("/stations/create", station),
    UpdateStation: (station: UpdateStationType) => api.put(`/stations/update`, station),
}

export default stationService