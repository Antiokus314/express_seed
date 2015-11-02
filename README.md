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
└── package.json
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
1. every controller file will export an **inject** property, either a **string** or **array of strings** representing the objects required for this controller.
1. every controller file will export a **load** property, which is a function that has the above injected modules.
1. the controller instance acts as a wrapper around **app.use**, utilizing the **register** method (see example below)
1. there are no strict conventions for file naming

```
app/controllers/usersController.js
or
app/controllers/usersController/index.js

exports.injector = 'Controller';
exports.load = function(Controller) {
  var usersController = Controller.create('usersController', '/users');
  /**
   * this is essentially a wrapper around express.Router, which then calls app.use internally
   * controller.register(callback(router) {
   *    ... routing ...
   * });
   */

  usersController.register(function(router) {
    /**
     * this is just the regular express.Router. Nothing fancy here
     */

    /* GET (index) Users */
    router.get('/', function(req, res) {
      res.send("Users!!");
    });
  });
}
```


### app/middleware
All middleware related files are stored here. This includes route loading, asset loading (not relevant for this app), default error conditions, etc.

#### middleware conventions
When adding your own middleware methods/files there are a few conventions in place.

1. If certain modules in the application are necessary, add an **inject** property to the exports object
1. Must export a **load** function if injected modules are required
1. The exporting is done at the bottom of the file
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
