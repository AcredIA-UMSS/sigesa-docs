FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY gateway ./gateway
RUN npm install -w @sigesa/gateway && npm run build -w @sigesa/gateway

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/gateway/dist ./dist
COPY --from=build /app/gateway/package.json ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 8080
CMD ["node", "dist/main.js"]
