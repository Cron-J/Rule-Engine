# Classification-Attribute

## Features:

1. Isomorphic Flux using:
 - [alt](https://github.com/goatslacker/alt) for Flux implementation
 - [iso](https://github.com/goatslacker/iso) to help with bootstrapping data for isomorphic Flux
 - [react-router](https://github.com/rackt/react-router)
2. Stores storing data using [ImmutableJS](https://github.com/facebook/immutable-js) data structures
3. [Css Modules](https://github.com/webpack/css-loader#css-modules)
4. Webpack [config file](https://github.com/choonkending/react-webpack-node/blob/master/webpack.config.js)
5. [React Bootstrap](http://react-bootstrap.github.io/)
6. Express server
7. Sequalize for Postgres

## Mission

The aim of this repo is to incorporate the best practices to building a non-trivial apps with Reactjs and Node.

## Instructions(for development)

1. `npm install`
2. `npm run buildDev`
3. `node server/index.js`

### Development build

We use [react-hot-loader](https://github.com/gaearon/react-hot-loader), which is about the greatest thing that has ever happened. No browser refreshes needed.

1. `npm run dev` to build with webpack and start the server. We use webpack-dev-server as a proxy server to serve assets. Changes made are not saved to disk, as that is not what webpack-dev-server is for. However, `npm run watchDev` IF you want to reload the page and see the change in the server-rendered React.