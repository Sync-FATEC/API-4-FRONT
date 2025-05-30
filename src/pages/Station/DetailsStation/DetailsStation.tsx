import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import stationService from "../../../api/stationService";
import { errorSwal } from "../../../components/swal/errorSwal";
import { ReadStationType } from "../../../types/station/ReadStationType";
import { Aside } from "../../../components/aside/Aside";
import "./DetailsStation.css";
import DetailsStationTab from "../../../components/TabsStation/DetailsStationTab/DetailsStationTab";
import TypeParameterTab from "../../../components/TabsStation/TypeParameterTab/TypeParameterTab";
import Loading from "../../../components/loading/loading";
import TypeAlertTab from "../../../components/TabsStation/typeAlertTab/TypeAlertTab";
import AlertTab from "../../../components/TabsStation/alertTab/AlertTab";
import MeasureTab from "../../../components/TabsStation/measureTab/MeasureTab";
import axios from "axios";
import { successSwal } from "../../../components/swal/sucessSwal";
import api from "../../../api/api";
import DashboardTab from "../../../components/TabsStation/dashboardTab/dashboardTab";
import MeasureAverageTab from "../../../components/TabsStation/measureAverageTab/measureAverageTab";
import { AuthContext } from "../../../contexts/auth/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRss } from "@fortawesome/free-solid-svg-icons";
import { downloadPdf } from "../../../utils/downloadPdf";
export default function DetailsStation() {
  const id = useParams().id;
  const [station, setStation] = useState<ReadStationType | null>(null);
  const [activeTab, setActiveTab] = useState("details");
  const [loading, setLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [email, setEmail] = useState("");
  const authContext = useContext(AuthContext);

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
    { id: "details", label: "Detalhes" },
    { id: "parameters", label: "Tipos de parâmetros" },
    { id: "typeAlerts", label: "Tipos de alertas" },
    { id: "alerts", label: "Alertas" },
    { id: "measures", label: "Medições" },
    { id: "measureAverage", label: "Médias de medições" },
    { id: "dashboard", label: "Dashboard" },
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
      return <div className="loading">Estação não encontrada</div>;
    }

    switch (activeTab) {
      case "details":
        return <DetailsStationTab station={station} />;
      case "parameters":
        return (
          <TypeParameterTab
            station={station}
            onUpdateStation={handleReadStation}
          />
        );
      case "typeAlerts":
        return (
          <TypeAlertTab station={station} onUpdateStation={handleReadStation} />
        );
      case "alerts":
        return (
          <AlertTab station={station} onUpdateStation={handleReadStation} />
        );
      case "measures":
        return (
          <MeasureTab station={station} onUpdateStation={handleReadStation} />
        );
      case "dashboard":
        return (
          <DashboardTab station={station} onUpdateStation={handleReadStation} />
        );
      case "measureAverage":
        return (
          <MeasureAverageTab
            station={station}
            onUpdateStation={handleReadStation}
          />
        );
      default:
        return null;
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/emailStation/create", {
        email,
        stationId: id,
      });
      successSwal("E-mail cadastrado com sucesso!");
      setShowEmailModal(false);
      setEmail("");
    } catch (error) {
      errorSwal(
        (error as any)?.response?.data?.error || "Erro ao cadastrar e-mail"
      );
    }
  };

  const handleGeneratePdf = async () => {
    try {
      let response = await api.post(
        "/station/generate-report",
        { id: station?.id },
        { responseType: "arraybuffer" }
      );
      downloadPdf(response.data, station?.name ?? "Relatório");
    } catch (error) {
      errorSwal(
        (error as any)?.response?.data?.error || "Erro ao gerar PDF"
      );
    }
  };

  return (
    <main className="modal-admin">
      <Aside />
      <div className="modal-admin-content">
        <div className="modal-admin-bg2">
          <div className="details-station-header">
            <div className="details-station-header-icon">

              <FontAwesomeIcon icon={faRss} className="details-station-icon" />
              <h1 className="details-station-title">
                Detalhes da estação {station?.uuid || "Carregando..."}
                <div>
                  <p className="name-station">
                    {station?.name || "Carregando..."}
                  </p>
                </div>
              </h1>
            </div>
            <div className="details-station-header-buttons">
              {!authContext.isAuthenticated && (
                <button
                  className="btn-register-email"
                  onClick={() => setShowEmailModal(true)}
                >
                  Cadastrar E-mail para receber alertas
                </button>
              )}

              <button
                className="btn-pdf"
                onClick={() => handleGeneratePdf()}
              >
                Gerar pdf
              </button>
            </div>
          </div>

          {/* Email Modal */}
          {showEmailModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <h2>Cadastrar E-mail</h2>
                <form onSubmit={handleEmailSubmit}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite o e-mail"
                    required
                  />
                  <div className="modal-buttons">
                    <button
                      type="button"
                      onClick={() => setShowEmailModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit">Cadastrar</button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="list-container">
            <div className="list-top-header">
              <div className="box-container">
                {tabs.map((tab) => (
                  <div
                    key={tab.id}
                    className={`tabs-station ${activeTab === tab.id ? "active" : ""
                      }`}
                    onClick={() => handleTabChange(tab.id)}
                  >
                    <p>{tab.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="tab-content">{renderTabContent()}</div>
          </div>
        </div>
      </div>
    </main>
  );
}
