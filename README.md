# express\_seed

## What is this?
A seed expressjs application

## What does this provide
* asset compilation
* mvc style architecture

## Structure

```
├── README.md
├── app
│   ├── assets
│   ├── controllers
│   ├── index.js
│   ├── lib
│   ├── middleware
│   ├── utilities
│   └── views
├── bin
│   └── www
├── config
│   ├── assets.js
│   └── index.js
├── del
├── gen
├── package.json
└── templates
    ├── controller.js
    └── middleware.js
```


### app/index.js
Loads the relevant controller + middleware information into the application

### app/utilities
Loads in utility modules necessary for the application.

### app/controllers
All controllers get loaded into this directory. The controller interface is fairly straightforward (uses the built in express.Router)


#### controller interface
Some utilities have been put in place, for ease of use. You'll never have to do ``app.use`` directly.

#### controller conventions
Use the **generator** helper script to scaffold out a new controller. e.g.

```bash
$ ./gen controller users

usersController generated in app/controllers/usersController
```

```js
//app/controllers/usersController/index.js

exports.inject = 'Controller';
exports.load = function(Controller) {
  var usersController = Controller.create('usersController', '/users');

  usersController.register(function(router) {

    /* GET (index) Users */
    router.get('/', function(req, res) {
      res.send("Users!!");
    });

  });

  return usersController;
};
```


### app/middleware
All middleware related files are stored here. This includes route loading, asset loading (not relevant for this app), default error conditions, etc.

#### middleware conventions
Use the **generator** helper script to scaffold out a new middleware singleton . e.g.

```bash
$ ./gen middleware Auth

AuthMiddleware generated in app/middleware/Auth
```

```js
//app/middleware/Auth/index.js
/**
 * AuthMiddleware Singleton
 * uses app
 */

/**
 * @class AuthMiddleware
 */
var AuthMiddleware = {
  inject: 'app',
  load: function(app) {
  }
};

module.exports = AuthMiddleware;
```

1. Once completely defined, it should be added to the **app/middleware/index.js** load sequence
1. It should **NOT** be loaded after the error middleware (unless there are special circumstances requiring it so)

### config/assets
All asset specific configurations exist in this file. See [Mincer](https://github.com/nodeca/mincer)

## Install & Run

```
git clone <url>
cd express_seed
npm install

npm start
```
