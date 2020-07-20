# Frontend for bitcoin-analyzer project

By [Clément Ronzon](https://www.linkedin.com/in/clemrz/).

Licensed under [MIT License](https://choosealicense.com/licenses/mit/)

## Dependencies

This application needs `Node v13.9`.

Dependencies are managed via `yarn` or `npm`.
Let's assume you have `yarn` installed.

To install the dependencies run at the root of the project:

```shell script
$ yarn install
```

## For developpers

First change the `proxy` url in `package.json` to point to your api server.

Make sure the `.env` is set according to your environment.

You can start and run the app locally by running:

```shell script
$ yarn start
```

## Deployment on production

Make sure the `homepage` field in `package.json` is matching the directory of your target.

Make sure the `.env` is set according to your environment.

Build the assets:

```shell script
$ yarn build
```

Then copy all the files and folders that are inside the `build` directory to your public location.

`index.html` is the entry-point for the users.
