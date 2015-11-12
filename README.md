# express\_seed

## What is this?
A seed expressjs application

## What does this provide
* asset compilation
* mvc style architecture
* database & ORM support (using knex + bookshelf)

## Structure


```
├── README.md
├── app
│   ├── assets
│   ├── controllers
│   ├── helpers
│   ├── index.js
│   ├── middleware
│   ├── models
│   ├── utilities
│   └── views
├── bin
│   └── www
├── config
│   └── assets.js
├── del
├── gen
├── knexfile.js
├── package.json
├── scripts
│   └── setup.js
└── templates
    ├── controller.js
    ├── helper.js
    ├── middleware.js
    └── model.js
```

### config/assets
All asset specific configurations exist in this file. See [Mincer](https://github.com/nodeca/mincer)

### app/index.js
Loads the entire application. Look at it.

### app/assets
Define all assets css,js here. also load images.

### app/controllers
All controllers get loaded into this directory. The controller interface is fairly straightforward (uses the built in express.Router). See the *generator* usage below

### app/helpers
Loads helper classes/singletons to be utilized in your controllers/models. See the *generator* usage below

### app/middleware
All middleware related files are stored here. This includes route loading, asset loading, default error conditions, etc. See the *generator* usage below. Note that middleware does not get dynamically loaded. You must manually require your middleware module in app/middleware/index.js

### app/models
Define models here. By default, the database adapter is **postgresql**. The ORM used is [bookshelf](http://bookshelfjs.org/). See the *generator* usage below

### app/utilities
Loads in utility modules necessary for the application.

### app/views
Define your views here. Default template engine is [Jade](http://jade-lang.com/). This can be changed in **app/middleware/View**

---

## generators & deleters
For convenience, there are generator and deleter scripts for
* Helpers
* Controllers
* Models
* Middleware

### Usage

```bash
$ ./gen -h

gen [controller,middleware,model,helper] NAME


$ ./del -h

del [controller,middleware,model,helper] NAME

```

#### controllers

```bash
$ ./gen controller users

usersController generated in app/controllers/usersController
```


```js
//app/controllers/usersController/index.js
/**
 * usersController
 * baseurl: /users
 */

exports.inject = 'Controller';
exports.load = function(Controller) {
  /**
   * define
   * takes 2 paramaters
   * @param {string} name - name of controller
   * @param {object} definition - properties/methods/routes attached to the controller
   *
   * @param definition.url - url(string) that the injected router instance will live under
   * @param definition.register - a function with a new express.Router instance. define all routes on that instance
   */

  Controller.define('usersController', {
    /**
     * baseurl for your router to exist under
     */
    url: '/users',
    /**
     * Define the routes on the express.Router instance that is available to you here
     */
    register: function(router) {

      router.get('/', function(req, res, next) {
        res.send('I am the usersController');
      });

    }
  });
};
```


#### middleware

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

#### models

```bash
$ ./gen model User

UserModel generated in app/models/User
```


```js
//app/models/User/index.js
/**
 * User
 */

exports.inject = 'Model';
exports.load = function(Model) {
  /**
   * define
   * takes 3 parameters
   * @param {string} name - name of your model or collection (usually capitalized)
   * @param {string} type - "model" or "collection" (all lowercase)
   * @param {object} definition - the object definition (uses bookshelf.js)
   */

  Model.define('User', 'TBD', {

  });
};

```


#### helpers

```bash
$ ./gen helper User

UserHelper generated in app/helpers/UserHelper

```


```js
//app/helpers/UserHelper/index.js
/**
 * UserHelper
 */

exports.inject = 'Helper';
exports.load = function(Helper) {

  Helper.define('UserHelper', {
    /**
     * properties or methods to define on the helper
     */
  });
};

```

---

## Scripts (package.json)
* start
  * the basic npm start command (starts the server)
* db
  * a wrapper around [knex](http://knexjs.org/) executable. Use this for creating, updating, & removing migration scripts
* setup
  * create
    * create the database as defined in the **knexfile.js** for the specified NODE_ENV (default *development*)
  * drop
    * drop the database as defined in the **knexfile.js** for the specified NODE_ENV (default *development*)


## Install & Run

```
git clone <url>
cd express_seed
npm install

// change the name the names of some stuff to your app name (or not)
// then run below

npm start
```
