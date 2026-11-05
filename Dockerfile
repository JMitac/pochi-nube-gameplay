# ---- Compilación ----
FROM node:24.11.0-alpine AS build
WORKDIR /app
RUN corepack enable
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build
RUN pnpm --filter @pochi/server deploy --prod --legacy /out

# ---- Imagen final ----
FROM node:24.11.0-alpine
ENV NODE_ENV=production PORT=2567
WORKDIR /app/apps/server
COPY --from=build /out/package.json ./package.json
COPY --from=build /out/node_modules ./node_modules
COPY --from=build /app/apps/server/dist ./dist
COPY --from=build /app/apps/client/dist ../client/dist
EXPOSE 2567
CMD ["node", "dist/index.js"]
LABEL org.opencontainers.image.source=https://github.com/JMitac/pochi-nube-gameplay