import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComparisonOperator } from "../../enums/ComparisonOperator";
import Button from "../button/Button";
import Input from "../input/Input";
import Modal from "../modal/Modal";
import SearchSelect from "../searchSelect/SearchSelect";
import { formatNumber } from "../../utils/formatNumber";
import { errorSwal } from "../swal/errorSwal";
import api from "../../api/api";
import { log } from "console";

interface ParameterDto {
  id: string;
  text: string;
}

export interface TypeAlertData {
  id?: string;
  name: string;
  value: string;
  comparisonOperator: ComparisonOperator;
  parameterId: string;
}

interface TypeAlerFormProps {
  edit: boolean;
  id?: string;
  onSubmit: (data: TypeAlertData) => void;
}

const TypeAlertForm = ({ edit, id, onSubmit }: TypeAlerFormProps) => {
  const [alertType, setAlertType] = useState("");
  const [value, setValue] = useState<string>();
  const [parameterId, setParameterId] = useState<string>();
  const [estacaoParametro, setEstacaoParametro] = useState<ParameterDto[]>([]);
  const [comparisonOperator, setComparisonOperator] =
    useState<ComparisonOperator>(ComparisonOperator.GreaterThan);
  const [comprationsOtions, setComparations] = useState<string[]>([
    ">",
    ">=",
    "<",
    "<=",
  ]);
  const navigate = useNavigate();

  const getParameters = async () => {
    const response = await api.get("/parameter/list");

    const parameters = response.data.model.map((parameter: any) => {
      return {
        id: parameter.id,
        text: parameter.text,
      };
    });

    setEstacaoParametro(parameters);
  };

  const getAlertType = async () => {
    const response = await api.get(`/typeAlert/${id}`);
    const data = response.data.model.data;
    setAlertType(data.name);
    setValue(data.value);
    setParameterId(data.parameter.id);
    setComparisonOperator(data.comparisonOperator);
  };

  useEffect(() => {
    getParameters();
    if (id) {
      getAlertType();
    }
  }, []);

  const handleChangeComparationOperation = (value: string) => {
    const comparisonMap: Record<string, ComparisonOperator> = {
      ">": ComparisonOperator.GreaterThan,
      ">=": ComparisonOperator.GreaterThanOrEqual,
      "<": ComparisonOperator.LessThan,
      "<=": ComparisonOperator.LessThanOrEqual,
    };

    setComparisonOperator(comparisonMap[value]);
  };

  const handleChangeParameterId = (value: string) => {
    const parameter = estacaoParametro.find(
      (estacao) => estacao.text === value
    );
    setParameterId(parameter ? parameter.id : undefined);
  };

  const handleSubmit = () => {
    if (alertType && value && comparisonOperator && parameterId) {
      onSubmit({ name: alertType, value, comparisonOperator, parameterId });
    } else {
      errorSwal("Preencha todos os campos");
    }
  };

  const mapCompartionOperator = (operator: ComparisonOperator) => {
    switch (operator) {
      case ComparisonOperator.GreaterThan:
        return ">";
      case ComparisonOperator.GreaterThanOrEqual:
        return ">=";
      case ComparisonOperator.LessThan:
        return "<";
      case ComparisonOperator.LessThanOrEqual:
        return "<=";
    }
  };

  return (
    <div className="register-modal">
      <div className="personal-data">
        <div className="subtitle">
          <p>Dados do tipo de alerta</p>
        </div>

        <div className="input-container">
          <Input
            disabled={false}
            key={"name"}
            label={"Nome do tipo do alerta"}
            onChange={(e) => setAlertType(e.target.value)}
            placeholder="O nome do tipo do alerta"
            styleInput={2}
            value={alertType}
          />
        </div>

        <div className="input-container">
          <label htmlFor="name">Valor </label>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <select
              style={{ flex: 0.2 }}
              onChange={(e) => handleChangeComparationOperation(e.target.value)}
              value={mapCompartionOperator(comparisonOperator)}
            >
              <option disabled>Selecione um comparador</option>
              {comprationsOtions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              style={{ flex: 0.8 }}
              disabled={false}
              key={"Valor"}
              onChange={(e) => setValue(formatNumber(e.target.value))}
              placeholder="O valor o qual gerará o tipo do alerta"
              value={value}
            />
          </div>
        </div>

        <div className="input-container">
          <SearchSelect
            onSelect={(e) => handleChangeParameterId(e)}
            options={estacaoParametro.map((e) => e.text)}
            placeholder="o parâmetro"
            key={"parameter"}
            showSearch={false}
            initialValue={
              estacaoParametro.filter((e) => e.id === parameterId)[0]?.text
            }
          />
        </div>
      </div>

      <div className="Buttons">
        <Button
          label="Cancelar"
          onClick={() => {
            navigate(-1);
          }}
          styleButton={2}
        />
        <Button
          label={edit ? "Editar" : "Cadastrar"}
          onClick={handleSubmit}
          styleButton={1}
        />
      </div>
    </div>
  );
};

export default TypeAlertForm;
