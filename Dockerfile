FROM node:17-alpine as builder
RUN mkdir -p /app

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build --prod

#FROM nginx:latest

#EXPOSE 4200 49153
#CMD ["npm", "start"]
