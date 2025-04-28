  FROM node:alpine AS builder

  WORKDIR /app
  COPY . .
  RUN yarn install
  RUN yarn build

  FROM nginx:alpine
  
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /usr/share/nginx/html