# stage 1 : build the project that will generate the dist file

FROM node:latest as node
WORKDIR /app
COPY  . .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist /usr/share/nginx/html

#check advantages of using volume and copy , volumes will allows you to just rerun the container each time you update yr code, whereas copy we need to rebuild the image

#VOLUME /Users/robertbeaudenon/Desktop/Web-Chat-Application/dist:/usr/share/nginx/html

EXPOSE 80