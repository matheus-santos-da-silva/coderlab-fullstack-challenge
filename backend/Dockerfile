FROM node:alpine AS build-backend

WORKDIR /app
COPY . .
RUN yarn install
CMD ["sh", "-c", "yarn prisma generate && yarn prisma db push && yarn run seed && yarn run build && yarn run start:prod"]
