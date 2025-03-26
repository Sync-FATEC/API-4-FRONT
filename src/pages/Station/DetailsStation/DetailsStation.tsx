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

export default function DetailsStation() {
  const id = useParams().id;
  const [station, setStation] = useState<ReadStationType | null>(null);
  const [activeTab, setActiveTab] = useState('details');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) {
      errorSwal("ID inválido");
      setLoading(false);
      return;
    }

    const handleReadStation = async () => {
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

    handleReadStation();
  }, [id]);

  const renderTabContent = () => {
    if (loading) {
      return <Loading />;
    }

    switch (activeTab) {
      case 'details':
        return station ? <DetailsStationTab station={station} /> : <div>Estação não encontrada</div>;
      case 'parameters':
        return station ? <TypeParameterTab station={station} /> : <div>Estação não encontrada</div>;
      case 'alerts':
        return <div>Conteúdo dos tipos de alertas</div>;
      default:
        return null;
    }
  };

  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-bg1">
        <div className="modal-admin-bg2">
            <div>
            <p className="modal-admin-title">Detalhes da estação {station?.uuid || 'Carregando...'} </p>
        </div>
        <div className="list-container">
            <div className="list-top-header">
                <div className="box-container">
                    <div 
                      className={`tabs-station ${activeTab === 'details' ? 'active' : ''}`}
                      onClick={() => setActiveTab('details')}
                    >
                      <p>Detalhes</p>
                    </div>
                    <div 
                      className={`tabs-station ${activeTab === 'parameters' ? 'active' : ''}`}
                      onClick={() => setActiveTab('parameters')}
                    >
                      <p>Tipos de parametros</p>
                    </div>
                    <div 
                      className={`tabs-station ${activeTab === 'alerts' ? 'active' : ''}`}
                      onClick={() => setActiveTab('alerts')}
                    >
                      <p>Tipos de alertas</p>
                    </div>
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
