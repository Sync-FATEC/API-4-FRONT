# Sistema de Monitoramento Ambiental - Frontend

<div align="center">
<a href="#descricao">Descrição</a> |
<a href="#features">Features</a> |
<a href="#tecnologias">Tecnologias</a> |
<a href="#rotas">Rotas</a> |
<a href="#estrutura">Estrutura</a> |
<a href="#execucao">Execução</a> |
<a href="#contribuidores">Contribuidores</a>
</div>

## Descricao
Sistema de monitoramento ambiental desenvolvido para a Tecsus, responsável pela interface do usuário e exibição dos dados coletados pelas estações meteorológicas. O sistema permite o gerenciamento de estações, parâmetros ambientais, alertas e usuários.

## Features
- **Autenticação e Autorização**
  - Login de usuários
  - Recuperação de senha
  - Controle de acesso baseado em perfil

- **Gerenciamento de Estações**
  - Cadastro e visualização de estações meteorológicas
  - Monitoramento em tempo real
  - Histórico de dados

- **Parâmetros Ambientais**
  - Configuração de tipos de parâmetros
  - Definição de limites e alertas
  - Visualização de dados históricos

- **Sistema de Alertas**
  - Configuração de tipos de alertas
  - Histórico de alertas

- **Gestão de Clientes**
  - Cadastro e gerenciamento de clientes
  - Associação com estações
  - Controle de acesso

## Tecnologias
- **Frontend**
  - React 18
  - TypeScript
  - Vite
  - Styled-components
  - React Router
  - Axios
  - SweetAlert2

- **Ferramentas de Desenvolvimento**
  - ESLint
  - Prettier
  - Docker
  - Git

## Rotas
- `/` - Landing Page
- `/login` - Página de login
- `/estacao` - Gerenciamento de estações
- `/usuario` - Gestão de clientes
- `/tipo-parametro` - Configuração de tipos de parâmetros
- `/alertas` - Sistema de alertas
- `*` - Página 404 (Rota não encontrada)

## Estrutura
```
src/
├── api/              # Serviços de API
├── components/       # Componentes reutilizáveis
├── contexts/        # Contextos React
├── enums/           # Enumeradores
├── hooks/           # Hooks personalizados
├── pages/           # Páginas da aplicação
├── static/          # Recursos estáticos
├── types/           # Definições de tipos TypeScript
└── utils/           # Funções utilitárias
```

## Execucao

### Pré-requisitos
- Node.js 18+
- npm ou yarn
- Docker (opcional)

### Instalação
1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```

### Docker
```bash
docker-compose up
```

## Scripts Disponíveis
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Compila para produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter
- `npm run format` - Formata o código

## Contribuidores
- João Gabriel Solis (Scrum Master)
- Ana Laura Moratelli (Product Owner)
- Ana Clara Marques (Desenvolvedora)
- Erik Yokota (Desenvolvedor)
- Filipe Colla (Desenvolvedor)
- Kauê Francisco (Desenvolvedor)

## Licença
Este projeto está sob a licença [MIT](LICENSE).