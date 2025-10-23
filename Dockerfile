# Etapa de build
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Etapa de produção
FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pm2
COPY --from=build /app/package*.json ./
COPY --from=build /app/dist ./dist
COPY --from=build /app/ecosystem.config.cjs ./
RUN npm ci --omit=dev

EXPOSE 3002
CMD ["pm2-runtime", "ecosystem.config.cjs"]