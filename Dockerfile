# Use a Node.js imagem base (ajuste a versão conforme necessário)
FROM node:18-alpine

# Definir o diretório de trabalho no container
WORKDIR /usr/src/app

# Copiar o package.json e package-lock.json para instalar as dependências
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o código da aplicação para o container
COPY . .

RUN npx prisma generate

# Criar o diretório para os arquivos de build
RUN mkdir /usr/src/app/build

# Build da aplicação
RUN npm run build

# Expor a porta (ajuste a porta conforme necessário)
EXPOSE 3333

# Comando para iniciar a aplicação
CMD [ "npm", "start" ]
