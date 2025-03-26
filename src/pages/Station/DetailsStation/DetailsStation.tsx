import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stationService from "../../../api/stationService";
import { errorSwal } from "../../../components/swal/errorSwal";
import { ReadStationType } from "../../../types/station/ReadStationType";
import { Aside } from "../../../components/aside/Aside";
import './DetailsStation.css'
import DetailsStationTab from "../../../components/TabsStation/DetailsStationTab/DetailsStationTab";
import TypeParameterTab from "../../../components/TabsStation/TypeParameterTab/TypeParameterTab";
import Loading from "../../../components/loading/loading";
import TypeAlertTab from "../../../components/TabsStation/typeAlertTab/TypeAlertTab";

export default function DetailsStation() {
  const id = useParams().id;
  const [station, setStation] = useState<ReadStationType | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);

  const handleReadStation = async () => {
    if (!id) {
      errorSwal("ID inválido");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await stationService.readStation(id as string);
      setStation(response.data.model);
    } catch (error) {
      errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleReadStation();
  }, [id]);

  useEffect(() => {
    handleReadStation();
  }, [activeTab]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: 'details', label: 'Detalhes' },
    { id: 'parameters', label: 'Tipos de parâmetros' },
    { id: 'alerts', label: 'Tipos de alertas' }
  ];

  const renderTabContent = () => {
    if (loading) {
      return (
        <div className="loading">
          <Loading />
        </div>
      );
    }

    if (!station) {
      return (
        <div className="loading">
          Estação não encontrada
        </div>
      );
    }

    switch (activeTab) {
      case 'details':
        return <DetailsStationTab station={station} />;
      case 'parameters':
        return (
          <TypeParameterTab 
            station={station} 
            onUpdateStation={handleReadStation}
          />
        );
      case 'alerts':
        return (
          <TypeAlertTab 
            station={station}
            onUpdateStation={handleReadStation}
          />
        );
      default:
        return null;
    }
  };

  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-content">
        <div className="modal-admin-bg2">
          <div className="details-station-header">
            <h1 className="details-station-title">
              Detalhes da estação {station?.uuid || 'Carregando...'}
            </h1>
          </div>
          
          <div className="list-container">
            <div className="list-top-header">
              <div className="box-container">
                {tabs.map(tab => (
                  <div 
                    key={tab.id}
                    className={`tabs-station ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <p>{tab.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="tab-content">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
