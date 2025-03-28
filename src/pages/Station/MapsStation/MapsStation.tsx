import { useState, useEffect } from "react";
import { Aside } from "../../../components/aside/Aside";
import { ReadStationType } from "../../../types/station/ReadStationType";
import stationService from "../../../api/stationService";
import { MultiMaps } from "../../../components/Maps/MultiMaps";
import Loading from "../../../components/loading/loading";

export default function MapsStation() {
    const [stations, setStations] = useState<ReadStationType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStations = async () => {
            try {
              const response = await stationService.listStations();
              setStations(response.data.model);
            } catch (error) {
              console.error("Erro ao buscar estações:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStations();
    }, []);


    if (isLoading) {
        return <Loading />;
    }

  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-content">
        <div className="modal-admin-bg2">
          <div className="modal-admin-header">
            <p className="modal-admin-title">Localização das estações</p>
          </div>
          <div className="list-container">
            <MultiMaps stations={stations} />
          </div>
        </div>
      </div>
    </main>
  );
}
