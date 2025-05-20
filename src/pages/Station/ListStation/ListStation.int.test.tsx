import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { defineFeature, loadFeature } from 'jest-cucumber';
import { MemoryRouter } from 'react-router-dom';
import stationService from '../../../api/stationService';
import ListStation from './ListStation';
import { AuthContext } from '../../../contexts/auth/AuthContext';

// Mock for react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock('../../../api/stationService');

const feature = loadFeature('./src/pages/Station/ListStation/ListStation.feature');

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
        user: { role: "ADMIN", name: "Admin User", email: "admin@example.com" },
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        validateToken: jest.fn(),
      }}
    >
      <MemoryRouter>{component}</MemoryRouter>
    </AuthContext.Provider>
  );
};

defineFeature(feature, test => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockClear();
    (stationService.listStations as jest.Mock).mockResolvedValue({ data: { model: mockedStations } });
    (stationService.deleteStation as jest.Mock).mockResolvedValue({});
  });

  test('Listar estações com sucesso', ({ given, when, then }) => {
    given('que existem estações cadastradas', () => {
      // Mocks já configurados no beforeEach
    });

    when('o administrador acessa a tela de listagem de estações', async () => {
      renderWithAuth(<ListStation />);
      await waitFor(() => {
        expect(screen.getByText("Estação de Taubaté (A728)")).toBeInTheDocument();
        expect(screen.getByText("Estação de Campos do Jordão (A706)")).toBeInTheDocument();
      });
    });

    then('o sistema deve exibir todas as estações', () => {
      expect(screen.getByText("Estação de Taubaté (A728)")).toBeInTheDocument();
      expect(screen.getByText("Estação de Campos do Jordão (A706)")).toBeInTheDocument();
    });
  });

  test('Remover uma estação da lista', ({ given, when, then }) => {
    given('que o administrador está na tela de listagem com estações visíveis', async () => {
      renderWithAuth(<ListStation />);
      await screen.findByText("Estação de Taubaté (A728)");
    });

    when('ele clicar no ícone de deletar da primeira estação', () => {
      const deleteIcons = screen.getAllByTestId('delete-icon');
      fireEvent.click(deleteIcons[0]);
    });

    then('a estação deve ser removida da lista', async () => {
      await waitFor(() => {
        expect(stationService.deleteStation).toHaveBeenCalledWith(mockedStations[0].id);
        expect(screen.queryByText("Estação de Taubaté (A728)")).not.toBeInTheDocument();
      });
    });
  });

  test('Editar uma estação', ({ given, when, then }) => {
    given('que a tela de listagem de estações está carregada', async () => {
      renderWithAuth(<ListStation />);
      await screen.findByText("Estação de Taubaté (A728)");
    });

    when('o administrador clicar no botão de editar da primeira estação', async () => {
      const editIcons = await screen.findAllByTestId('edit-icon');
      fireEvent.click(editIcons[0]);
    });

    then('ele deve ser redirecionado para a tela de edição da estação', async () => {
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(
          `/estacao/atualizar/${mockedStations[0].id}`
        );
      });
    });
  });
});
