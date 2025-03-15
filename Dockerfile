# Etapa 1: Build do React
FROM node:18-alpine as build

WORKDIR /app

# Copia o arquivo de dependências
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o código fonte
COPY . ./

# Faz o build da aplicação
RUN npm run build

# Etapa 2: Servir a aplicação com Nginx (Se desejar usar Nginx para produção)
FROM node:18-alpine

WORKDIR /app

# Copia os arquivos buildados da etapa anterior
COPY --from=build /app/build /app/build

# Expõe a porta para servir o frontend
EXPOSE 3000

# Comando para rodar o servidor da aplicação React
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
