<h1><a href="https://github.com/diegoulloao/router-dex">Router Dex for Express</a></h1>

> Router-dex is a route and middleware inspector compatible with Express >= 4. It was initially developed as part of [bananasplit-js](https://github.com/bananasplit-js/bananasplit-js) but later moved as a standalone module.

## Installation
```zsh
yarn add router-dex | npm i router-dex
```

## Requirements
Express >= 4

## Integration as module script
`package.json`
```json
{
  "name": "your-project",
  "version": "1.0",
  "main": "index.js",
  "scripts": {
    "routes:list": "node -r router-dex ./app.js default"
  },
}
```

Just add the relative pathname to the file where your express application is exported.

If your application is exported under a namespace instead of default, then change it.

## Integration inside a script file
This implementation allows to you to do some stuffs before and after router-dex is executed.

`src/scripts/routes-list.js`
```js
const routerDex = require("router-dex/inspector")
const app = require("./src/app")

routerDex(app, "My App")

```

Then add the script to your `package.json`
```json
{
  "name": "your-project",
  "version": "1.0",
  "main": "index.js",
  "scripts": {
    "routes:list": "node src/scripts/routes-list.js"
  },
}
```

## Usage in any javascript file
Also is possible to get all the routes in a object notation format

```js
const { getAllRoutes } = require("router-dex/inspector")
const app = require("./src/app")

const { routes, sortedRoutes } = getAllRoutes(app)
```

You will get all the routes and all of them sorted by alphabet + base path + without parameters first.

**Example**
```js
{
  routes: [
    { path: '/store', method: 'GET', middlewares: [Array] },
    { path: '/products', method: 'GET', middlewares: [Array] },
    { path: '/users', method: 'GET', middlewares: [Array] }
  ],
  sortedRoutes: [
    { path: '/products', method: 'GET', middlewares: [Array] },
    { path: '/store', method: 'GET', middlewares: [Array] },
    { path: '/users', method: 'GET', middlewares: [Array] }
  ]
}
```

## Command-line filtering
Router Dex groups all routes by default. To filter by type, just add it at the end of the script call
```zsh
yarn routes:list store | npm run routes:list store
```

Also is possible to pass multiple
```zsh
yarn routes:list store products | npm run routes:list store products
```

Types passed must match exactly with the group name.

## Symbols and meanings
In the middleware column of the generated table you can see the following notations:
- `*`: means the middleware/controller function passed is binded `controller.bind(ref)`
- `anonymous`: means the middleware/controller function was passed directly into the router/app

Inside the middleware array of each route returned by `getAllRoutes` you can see the following notations:
- `bound middlewareName`: means the middleware/controller function passed in binded
- `<anonymous>`: means the middleware/controller function passed is anonymous

## Considerations: Avoid anonymous middlewares!
Instead of
```js
router.get("/products", (req, res) => {
  res.json({ status: 200 })
})
```

Use
```js
const { getProducts } = require("./src/controllers/products")
router.get("/products", getProducts)
```

Reason why is, when you are passing the middleware function directly into the app/router, you are losing track of the reference name to the function itself. This ocurrs because you are not storing it at memory in first place.

So, in that case you will receive a command-line warning like
```
* Do not use anonymous functions as middlewares, store them in a constant instead.
```

---
**2022 · Bananasplit-js**
