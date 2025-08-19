FROM node:18-alpine

WORKDIR /usr/src/app
COPY package*.json ./
ENV NODE_ENV=production
RUN npm ci --omit=dev || npm i --omit=dev
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
