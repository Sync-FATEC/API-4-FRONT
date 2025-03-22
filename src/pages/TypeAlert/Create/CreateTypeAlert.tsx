import { useState } from "react";
import Input from "../../../components/input/Input";


const CreateTypeAlert = () => {
  const [alertType, setAlertType] = useState("");
  const [description, setDescription] = useState("");

  const [estacaoParametro, setEstacaoParametro] = useState<string[]>([
    "123UIB - Temperatura",
    "123UIB - Umidade",
    "123UIB - Pressão",
    "123UIB - Velocidade do vento",
    "123UIB - Direção do vento",
    "123UIB - Radiação solar",
    "123UIB - Precipitação",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
    "123UIB - Radiação solar do solo",
    "123UIB - Temperatura do ar",
    "123UIB - Umidade do ar",
    "123UIB - Pressão do ar",
    "123UIB - Radiação solar do ar",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
    "123UIB - Radiação solar do solo",
    "123UIB - Temperatura do ar",
    "123UIB - Umidade do ar",
    "123UIB - Pressão do ar",
    "123UIB - Radiação solar do ar",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
    "123UIB - Radiação solar do solo",
    "123UIB - Temperatura do ar",
    "123UIB - Umidade do ar",
    "123UIB - Pressão do ar",
    "123UIB - Radiação solar do ar",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
    "123UIB - Radiação solar do solo",
    "123UIB - Temperatura do ar",
    "123UIB - Umidade do ar",
    "123UIB - Pressão do ar",
    "123UIB - Radiação solar do ar",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
    "123UIB - Radiação solar do solo",
    "123UIB - Temperatura do ar",
    "123UIB - Umidade do ar",
    "123UIB - Pressão do ar",
    "123UIB - Radiação solar do ar",
    "123UIB - Temperatura do solo",
    "123UIB - Umidade do solo",
    "123UIB - Pressão do solo",
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Alert Type:", alertType);
    console.log("Description:", description);
    // Add your logic to handle the form submission
  };

  return (
    <div>
      <h1>Crie o tipo de alerta</h1>
      <form onSubmit={handleSubmit}>
        <Input
          disabled={false}
          key={1}
          label="Nome do tipo de alerta"
          onChange={(e) => setAlertType(e.target.value)}
          placeholder="Digite o nome do tipo de alerta"
          styleInput={1}
          value={alertType}
        />
        ;
        <select>
          <option value="1">Selecione o tipo de alerta</option>
          {/* MAIOR QUE , MAIOR = , MENOR IGUAL , MENOR QUE */}
          <option value="2">Maior que</option>
          <option value="3">Maior ou igual</option>
          <option value="4">Menor que</option>
          <option value="5">Menor ou igual</option>
        </select>
        <Input
          disabled={false}
          key={2}
          label="Valor de referência"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Digite o valor de referência"
          styleInput={1}
          value={description}
        />
        <option value="">Pesquise e selecione um parâmetro</option>
        <div>
          <input
            type="text"
            placeholder="Filtrar parâmetros"
            onChange={(e) => {
              const filterValue = e.target.value.toLowerCase();
              setEstacaoParametro((prev) =>
                prev.filter((parametro) =>
                  parametro.toLowerCase().includes(filterValue)
                )
              );
            }}
          />
          <select onChange={(e) => console.log(e.target.value)}>
            <option value="">Pesquise e selecione um parâmetro</option>
            {estacaoParametro.map((parametro, index) => (
              <option key={index} value={parametro}>
                {parametro}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Criar</button>
      </form>
    </div>
  );
};

export default CreateTypeAlert;
