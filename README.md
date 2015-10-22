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
│   └── views
├── bin
│   └── www
├── config
│   ├── assets.js
│   └── routes.js
└── package.json

```

### app/index.js
Loads the relevant controller + middleware information into the application

### app/controllers
All controllers get loaded into this directory. Using a very "rails"-esque interface with restful actions, the routing layer
underneath can be viewed [here](https://www.npmjs.com/package/express-resource-routing). In this application, the routes are
declared inside **app/middleware/routes.js** file.

#### controller interface
if in routes.js file you have "routing.resources(app, dir, "users")", a complete set of restful actions are expected on **users_controller.js** (note the naming conventions), with a set of endpoints corresponding to those actions at **"/users"**.
e.g.


```
app/middleware/routes.js


...
routing.resources(app, controllerDir, "users");
...
```


```
app/controllers/users_controller.js


exports.index = function(req, res) {
//your code
}

exports.show = function(req, res) {
//your code
}

exports.new = function(req, res) {
//your code
}

exports.create = function(req, res) {
//your code
}

exports.edit = function(req, res) {
//your code
}

exports.update = function(req, res) {
//your code
}

exports.delete = function(req, res) {
//your code
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

### routing
Routing is done a two-step process.
1. Declare the route(s)
2. Create the controller

In order to create a new set of endpoints/routes you just modify the code in the **app/middleware/routes.js** file and add to the load section. [This](https://www.npmjs.com/package/express-resource-routing) is the current routing module used. The interface is utilized exactly as specified.

## Install & Run


```
git clone <url>
cd express_seed
npm install

npm start
```
