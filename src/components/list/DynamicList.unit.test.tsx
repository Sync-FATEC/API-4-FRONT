import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import DynamicList from "./DynamicList";
import { AuthContext } from "../../contexts/auth/AuthContext";
import { BrowserRouter } from "react-router-dom";

// Mock do useNavigate
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

const mockData = [
  { id: "1", nome: "Item 1", descricao: "Descrição 1" },
  { id: "2", nome: "Item 2", descricao: "Descrição 2" },
];

const mockFields = [
  { key: "nome", label: "Nome" },
  { key: "descricao", label: "Descrição" },
];

const mockOnDelete = jest.fn();
const mockOnUpdate = jest.fn();

const renderDynamicList = (authUser: any, props: any) => {
  return render(
    <AuthContext.Provider
      value={{
        user: authUser,
        login: jest.fn(),
        logout: jest.fn(),
        isAuthenticated: true,
        validateToken: jest.fn(),
      }}
    >
      <BrowserRouter>
        <DynamicList
          data={mockData}
          fields={mockFields}
          onDelete={mockOnDelete}
          onUpdate={mockOnUpdate}
          {...props}
        />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("DynamicList Component", () => {
  // Teste: Botão de editar não deve aparecer quando o usuário não tem role
  test("não deve mostrar o botão de editar quando o usuário não tem role", () => {
    renderDynamicList(
      { nome: "Usuário Teste" },
      { isEditable: true, isDelete: false }
    );

    // Verifica se o ícone de edição não está presente
    const editIcons = screen.queryAllByRole("img", { hidden: true });
    const hasEditIcon = editIcons.some(
      (icon) => icon.getAttribute("data-icon") === "edit"
    );
    expect(hasEditIcon).toBe(false);
  });

  test("não deve mostrar o botão de excluir quando o usuário não é admin", () => {
    renderDynamicList(
      { nome: "Usuário Teste", role: "USER" },
      { isEditable: false, isDelete: true }
    );

    // Verifica se o ícone de exclusão não está presente
    const trashIcons = screen.queryAllByRole("img", { hidden: true });
    const hasTrashIcon = trashIcons.some(
      (icon) => icon.getAttribute("data-icon") === "trash"
    );
    expect(hasTrashIcon).toBe(false);
  });

  // Teste: Botão de detalhes não deve aparecer quando detailsLink não é fornecido
  test("não deve mostrar o botão de detalhes quando detailsLink não é fornecido", () => {
    renderDynamicList(
      { nome: "Usuário Teste", role: "USER" },
      { isEditable: false, isDelete: false }
    );

    // Verifica se o ícone de pesquisa não está presente
    const searchIcons = screen.queryByTestId("details-icon");
    expect(searchIcons).not.toBeInTheDocument();
  });


  test("deve mostrar o botão de excluir quando o usuário é admin e isDelete é true", () => {
    renderDynamicList(
      { nome: "Usuário Teste", role: "ADMIN" },
      { isEditable: false, isDelete: true }
    );

    // Verifica se o ícone de exclusão está presente
    const trashIcons = screen.queryAllByRole("img", { hidden: true });
    const editIcons = screen.queryAllByRole("img", { hidden: true });
    const hasTrashIcon = trashIcons.some(
      (icon) => icon.getAttribute("data-icon") === "trash"
    );
    const hasEditIcon = editIcons.some(
      (icon) => icon.getAttribute("data-icon") === "edit"
    );
    expect(hasEditIcon).toBe(false);
    expect(hasTrashIcon).toBe(true);
  });

  test("não deve mostrar o botão de editar quando o usuário tem role mas isEditable é false", () => {
    renderDynamicList(
      { nome: "Usuário Teste", role: "USER" },
      { isEditable: false, isDelete: false }
    );

    // Verifica se o ícone de edição não está presente
    const editIcons = screen.queryAllByRole("img", { hidden: true });
    const hasEditIcon = editIcons.some(
      (icon) => icon.getAttribute("data-icon") === "edit"
    );
    expect(hasEditIcon).toBe(false);
  });

  test("não deve mostrar o botão de excluir quando o usuário é admin mas isDelete é false", () => {
    renderDynamicList(
      { nome: "Usuário Teste", role: "ADMIN" },
      { isEditable: false, isDelete: false }
    );

    // Verifica se o ícone de exclusão não está presente
    const trashIcons = screen.queryAllByRole("img", { hidden: true });
    const hasTrashIcon = trashIcons.some(
      (icon) => icon.getAttribute("data-icon") === "trash"
    );
    expect(hasTrashIcon).toBe(false);
  });
});
