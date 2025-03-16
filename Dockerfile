FROM node:18-alpine as build

WORKDIR /app

COPY package.json package-lock.json ./

# Garante que o Rollup seja instalado na versão compatível
RUN npm install rollup@3 --save-dev && npm install

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
