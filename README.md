### Deploy App

<h4>Step 1 - Clone Repository</h4>

Open up a terminal or command prompt on your OS of choice (Windows/Linux/Mac), and
enter the following commands in a directory where you want to project to be stored:

    git clone --recursive https://github.com/RobertBeaudenon/MarketPlace-Application.git
    cd MarketPlace-Application
    git submodule update --remote

<h4>Step 2 - Use correct branch</h4>
For the first version of the website:

    git checkout payment-service

For the second version of the website:

    git checkout payment-service-experiment

<h4>Step 3 - Run backend</h4>

In the the root directory of the project:

    cd backend/

Afterwards, run by entering the following:

    node server
    or
    nodemon server

<h4>Step 4 - Build and Run UI</h4>

Navigate in a NEW terminal or command prompt to the directory of the project. Once there enter the following commands:

    npm install
    npm install -g @angular/cli

At this point, you should be able to run the project with the following command:

    ng serve

<h4>Step 5 - Run MongoDB</h4>

Install MongoDB (version 3.6 or higher)

(step1) : Note file path where you install MongoDB 'bin'

    https://www.mongodb.com/what-is-mongodb

(step2) : you might have to create a data/db folders where all the mongoDB data will be stored read carefully the instructions

For Mac:

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

For windows:

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Navigate in 'bin' folder and run: (cd bin)

     mongod

At this point, the server should be running on port 4200, and
you should be able to view the webserver on port 4200.

<h2>Prerequisites</h2>
    
    - git version 1.6.5 or higher
    - Docker/Docker-Compose (Recommended)
    or
    - git version 1.6.5 or higher
    - NPM
    - MongoDB
    
For installation of these software applications see the below links:

For git:

https://git-scm.com/book/en/v2/Getting-Started-Installing-Git

For docker and docker-compose on Windows:

    https://docs.docker.com/docker-for-windows/install/

For docker and docker-compose on Mac:

    https://docs.docker.com/docker-for-mac/install/

For docker on Ubuntu:

    https://docs.docker.com/install/linux/docker-ce/ubuntu/

For docker-compose on Ubuntu:

    https://docs.docker.com/compose/install/

For installing npm:

    https://nodejs.org/en/

For installing MongoDB:

https://docs.mongodb.com/manual/installation/

<h2>Deploying the System</h2>

<h3>With Docker and Docker Compose (Recommended)</h3>

You will need the following installed on your computer:

    - git version 1.6.5 or higher
    - Docker and Docker-Compose

<h4>Step 1 - Clone Repository</h4>

Open up a terminal or command prompt on your OS of choice (Windows/Linux/Mac), and
enter the following commands in a directory where you want to project to be stored:

    git clone --recursive https://github.com/RobertBeaudenon/MarketPlace-Application.git
    cd MarketPlace-Application
    git submodule update --remote

<h5>Note: It is very import to specify to git to clone the repository recursively 
or else the submodules won't be cloned, and hence part of the project won't be cloned</h5>

<h4>Step 2 - Deploy</h4>

In the terminal run the following command in your terminal or command prompt and
enter the following command in the directory of the project:

    docker-compose up

At this point docker will build and deploy the containers and the web server will be hosted
on port 80. (http://localhost:80)

<h4>Step 3 - Build (Optional)</h4>

If you desire to see the docker images build instead of pulling them from dockerhub,
feel free to run the following commands to build and run the appropriate containers:

    docker-compose build
    docker-compose up

<h3>Deploying the System Manually (Not Recommended)</h3>

You will need the following installed on your computer:

    - git version 1.6.5 or higher
    - NPM

<h4>Step 1 - Clone Repository</h4>

Open up a terminal or command prompt on your OS of choice (Windows/Linux/Mac), and
enter the following commands in a directory where you want to project to be stored:

    git clone --recursive https://github.com/RobertBeaudenon/MarketPlace-Application.git
    cd MarketPlace-Application
    git submodule update --remote

<h5>Note: It is very import to specify to git to clone the repository recursively 
or else the submodules won't be cloned, and hence part of the project won't be cloned</h5>

<h4>Step 2 - Build and run Node</h4>

In the the root directory of the project:

    cd backend/

Afterwards, run by entering the following:

    node server
    or
    nodemon server

<h4>Step 3 - Build and Run UI</h4>

Navigate in a NEW terminal or command prompt to the directory of the project. Once there enter the following commands:

    npm install
    npm install -g @angular/cli

At this point, you should be able to run the project with the following command:

    ng serve

<h4>Step 4 - Run MongoDB</h4>

Install MongoDB (version 3.6 or higher)

(step1) : Note file path where you install MongoDB 'bin'

    https://www.mongodb.com/what-is-mongodb

(step2) : you might have to create a data/db folders where all the mongoDB data will be stored read carefully the instructions

For Mac:

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

For windows:

    https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/

Navigate in 'bin' folder and run: (cd bin)

     mongod

At this point, the server should be running on port 4200, and
you should be able to view the webserver on port 4200.
