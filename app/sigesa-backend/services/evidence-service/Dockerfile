FROM node:20-alpine AS build
WORKDIR /app
COPY package.json package-lock.json* ./
COPY shared ./shared
COPY services/evidence-service ./services/evidence-service
RUN npm install -w @sigesa/shared -w @sigesa/evidence-service
RUN npm run build -w @sigesa/shared && npm run build -w @sigesa/evidence-service

FROM node:20-alpine
WORKDIR /app
COPY --from=build /app/services/evidence-service/dist ./dist
COPY --from=build /app/services/evidence-service/package.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/shared/dist ./node_modules/@sigesa/shared/dist
COPY --from=build /app/shared/package.json ./node_modules/@sigesa/shared/package.json
ENV NODE_ENV=production
EXPOSE 3001
CMD ["node", "dist/main.js"]
