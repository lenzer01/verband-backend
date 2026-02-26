
FROM node:24.11.1-bookworm-slim AS build_stage

WORKDIR /verbandbuch-ms

COPY . .

RUN npm ci
RUN npm run build

FROM node:24.11.1-bookworm-slim AS prod_stage

WORKDIR /verbandbuch-ms

COPY --from=build_stage /verbandbuch-ms/dist ./dist
COPY --from=build_stage /verbandbuch-sm/package*.json ./

RUN npm ci --only=prod

USER node

ENV TZ=Europe/Berlin

CMD ["node","dist/server.js"]
EXPOSE 3000



