# ---- Stage 1: build React (waste) ----
FROM node:20-alpine AS ui
WORKDIR /ui
COPY waste/package*.json ./
RUN npm ci
COPY waste/ ./
RUN npm run build
# รองรับทั้ง CRA(build/) และ Vite(dist/)
RUN mkdir -p /out \
 && if [ -d build ]; then cp -r build/* /out/; fi \
 && if [ -d dist ];  then cp -r dist/*  /out/; fi

# ---- Stage 2: API + serve static ----
FROM node:20-alpine
WORKDIR /app
COPY api/package*.json ./
RUN npm ci --only=production
COPY api/ ./
# เอาไฟล์ React ที่ build แล้วมาเสิร์ฟ
COPY --from=ui /out ./public

ENV NODE_ENV=production
ENV PORT=10783
EXPOSE 10783
CMD ["node", "server.js"]
