![biTid](https://www.bitid.co.za/assets/icons/icon-72x72.png "biTid")

# biTid Store

The **Store Application/Service** manages stores

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

* [Node](https://nodejs.org)
* [MongoDB](https://www.mongodb.com/download-center/community)

### Installing

```
  $ git clone git@github.com:bitid-open-source-iot/store.git
  $ cd store/
  $ cp config.template.json config.json
  # swap out "xxx" for real values
  $ mkdir logs
  $ npm i
  $ nodemon
```

## Testing

We use [Mocha](https://mochajs.org) together with [Chai](https://www.chaijs.com) to run automated tests against all our apis. Complete the procedure below to test your version of store:

#### Installation
```
  $ cd test/
  $ cp config.template.json config.json
  $ nano config.json
  # swap out "xxx" for real values
```

#### Running
```
  # open terminal
  
  $ cd store/
  # cd into project folder
  
  $ nodemon store.js
  # run the service
  
  # open new terminal
  
  $ mocha
  # run mocha test
```

## Deployment

```
  $ cd store/
  $ nano config.json
  # swap out "xxx" for real values
  # set production = true
  $ nodemon
```

## Built With

* [Node.js](https://nodejs.org) - Middleware
* [Angular](https://angular.io) - Application
* [MongoDB](https://www.mongodb.com) - Database


## Versioning

For the versions available, see the [tags on this repository](https://github.com/bitid-open-source-iot/store/tags). 

## Authors

* [Shane Bowyer](https://github.com/shanebowyer)
* [Clayton Constant](https://github.com/claytoncc)

## License

This project is licensed under the Apache License (Version 2) - see the [LICENSE](LICENSE) file for details