# ---- Build stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci || npm i
COPY . .

# รับ API URL ตอน build (ต้องเริ่มต้นชื่อด้วย REACT_APP_ สำหรับ CRA)
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=${REACT_APP_API_URL}

# CRA จะสร้างโฟลเดอร์ "build"
RUN npm run build

# ---- Serve stage ----
FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
