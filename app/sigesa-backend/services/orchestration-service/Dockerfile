FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY shared ./shared
COPY services/orchestration-service ./services/orchestration-service
RUN npm install -w @sigesa/shared -w @sigesa/orchestration-service
RUN npm run build -w @sigesa/shared && npm run build -w @sigesa/orchestration-service

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/services/orchestration-service/dist ./dist
COPY --from=build /app/services/orchestration-service/package.json ./
COPY --from=build /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 3003
CMD ["node", "dist/main.js"]
