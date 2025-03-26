import { useEffect, useState } from "react";
import { ReadStationType } from "../../../types/station/ReadStationType";
import { ReadTypeParameterType } from "../../../types/TypeParameter/ReadTypeParameter";
import { typeParameterService } from "../../../api/typeParameterService";
import { parameterService } from "../../../api/parameterService";
import '../shared/TabStyles.css';

interface TypeParameterTabProps {
    station: ReadStationType;
}

export default function TypeParameterTab({station}: TypeParameterTabProps) {
    const [typeParameters, setTypeParameters] = useState<ReadTypeParameterType[]>([]);
    const [selectedTypeParameter, setSelectedTypeParameter] = useState<string>("");
    const [stationParameters, setStationParameters] = useState(station.parameters);

    useEffect(() => {
        const handleReadTypeParameter = async () => {
            try {
                const response = await typeParameterService.listTypeParameters();
                setTypeParameters(response.data.model);
            } catch (error) {
                console.error('Erro ao carregar tipos de parâmetros:', error);
            }
        }

        handleReadTypeParameter();
    }, []);

    const handleCreateParameter = async () => {
        if (!selectedTypeParameter) return;
        
        try {
            const response = await parameterService.createParameter(station.id, selectedTypeParameter);
            
            // Encontra o tipo de parâmetro selecionado para criar o novo parâmetro
            const selectedType = typeParameters.find(type => type.id === selectedTypeParameter);
            
            if (response.status === 200 && selectedType) {
                const newParameter = {
                    id: response.data.model.id,
                    idStation: response.data.model.idStation,
                    idTypeParameter: selectedType, // Aqui incluímos todas as informações do tipo
                    status: response.data.model.status
                };
                
                setStationParameters([...stationParameters, newParameter]);
                setSelectedTypeParameter(""); // Limpa a seleção
            }
        } catch (error) {
            console.error('Erro ao criar parâmetro:', error);
        }
    }

    const handleDeleteParameter = async (parameterId: string) => {
        try {
            await parameterService.deleteParameter(parameterId);
            setStationParameters(stationParameters.filter(param => param.id !== parameterId));
        } catch (error) {
            console.error('Erro ao deletar parâmetro:', error);
        }
    }

    // Filtra os tipos de parâmetros que ainda não foram adicionados à estação
    const availableTypeParameters = typeParameters.filter(type => 
        !stationParameters.some(param => param.idTypeParameter.id === type.id)
    );

    return (
        <div className="station-tab">
            <h2 className="station-tab__title">Parâmetros da estação</h2>
            
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
                    className="station-tab__add-button"
                    onClick={handleCreateParameter}
                    disabled={!selectedTypeParameter}
                >
                    Adicionar Parâmetro
                </button>
            </div>

            <div className="station-tab__info station-tab__info-type">
                {stationParameters.map((param) => (
                    <div key={param.id} className="station-tab__parameter-card">
                        <div className="station-tab__parameter-info">
                            <p className="station-tab__info-item">
                                <strong>Nome:</strong> {param.idTypeParameter.name}
                            </p>
                            <p className="station-tab__info-item">
                                <strong>Tipo do Json:</strong> {param.idTypeParameter.typeJson}
                            </p>
                            <p className="station-tab__info-item">
                                <strong>Unidade de Medida:</strong> {param.idTypeParameter.unit}
                            </p>
                        </div>
                        <button 
                            className="station-tab__delete-button"
                            onClick={() => handleDeleteParameter(param.id)}
                        >
                            Excluir
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}