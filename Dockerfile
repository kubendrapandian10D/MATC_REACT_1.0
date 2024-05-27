FROM node:18-alpine as build

WORKDIR /app

COPY . .

RUN npm install 

RUN npm run build

FROM nginx:1.21.0-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 3000:80

CMD ["nginx", "-g", "daemon off;"]
