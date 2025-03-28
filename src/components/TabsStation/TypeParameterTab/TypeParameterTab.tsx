import { useContext, useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import { ReadTypeParameterType } from "../../../types/TypeParameter/ReadTypeParameter";
import { typeParameterService } from "../../../api/typeParameterService";
import { parameterService } from "../../../api/parameterService";
import '../shared/TabStyles.css';
import { errorSwal } from "../../swal/errorSwal";
import { AuthContext } from "../../../contexts/auth/AuthContext";

interface TypeParameterTabProps {
    station: ReadStationType;
    onUpdateStation: () => void;
}

export default function TypeParameterTab({station, onUpdateStation}: TypeParameterTabProps) {
    const [typeParameters, setTypeParameters] = useState<ReadTypeParameterType[]>([]);
    const [selectedTypeParameter, setSelectedTypeParameter] = useState<string>("");
    const [stationParameters, setStationParameters] = useState(station.parameters);
    const auth = useContext(AuthContext);

    useEffect(() => {
        const handleReadTypeParameter = async () => {
            try {
                const response = await typeParameterService.listTypeParameters();
                setTypeParameters(response.data.model);
            } catch (error) {
                errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
            }
        }

        handleReadTypeParameter();
    }, []);

    const handleCreateParameter = async () => {
        if (!selectedTypeParameter) return;
        
        try {
            const response = await parameterService.createParameter(station.id, selectedTypeParameter);
            
            // Após criar o parâmetro, atualiza a estação
            onUpdateStation();
            setSelectedTypeParameter(""); // Limpa a seleção
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
        }
    }

    const handleDeleteParameter = async (parameterId: string) => {
        try {
            await parameterService.deleteParameter(parameterId);
            // Após deletar o parâmetro, atualiza a estação
            onUpdateStation();
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
        }
    }

    // Filtra os tipos de parâmetros que ainda não foram adicionados à estação
    const availableTypeParameters = typeParameters.filter(type => 
        !stationParameters.some(param => param.idTypeParameter.id === type.id)
    );

    const hasAlerts = (parameterId: string) => {
        const parameter = stationParameters.find(param => param.id === parameterId);
        return parameter?.typeAlerts && parameter.typeAlerts.length > 0;
    };

    return (
        <div className="station-tab">
            <h2 className="station-tab__title">Parâmetros da estação</h2>
            
            <div className="station-tab__content">
                {auth.user !== undefined ? (
                    <div className="station-tab__form-section">
                        <div className="station-tab__select-container">
                            <select 
                                className="station-tab__select"
                                value={selectedTypeParameter}
                                onChange={(e) => setSelectedTypeParameter(e.target.value)}
                            >
                                <option value="">Selecione um tipo de parâmetro</option>
                                {availableTypeParameters.map((type) => (
                                    <option key={type.id} value={type.id}>
                                        {type.name}
                                    </option>
                                ))}
                            </select>
                            <button 
                                className="station-tab__button station-tab__button--primary"
                                onClick={handleCreateParameter}
                                disabled={!selectedTypeParameter}
                            >
                                Adicionar Parâmetro
                            </button>
                        </div>
                    </div>
                ) : null}

                <div className="station-tab__list">
                    {stationParameters.map((param: { id: string; idTypeParameter: { name: string; typeJson: string; unit: string }; typeAlerts?: any[] }) => (
                        <div key={param.id} className="station-tab__card">
                            <div className="station-tab__card-info">
                                <p className="station-tab__info-item">
                                    <strong>Nome:</strong> {param.idTypeParameter.name}
                                </p>
                                <p className="station-tab__info-item">
                                    <strong>Tipo do Json:</strong> {param.idTypeParameter.typeJson}
                                </p>
                                <p className="station-tab__info-item">
                                    <strong>Unidade de Medida:</strong> {param.idTypeParameter.unit}
                                </p>
                                {auth.user !== undefined && hasAlerts(param.id) && (
                                    <p className="station-tab__info-item station-tab__info-item--warning">
                                        <strong>Aviso:</strong> Este parâmetro possui alertas associados
                                    </p>
                                )}
                            </div>
                            {auth.user?.role === "ADMIN" && (
                                <button 
                                    className="station-tab__button station-tab__button--danger"
                                    onClick={() => handleDeleteParameter(param.id)}
                                    disabled={hasAlerts(param.id)}
                                    title={hasAlerts(param.id) ? "Não é possível excluir um parâmetro com alertas associados" : ""}
                                >
                                    Excluir
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}