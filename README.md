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
│   ├── middleware
│   ├── utilities
│   └── views
├── bin
│   └── www
├── config
│   └── assets.js
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
1. every controller file will export a **load** method which gets passed a controller instance
1. the controller instance acts as a wrapper around **app.use**, utilizing the **register** method (see example below)
1. there are no strict conventions for file naming


```
app/controllers/users_controller.js
or
app/controllers/users_controller/index.js

module.exports = function(controller) {
  /**
    * this is essentially a wrapper around app.use
    * controller.register(url, callback(router) {
    *    ... routing ...
    * });
    */

  controller.register('/users', function(router) {
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

1. An object (called "middleware) with a method **load** must be exported
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
