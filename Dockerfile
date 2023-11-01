FROM node:18-alpine as build

WORKDIR /app
COPY package.json .
COPY vite.config.ts .
COPY tailwind.config.js .
COPY  postcss.config.js .
RUN rm /usr/local/bin/yarn
RUN rm /usr/local/bin/yarnpkg && npm install -g yarn


# RUN yarn add @vitejs/plugin-react -D
# RUN yarn add vite-tsconfig-paths --dev
# RUN yarn add tsc -g
# RUN yarn add tailwindcss --dev
# RUN yarn add autoprefixer --dev

# RUN yarn add vite -D
RUN yarn


COPY . .


RUN yarn build



# Bundle static assets with nginx
# FROM nginx:1.12.3

# # Copy built assets from builder
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# # Copy the built React app from the previous stage
# # COPY --from=builder  /app/dist /usr/share/nginx/html

# # Expose port 80
# EXPOSE 80

# Start NGINX server
# CMD ["nginx", "-g", "daemon off;"]
FROM nginx:1.17-alpine as production-stage
COPY --from=build-stage /app/build /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]

