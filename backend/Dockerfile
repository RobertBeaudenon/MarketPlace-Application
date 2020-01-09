#importing the latest nodeJS image
FROM node:latest

#where our app will live in the container
WORKDIR /usr/src/app

#install the dependencies 
COPY package*.json ./
RUN npm install

#we move the rest of files/folders in our container
COPY . .

#port on which backend runs on
EXPOSE 3000

#under package.json we can see that we have a script for that that will run node server
CMD ["npm", "start"]