export const transformCriticality = (criticality: string) => {
    switch (criticality) {
      case "LOW":
        return "Baixa";
      case "MEDIUM":
        return "Média";
      case "HIGH":
        return "Alta";
      case "CRITICAL":
        return "Crítica";
      default:
        return "Desconhecido";
    }
  };