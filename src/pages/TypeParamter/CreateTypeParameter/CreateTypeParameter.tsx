import { useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import { errorSwal } from "../../../components/swal/errorSwal";
import { successSwal } from "../../../components/swal/sucessSwal";
import { useNavigate } from "react-router-dom";
import "./CreateTypeParameter.css";
import { typeParameterService } from "../../../api/typeParameterService";
import { CreateTypeParameterType } from "../../../types/TypeParameter/CreateTypeParameter";
import { formatNumber } from "../../../utils/formatNumber";

export default function CreateTypeParameter() {
    const [typeJson, setTypeJson] = useState("");
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [numberOfDecimalsCases, setNumberOfDecimalsCases] = useState("");
    const [factor, setFactor] = useState("");
    const [offset, setOffset] = useState("");
    const navigate = useNavigate();

    const handleCreateTypeParameter = async () => {
        const data: CreateTypeParameterType = {
            typeJson,
            name,
            unit,
            numberOfDecimalsCases: parseInt(numberOfDecimalsCases),
            factor: parseFloat(factor),
            offset: parseFloat(offset),
        };
        try {
            const response = await typeParameterService.createTypeParameter(data);
            successSwal("Tipo de parâmetro cadastrado com sucesso");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    };

    const children = (
        <div className="register-modal">
            <div className="personal-data">
                <div className="subtitle">
                    <p>Dados do Tipo de Parâmetro</p>
                </div>

                <div className="input-container">
                    <Input
                        label="Tipo JSON"
                        placeholder="Digite o tipo JSON"
                        styleInput={2}
                        value={typeJson || ""}
                        onChange={(e) => setTypeJson(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Nome"
                        placeholder="Digite o nome"
                        styleInput={2}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Unidade"
                        placeholder="Digite a unidade de medida"
                        styleInput={2}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Casas Decimais"
                        placeholder="Digite o número de casas decimais"
                        styleInput={2}
                        value={numberOfDecimalsCases}
                        onChange={(e) => setNumberOfDecimalsCases(formatNumber(e.target.value))}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Fator"
                        placeholder="Digite o fator"
                        styleInput={2}
                        value={factor}
                        onChange={(e) => setFactor(formatNumber(e.target.value))}
                    />
                </div>

                <div className="input-container">
                    <Input
                        label="Offset"
                        placeholder="Digite o offset"
                        styleInput={2}
                        value={offset}
                        onChange={(e) => setOffset(formatNumber(e.target.value))}
                    />
                </div>

                <div className="Buttons">
                    <Button
                        onClick={() => {
                            navigate(-1);
                        }}
                        label="Cancelar"
                        styleButton={2}
                    />
                    <Button
                        onClick={handleCreateTypeParameter}
                        label="Cadastrar"
                        styleButton={1}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <main className="station">
            <Modal title="Cadastro de Tipo de Parâmetro" children={children} />
        </main>
    );
}
