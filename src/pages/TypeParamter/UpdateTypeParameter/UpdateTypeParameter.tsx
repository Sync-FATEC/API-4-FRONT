import { useEffect, useState } from "react";
import Button from "../../../components/button/Button";
import Input from "../../../components/input/Input";
import Modal from "../../../components/modal/Modal";
import { errorSwal } from "../../../components/swal/errorSwal";
import { successSwal } from "../../../components/swal/sucessSwal";
import { useNavigate, useParams } from "react-router-dom";
import { typeParameterService } from "../../../api/typeParameterService";
import { formatNumber } from "../../../utils/formatNumber";
import Loading from "../../../components/loading/loading";
import './UpdateTypeParameter.css';
import { UpdateTypeParameterType } from "../../../types/TypeParameter/UpdateTypeParameter";

export default function UpdateTypeParameter() {
    const [typeJson, setTypeJson] = useState("");
    const [name, setName] = useState("");
    const [unit, setUnit] = useState("");
    const [numberOfDecimalsCases, setNumberOfDecimalsCases] = useState("");
    const [factor, setFactor] = useState("");
    const [offset, setOffset] = useState("");
    const navigate = useNavigate();
    const id = useParams().id as string
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log(id);
        
        const handleReadTypeParameter = async () => {
            if (!id) {
                errorSwal("Tipo de parâmetro não encontrado");
                navigate(-1);
            }
            try {
                const response = await typeParameterService.readTypeParameter(id);
                setTypeJson(response.data.typeJson);
                setName(response.data.name);
                setUnit(response.data.unit);
                setNumberOfDecimalsCases(response.data.numberOfDecimalsCases.toString());
                setFactor(response.data.factor.toString());
                setOffset(response.data.offset.toString());
            } catch (error) {
                errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
                navigate(-1);
            } finally {
                setLoading(false);
            }
        }
        handleReadTypeParameter();
    }
    , []);

    const handleUpdateTypeParameter = async () => {
        const data: UpdateTypeParameterType = {
            id,
            typeJson,
            name,
            unit,
            numberOfDecimalsCases: parseInt(numberOfDecimalsCases),
            factor: parseFloat(factor),
            offset: parseFloat(offset),
        };
        try {
            const response = await typeParameterService.updateTypeParameter(data);
            successSwal("Tipo de parâmetro atualizado com sucesso");
        } catch (error) {
            errorSwal((error as any)?.response?.data?.error || "Erro desconhecido");
        }
    };

    if (loading) {
        return <Loading />
    }

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
                        onClick={handleUpdateTypeParameter}
                        label="Atualizar"
                        styleButton={1}
                    />
                </div>
            </div>
        </div>
    );

    return (
        <main className="station">
            <Modal title="Atualizar Tipo de Parâmetro" children={children} />
        </main>
    );
}
