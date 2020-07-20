# Frontend for bitcoin-analyzer project

By [Clément Ronzon](https://www.linkedin.com/in/clemrz/). Licensed under [MIT License](https://choosealicense.com/licenses/mit/).

This is the front-end implementation of a Bitcoin price analyzer.
This price analyzer displays a graph with the price trends of the Bitcoin.

It is set to display the last 24 hours by, a datepicker range filter allows the user to change the timeline range.

When the filter is changed, the graph is redrawn to reflect the new filter.

## With Docker

Clone this repository on your machine:

```shell script
$ git clone https://github.com/ClemRz/bitcoin-analyzer-front.git
$ cd bitcoin-analyzer-front
```

### Development environment

~~TODO clement, might disappear with docker-compose: 
First change the `proxy` url in `package.json` to point to your api server.~~

Make sure the `.env` is set according to your environment.

At the root of the project, run:

```shell script
$ docker build -t clemrz/bitcoin-analyzer-front:dev
$ docker run -it --rm -v ${PWD}:/app -v /app/node_modules -p 3001:3000 -e CHOKIDAR_USEPOLLING=true --name ba_front_dev clemrz/bitcoin-analyzer-front:dev
```

Then visit http://<docker-machine-ip>:3001/

### Production environment

Make sure the `.env` is set according to your environment.

At the root of the project, run:

```shell script
$ docker build -f Dockerfile.prod -t clemrz/bitcoin-analyzer-front:prod .
$ docker run -itd --rm -p 1337:80 --name ba_front_prod clemrz/bitcoin-analyzer-front:prod
```

Then visit http://<docker-machine-ip>:1337/

## Without Docker

Clone this repository on your machine:

```shell script
$ git clone https://github.com/ClemRz/bitcoin-analyzer-front.git
$ cd bitcoin-analyzer-front
```

### Requirements

This application needs `Node v13.9` or later.

### Dependencies

Dependencies are managed via `npm` (or `yarn`).

To install the dependencies run at the root of the project:

```shell script
$ npm install
```

### For developpers

First change the `proxy` url in `package.json` to point to your api server.

Make sure the `.env` is set according to your environment.

You can start and run the app locally by running:

```shell script
$ npm start
```

### Deployment on production

Make sure the `homepage` field in `package.json` is matching the directory of your target.

Make sure the `.env` is set according to your environment.

Build the assets:

```shell script
$ npm build
```

Then copy all the files and folders that are inside the `build` directory to your public location.

`index.html` is the entry-point for the users.
