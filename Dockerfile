FROM node:16-alpine as build

WORKDIR /app
COPY package.json .
COPY vite.config.ts .
COPY tailwind.config.js .
COPY  postcss.config.js .
# RUN rm /usr/local/bin/yarn
RUN   npm install -g yarn 
RUN yarn --production --silent

COPY . .

RUN yarn build

FROM nginx:1.17-alpine as production-stage
COPY --from=build /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

