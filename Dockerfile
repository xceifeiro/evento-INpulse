# Etapa 1: Build da aplicação
FROM node:18-alpine AS builder

WORKDIR /app

# Copia package.json e package-lock.json (ou yarn.lock)
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia todo o código fonte
COPY . .

# Gera o build da aplicação
RUN npm run build

# Etapa 2: Criar a imagem final para produção
FROM node:18-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

# Copia apenas o necessário do build anterior
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expõe a porta que o Next usa (3000 por padrão)
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["npm", "start"]

ARG SUPABASE_URL
ARG SUPABASE_ANON_KEY

ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY

