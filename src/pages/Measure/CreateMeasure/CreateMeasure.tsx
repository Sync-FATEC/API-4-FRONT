import { useState, useEffect } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import Select from "../../../components/Select/Select";
import "./CreateMeasure.css";
import { errorSwal } from "../../../components/swal/errorSwal";
import { successSwal } from "../../../components/swal/sucessSwal";
import { useNavigate } from "react-router-dom";
import api from "../../../api/api";
import { typeParameterService } from "../../../api/typeParameterService";
import stationService from "../../../api/stationService";
import { ReadStationType } from "../../../types/station/ReadStationType";
import { ReadTypeParameterType } from "../../../types/TypeParameter/ReadTypeParameter";

interface ParameterPair {
    parameterId: string;
    value: string;
}

export default function CreateMeasure() {
    const [selectedStationUuid, setSelectedStationUuid] = useState("");
    const [parameterPairs, setParameterPairs] = useState<ParameterPair[]>([
        { parameterId: "", value: "" },
    ]);
    const [parameters, setParameters] = useState<ReadTypeParameterType[]>([]);
    const [stations, setStations] = useState<ReadStationType[]>([]);
    const [stationParameters, setStationParameters] = useState<ReadTypeParameterType[]>([]);
    const navigate = useNavigate();


    const handleListStations = async () => {
        try {
            const response = await stationService.listStations();
            setStations(response.data.model);
        } catch (error) {
            errorSwal("Erro ao buscar estações");
        }
    };

    const handleReadStation = async (id: string) => {
        try {
            const response = await stationService.readStation(id);
            const stationData = response.data.model as ReadStationType;
            const stationParamIds = stationData.parameters.map(param => param.idTypeParameter.id);
            const filteredParams = parameters.filter(param => 
                stationParamIds.includes(param.id)
            );
            setStationParameters(filteredParams);
            // Limpa os pares de parâmetros quando mudar a estação
            setParameterPairs([{ parameterId: "", value: "" }]);
        } catch (error) {
            errorSwal("Erro ao buscar a estação");
        }
    };

    useEffect(() => {
        handleListStations();
    }, []);

    useEffect(() => {
        if (selectedStationUuid) {
            const selectedStation = stations.find(station => station.uuid === selectedStationUuid);
            if (selectedStation) {
                handleReadStation(selectedStation.id);
            }
        }
    }, [selectedStationUuid]);

    const handleAddParameterPair = () => {
        setParameterPairs([...parameterPairs, { parameterId: "", value: "" }]);
    };

    const handleRemoveParameterPair = (index: number) => {
        setParameterPairs(parameterPairs.filter((_, i) => i !== index));
    };

    const handleParameterPairChange = (
        index: number,
        field: "parameterId" | "value",
        newValue: string
    ) => {
        const updated = parameterPairs.map((pair, i) =>
            i === index ? { ...pair, [field]: newValue } : pair
        );
        setParameterPairs(updated);
    };

    const handleCreateMeasure = async () => {
        const currentUnixTime = Math.floor(Date.now() / 1000);
        const data: any = {
            uid: selectedStationUuid,
            unixtime: currentUnixTime,
        };

        parameterPairs.forEach((pair) => {
            if (pair.parameterId) {
                const selectedParameter = parameters.find(
                    (param) => param.id === pair.parameterId
                );
                if (selectedParameter) {
                    data[selectedParameter.typeJson] = Number(pair.value);
                }
            }
        });

        try {
            await api.post("/receiverJson", data);
            successSwal("Medida cadastrada com sucesso");
            navigate("/estacao");
        } catch (error) {
            errorSwal(
                (error as any)?.response?.data?.error || "Erro desconhecido"
            );
        }
    };

    const parameterSelectOptions = stationParameters.map((param) => ({
        value: param.id,
        label: `${param.name} (${param.unit})`,
    }));

    const stationSelectOptions = stations.map((station) => ({
        value: station.uuid, 
        label: `${station.name} (${station.uuid})`,
    }));

    const children = (
        <div className="register-modal">
            <div className="personal-data">
                <div className="subtitle">
                    <p>Dados da Medida</p>
                </div>

                <div className="input-container">
                    <Select
                        label="Estação"
                        options={[
                            { value: "", label: "Selecione uma estação" },
                            ...stationSelectOptions,
                        ]}
                        value={selectedStationUuid}
                        onChange={(e) => setSelectedStationUuid(e.target.value)}
                        styleSelect={2}
                    />
                </div>

                <div className="parameter-section">
                    {parameterPairs.map((pair, index) => (
                        <div key={index} className="parameter-row">
                            <div className="input-container">
                                <Select
                                    label="Tipo do Parâmetro"
                                    options={[
                                        { value: "", label: "Selecione um parâmetro" },
                                        ...parameterSelectOptions,
                                    ]}
                                    value={pair.parameterId}
                                    onChange={(e) =>
                                        handleParameterPairChange(index, "parameterId", e.target.value)
                                    }
                                    styleSelect={2}
                                />
                            </div>
                            <div className="input-container">
                                <Input
                                    label="Valor"
                                    placeholder="Digite o valor"
                                    styleInput={2}
                                    value={pair.value}
                                    onChange={(e) =>
                                        handleParameterPairChange(index, "value", e.target.value)
                                    }
                                />
                            </div>
                            <div className="input-container">
                                <Button
                                    onClick={() => handleRemoveParameterPair(index)}
                                    label="Remover"
                                    styleButton={2}
                                />
                            </div>
                        </div>
                    ))}
                    <div className="input-container">
                        <Button
                            onClick={handleAddParameterPair}
                            label="Adicionar Parâmetro"
                            styleButton={1}
                        />
                    </div>
                </div>

                <div className="Buttons">
                    <Button onClick={() => navigate(-1)} label="Cancelar" styleButton={2} />
                    <Button
                        onClick={handleCreateMeasure}
                        label="Cadastrar"
                        styleButton={1}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <main className="measure">
            <Modal title="Cadastro de Medidas" children={children} />
        </main>
    );
}
