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
All asset specific configurations exist in this file. See [Mincer](https://github.com/nodeca/mincer). See [asset helpers](#asset_helpers) below

### app/index.js
Loads the entire application. Look at it.

### app/assets
Define all assets css,js here. also load images.

### app/controllers
All controllers get loaded into this directory. The controller interface is fairly straightforward (uses the built in express.Router). See the [generator](#generator) usage below

### app/helpers
Loads helper classes/singletons to be utilized in your controllers/models. See the [generator](#generator) usage below

### app/middleware
All middleware related files are stored here. This includes route loading, asset loading, default error conditions, etc. See the [generator](#generator) usage below. Note that middleware does not get dynamically loaded. You must manually require your middleware module in app/middleware/index.js

### app/models
Define models here. By default, the database adapter is **postgresql**. The ORM used is [bookshelf](http://bookshelfjs.org/). See the [generator](#generator) usage below

### app/utilities
Loads in utility modules necessary for the application.

### app/views
Define your views here. Default template engine is [Jade](http://jade-lang.com/). This can be changed in **app/middleware/View**

---

## generators & deleters<a name="generator"></a>
For convenience, there are generator and deleter scripts for
* [Helpers](#gen_helpers)
* [Controllers](#gen_controllers)
* [Models](#gen_models)
* [Middleware](#gen_middleware)


### Usage


```bash
$ ./gen -h

gen [controller,middleware,model,helper] NAME


$ ./del -h

del [controller,middleware,model,helper] NAME

```

#### controllers<a name="gen_controllers"></a>

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


#### middleware<a name="gen_middleware"></a>


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

#### models<a name="gen_models"></a>


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


#### helpers<a name="gen_helpers"></a>


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

### Asset helpers<a name="asset_helpers"></a>
Since this uses [Mincer](https://github.com/nodeca/mincer), there are some asset helpers in place for your views.

* css
  * returns an html link tag with the normalized asset path
* js
  * return an html script tag with the normalized asset path
* asset_path
  * returns the string path to the asset. Useful for images (for which there is currently no helper)

Lets say we have assets like so

**app/assets/javascripts/hello.js**

```js
window.hello = function() {
  return 'hello world!';
};
```

**app/assets/javascripts/application.js**

```js
//= require ./hello
console.log(hello());

```

**app/views/index.jade**

```jade
extends layout

block js
// make sure to use the escape sequence
  != js('application.js')

block content
  h1 This is my index file!
```

---


## Scripts (package.json)

```json
...
  "scripts": {
    "start": "DEBUG=*:server node ./bin/www",
    "db": "node ./node_modules/.bin/knex",
    "setup": "node scripts/setup.js"
  },
...
```

```bash
$ npm start
> express_seed@0.0.0 start /path/to/express_seed
> DEBUG=*:server node ./bin/www

  express_seed:server Listening on port 3000 +0ms

```
```bash
# this is just a wrapper around the knex executable
npm run db

> express_seed@0.0.0 db /path/to/express_seed
> node ./node_modules/.bin/knex


  Usage: knex [options] [command]


  Commands:

    init [options]                         Create a fresh knexfile.
    migrate:make [options] <name>         Create a named migration file.
    migrate:latest                         Run all migrations that have not yet been run.
    migrate:rollback                       Rollback the last set of migrations performed.
    migrate:currentVersion                View the current version for the migration.
    seed:make [options] <name>            Create a named seed file.
    seed:run                              Run seed files.

  Options:

    -h, --help         output usage information
    -V, --version      output the version number
    --debug            Run with debugging.
    --knexfile [path]  Specify the knexfile path.
    --cwd [path]       Specify the working directory.
    --env [name]       environment, default: process.env.NODE_ENV || development

```

```bash
# setup the database
npm run setup


> express_seed@0.0.0 setup /Users/navneetgarg/projects/node/express_seed
> node scripts/setup.js

USAGE:
     NODE_ENV=[production,development,staging] npm run setup [create,drop]
     => default: development

```

## Install & Run

```
git clone <url>
cd express_seed
npm install

// change the name the names of some stuff to your app name (or not)
// then run below
npm setup create
npm start
```
