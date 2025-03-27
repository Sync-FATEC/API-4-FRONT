import { useState } from 'react';
import { typeAlertService } from '../../../api/typeAlertService';
import { ReadStationType } from '../../../types/station/ReadStationType';
import '../shared/TabStyles.css';
import { errorSwal } from '../../swal/errorSwal';

interface TypeAlert {
    id: string;
    name: string;
    comparisonOperator: '>' | '<' | '=';
    value: number;
}

interface TypeAlertTabProps {
    station: ReadStationType;
    onUpdateStation: () => void;
}

export default function TypeAlertTab({ station, onUpdateStation }: TypeAlertTabProps) {
    const [selectedParameter, setSelectedParameter] = useState('');
    const [name, setName] = useState('');
    const [comparisonOperator, setComparisonOperator] = useState<'>' | '<' | '='>('=');
    const [value, setValue] = useState('');

    // Função para obter todos os alertas de todos os parâmetros
    const getAllAlerts = () => {
        const allAlerts: Array<{ alert: TypeAlert; parameterId: string }> = [];
        
        station.parameters.forEach(param => {
            if (param.typeAlerts) {
                param.typeAlerts.forEach(alert => {
                    allAlerts.push({
                        alert,
                        parameterId: param.id
                    });
                });
            }
        });

        return allAlerts;
    };

    const handleCreateTypeAlert = async () => {
        try {
            const typeAlertData = {
                parameterId: selectedParameter,
                name: name,
                comparisonOperator: comparisonOperator,
                value: Number(value)
            };

            await typeAlertService.create(typeAlertData);
            onUpdateStation();
            
            setSelectedParameter('');
            setName('');
            setValue('');
            
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
        }
    };

    const handleDeleteTypeAlert = async (id: string) => {
        try {
            await typeAlertService.deleteTypeAlert(id);
            onUpdateStation();
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || 'Erro desconhecido');
        }
    };

    const getParameterInfo = (parameterId: string) => {
        return station.parameters.find(param => param.id === parameterId)?.idTypeParameter;
    };

    const allAlerts = getAllAlerts();

    return (
        <div className="station-tab">
            <h2 className="station-tab__title">Tipos de Alertas</h2>
            
            <div className="station-tab__content">
                <div className="station-tab__form-section">
                    <h3 className="station-tab__subtitle">Criar Novo Tipo de Alerta</h3>
                    
                    <div className="station-tab__form">
                        <div className="station-tab__form-group">
                            <label className="station-tab__label">Parâmetro:</label>
                            <select
                                value={selectedParameter}
                                onChange={(e) => setSelectedParameter(e.target.value)}
                                className="station-tab__select"
                            >
                                <option value="">Selecione um parâmetro</option>
                                {station.parameters.map((param) => (
                                    <option key={param.id} value={param.id}>
                                        {param.idTypeParameter.name} ({param.idTypeParameter.unit})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {selectedParameter && (
                            <>
                                <div className="station-tab__form-group">
                                    <label className="station-tab__label">Nome do Alerta:</label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="station-tab__input"
                                        placeholder="Digite um nome para identificar o alerta"
                                    />
                                </div>

                                <div className="station-tab__form-group">
                                    <label className="station-tab__label">Operador de Comparação:</label>
                                    <select
                                        value={comparisonOperator}
                                        onChange={(e) => setComparisonOperator(e.target.value as '>' | '<' | '=')}
                                        className="station-tab__select"
                                    >
                                        <option value=">">Maior que</option>
                                        <option value="<">Menor que</option>
                                        <option value="=">Igual a</option>
                                    </select>
                                </div>

                                <div className="station-tab__form-group">
                                    <label className="station-tab__label">Valor ({getParameterInfo(selectedParameter)?.unit}):</label>
                                    <input
                                        type="number"
                                        value={value}
                                        onChange={(e) => setValue(e.target.value)}
                                        className="station-tab__input"
                                        step={getParameterInfo(selectedParameter)?.numberOfDecimalsCases 
                                            ? `0.${'0'.repeat((getParameterInfo(selectedParameter)?.numberOfDecimalsCases || 0) - 1)}1` 
                                            : '1'}
                                    />
                                </div>

                                <button
                                    className="station-tab__button station-tab__button--primary"
                                    onClick={handleCreateTypeAlert}
                                    disabled={!name || !value}
                                >
                                    Criar Tipo de Alerta
                                </button>
                            </>
                        )}
                    </div>
                </div>

                <div className="station-tab__list">
                    {allAlerts.length > 0 ? (
                        allAlerts.map(({ alert, parameterId }) => {
                            const parameterInfo = getParameterInfo(parameterId);
                            if (!parameterInfo) return null;

                            return (
                                <div key={alert.id} className="station-tab__card">
                                    <div className="station-tab__card-info">
                                        <h3 className="station-tab__info-item">
                                            <strong>Nome:</strong> {alert.name}
                                        </h3>
                                        <p className="station-tab__info-item">
                                            <strong>Parâmetro:</strong> {parameterInfo.name}
                                        </p>
                                        <p className="station-tab__info-item">
                                            <strong>Tipo:</strong> {parameterInfo.typeJson}
                                        </p>
                                        <p className="station-tab__info-item">
                                            <strong>Condição:</strong> {alert.comparisonOperator} {alert.value} {parameterInfo.unit}
                                        </p>
                                    </div>
                                    <button 
                                        className="station-tab__button station-tab__button--danger"
                                        onClick={() => handleDeleteTypeAlert(alert.id)}
                                    >
                                        Excluir
                                    </button>
                                </div>
                            );
                        })
                    ) : (
                        <p className="station-tab__empty-message">Nenhum tipo de alerta cadastrado</p>
                    )}
                </div>
            </div>
        </div>
    );
}
