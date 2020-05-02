<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[travis-image]: https://api.travis-ci.org/nestjs/nest.svg?branch=master
[travis-url]: https://travis-ci.org/nestjs/nest
[linux-image]: https://img.shields.io/travis/nestjs/nest/master.svg?label=linux
[linux-url]: https://travis-ci.org/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="blank">Node.js</a> framework for building efficient and scalable server-side applications, heavily inspired by <a href="https://angular.io" target="blank">Angular</a>.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
<a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
<a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
<a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec"><img src="https://img.shields.io/badge/Donate-PayPal-dc3d53.svg"/></a>
  <a href="https://twitter.com/nestframework"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov``

# database (Postgres with docker)

As we want to follow using docker, here you will find how to configure the Postgres database with docker for our local development environment. Make sure that you have the docker installed and running in your machine.

First we need to run the following command to get the postgres image .

    docker pull postgres

After finishing the image download, we will run the command:

    docker run --name postgres -e POSTGRES_PASSWORD={password} -d -p 5432:5432 postgres

It will create and start the postgres docker container, using the default user **postgres** and the password **12345678a** to connect to the database.
Now we will create the database to our application.

Run the following command to open the container bash terminal.

    docker exec -it postgres /bin/bash

Now inside the container, lets run the command:

    psql -h localhost -U postgres -W

After running the previous command the database password will be asked. Type the password in the terminal.

You will receive a feedback in the terminal. Now you are connected to the postgres. Now we just need to create the database. Just run the following command:

     create database bloggering;

Now you can list all databases to check

     \list (\l)

And connect to the new database

    \connect (\c) bloggering

Database configuration comes from enviroment variables:
    TYPEORM_HOST
    TYPEORM_PORT
    TYPEORM_USERNAME
    TYPEORM_PASSWORD
    TYPEORM_DATABASE

## Initialize Containers (including Nest app)

See [Adding Docker with multi-stage build](https://blog.logrocket.com/containerized-development-nestjs-docker/)

```bash
docker-compose --project-name bloggering up --build --renew-anon-volumes --detach
(or)
docker-compose -p bloggering up --build -V -d

docker-compose -p bloggering down
```
Once you rename the project directory to the app you want to build, you can drop the project flag for 'bloggering' in the example above. It just names the network to be consistent with the container names from docker-compose.yml.

## Running the Nest app locally (not in a container)

First, comment out the api service in docker-compose.yml file and restart other services, or just issue this command to the Docker host (with container name):
```bash
docker stop api
```
Then:
```bash
# download node_modules (directory in .gitignore)
$ npm install

# watch mode (TypeScript, main.ts)
$ npm start:local

# build mode (JavaScript, main.js)
$ npm build
$ npm start:dev
```



https://blog.logrocket.com/containerized-development-nestjs-docker/

## License

  Nest and this project are [MIT licensed](LICENSE).
