Feature: Listagem de estações

  Scenario: Listar estações com sucesso
    Given que existem estações cadastradas
    When o administrador acessa a tela de listagem de estações
    Then o sistema deve exibir todas as estações

  Scenario: Remover uma estação da lista
    Given que o administrador está na tela de listagem com estações visíveis
    When ele clicar no ícone de deletar da primeira estação
    Then a estação deve ser removida da lista

  Scenario: Editar uma estação
    Given que a tela de listagem de estações está carregada
    When o administrador clicar no botão de editar da primeira estação
    Then ele deve ser redirecionado para a tela de edição da estação
