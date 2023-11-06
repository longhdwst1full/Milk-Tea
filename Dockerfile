FROM node:16-alpine as build

WORKDIR /app
COPY package.json .
COPY vite.config.ts .
COPY tailwind.config.js .
COPY postcss.config.js .
COPY tsconfig.json .
COPY tsconfig.node.json .

RUN rm -rf node_modules

RUN npm cache clean --force
RUN rm /usr/local/bin/yarn
RUN rm /usr/local/bin/yarnpkg && npm install -g yarn
RUN yarn install --production --silent




COPY . .

RUN yarn build

FROM nginx:alpine
# COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

