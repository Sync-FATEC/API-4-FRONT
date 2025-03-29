# Sistema de Monitoramento Ambiental - Frontend

<div align="center">
  <h3>🌿 TecSus - Monitoramento Ambiental</h3>
  <p>Sistema frontend para monitoramento ambiental em tempo real</p>
  
  ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  ![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)
</div>

<div align="center">
  <a href="#-sobre">Sobre</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-rotas">Rotas</a> •
  <a href="#-como-executar">Execução</a> •
  <a href="#-estrutura">Estrutura</a> •
  <a href="#-time">Time</a>
</div>

## 📋 Sobre

O Sistema de Monitoramento Ambiental é uma solução completa desenvolvida para a TecSus, focada no gerenciamento e monitoramento de dados ambientais. O frontend é responsável por:

- Interface intuitiva e responsiva
- Visualização de dados em tempo real
- Gerenciamento de estações e parâmetros
- Sistema de alertas e notificações

## 🚀 Tecnologias

### Core
- **React 18** - Biblioteca para construção de interfaces
- **TypeScript** - Superset JavaScript com tipagem estática
- **Vite** - Build tool e servidor de desenvolvimento
- **Styled Components** - Estilização com CSS-in-JS

### Principais Dependências
- **React Router** - Roteamento da aplicação
- **Axios** - Cliente HTTP
- **SweetAlert2** - Componentes de alerta
- **Context API** - Gerenciamento de estado
- **ESLint & Prettier** - Qualidade de código

### Arquitetura e Padrões
- **Component-Based Architecture** - Desenvolvimento baseado em componentes
- **Atomic Design** - Metodologia de design de componentes
- **Custom Hooks** - Lógica reutilizável
- **Context API** - Gerenciamento de estado global

## ⚙️ Funcionalidades

### 1. Sistema de Autenticação
- Login seguro com JWT
- Gerenciamento de níveis de acesso
- Recuperação de senha
- Proteção de rotas

### 2. Gerenciamento de Estações
- Dashboard de estações
- Visualização em tempo real
- Histórico de medições
- Geolocalização

### 3. Monitoramento de Parâmetros
- Configuração de parâmetros
- Visualização de dados
- Gráficos e relatórios
- Exportação de dados

### 4. Sistema de Alertas
- Configuração de notificações
- Histórico de alertas
- Níveis de prioridade
- Integração com backend

## 📚 Rotas

### Páginas Principais
```typescript
/                   # Landing Page
/login              # Página de login
/estacao            # Gerenciamento de estações
/usuario            # Gestão de usuários
/tipo-parametro     # Configuração de parâmetros
/alertas            # Sistema de alertas
```

### Componentes
- Layouts responsivos
- Formulários validados
- Tabelas dinâmicas
- Gráficos interativos

## 🚦 Como Executar

### Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- Docker (opcional)

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/Sync-FATEC/API-4-FRONT.git
cd seu-repositorio
```

2. Instale as dependências
```bash
npm install
```

3. Configure o ambiente
```bash
cp .env.example .env
# Configure as variáveis no arquivo .env
```

4. Inicie o servidor
```bash
# Desenvolvimento
npm run dev
```

### Scripts Disponíveis
- `npm run dev`: Ambiente de desenvolvimento
- `npm run build`: Compilação para produção
- `npm run preview`: Visualização da build
- `npm run lint`: Execução do linter
- `npm run format`: Formatação do código

## 📁 Estrutura de Diretórios
```
src/
├── api/              # Serviços de API
├── components/       # Componentes reutilizáveis
├── contexts/        # Contextos React
├── enums/           # Enumeradores
├── hooks/           # Hooks personalizados
├── pages/           # Páginas da aplicação
├── static/          # Recursos estáticos
├── types/           # Definições de tipos
└── utils/           # Funções utilitárias
```

## 👥 Time

| Nome | Função |
|------|--------|
| João Gabriel Solis | Scrum Master |
| Ana Laura Moratelli | Product Owner |
| Ana Clara Marques | Desenvolvedora |
| Erik Yokota | Desenvolvedor |
| Filipe Colla | Desenvolvedor |
| Kauê Francisco | Desenvolvedor |

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.