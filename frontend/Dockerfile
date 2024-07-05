FROM node:alpine AS build

RUN yarn global add serve

WORKDIR /app

COPY . /app/

RUN yarn install && yarn build

FROM nginx:alpine

COPY --from=build /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]