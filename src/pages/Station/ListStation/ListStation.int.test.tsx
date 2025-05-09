import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import stationService from '../../../api/stationService';
import ListStation from './ListStation';
import { AuthContext } from '../../../contexts/auth/AuthContext';

// Mock da navegação
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Mock da API
jest.mock('../../../api/stationService');

const mockedStations = [
  {
    id: "f5cbd4d6-94ea-44ac-b736-a6fa167516a4",
    uuid: "taubate-uid-002",
    name: "Estação de Taubaté (A728)",
    latitude: "-23.04166666",
    longitude: "-45.52083332",
    DateLastMeasure: null,
    createdAt: "2025-05-01T20:16:21.433Z"
  },
  {
    id: "45ea4a19-4be4-42bc-a019-5ddaa406fe3f",
    uuid: "campos-do-jordao-uid-001",
    name: "Estação de Campos do Jordão (A706)",
    latitude: "-22.75027777",
    longitude: "-45.60388888",
    DateLastMeasure: null,
    createdAt: "2025-05-01T20:16:21.433Z"
  },
];

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <AuthContext.Provider
      value={{
        user: { 
          role: "ADMIN",
          name: "Admin User",
          email: "admin@example.com"
        },
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        validateToken: jest.fn(),
      }}
    >
      <MemoryRouter>
        {component}
      </MemoryRouter>
    </AuthContext.Provider>
  );
};

describe('ListStation - Integração', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (stationService.listStations as jest.Mock).mockResolvedValue({
      data: { model: mockedStations },
    });

    (stationService.deleteStation as jest.Mock).mockResolvedValue({});
  });

  test('📋 Deve exibir a lista de estações após carregar', async () => {
    renderWithAuth(<ListStation />);

    // Espera o carregamento
    await waitFor(() => {
      expect(screen.getByText("Estação de Taubaté (A728)")).toBeInTheDocument();
      expect(screen.getByText("Estação de Campos do Jordão (A706)")).toBeInTheDocument();
    });
  });

  test('🗑 Deve remover estação da lista ao clicar em deletar', async () => {
    renderWithAuth(<ListStation />);

    await screen.findByText("Estação de Taubaté (A728)");

    const deleteIcons = screen.getAllByTestId('delete-icon');
    fireEvent.click(deleteIcons[0]);

    await waitFor(() => {
      expect(screen.queryByText("Estação de Taubaté (A728)")).not.toBeInTheDocument();
    });
  });

  test('✏️ Deve navegar para a tela de atualizar ao clicar em editar', async () => {
    renderWithAuth(<ListStation />);

    const editIcons = await screen.findAllByTestId('edit-icon');
    fireEvent.click(editIcons[0]);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        `/estacao/atualizar/${mockedStations[0].id}`
      );
    });
  });
});
