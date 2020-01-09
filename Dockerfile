# stage 1 : build the project that will generate the dist file

FROM node:latest as node
WORKDIR /app
COPY  . .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html