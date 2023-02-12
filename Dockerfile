FROM node:18-alpine3.17 AS data-processor

WORKDIR /app
ADD . .
RUN npm ci
RUN npm run build data-processor

CMD ["npm", "run", "start", "data-processor"]


FROM node:18-alpine3.17 AS alert-monitor

WORKDIR /app
ADD . .
RUN npm ci
RUN npm run build alert-monitor

CMD ["npm", "run", "start", "alert-monitor"]


FROM node:18-alpine3.17 AS alert-handler

WORKDIR /app
ADD . .
RUN npm ci
RUN npm run build alert-handler

CMD ["npm", "run", "start", "alert-handler"]
