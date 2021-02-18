const Q = require('q');
const db = require('./db/mongo');
const cors = require('cors');
const http = require('http');
const auth = require('./lib/auth');
const chalk = require('chalk');
const express = require('express');
const responder = require('./lib/responder');
const bodyParser = require('body-parser');
const healthcheck = require('@bitid/health-check');

global.__base = __dirname + '/';
global.__logger = require('./lib/logger');
global.__settings = require('./config.json');
global.__responder = new responder.module();

try {
    var portal = {
        errorResponse: {
            "error": {
                "code": 401,
                "message": "Invalid Credentials",
                "errors": [{
                    "reason": "Portal Error",
                    "message": "Portal Error",
                    "location": "portal",
                    "locationType": "portal"
                }]
            },
            "hiddenErrors": []
        },

        api: (args) => {
            var deferred = Q.defer();

            try {
                var app = express();
                app.use(cors());
                app.use(bodyParser.urlencoded({
                    'limit': '100mb',
                    'extended': true
                }));
                app.use(bodyParser.json({
                    "limit": '100mb'
                }));

                if (args.settings.authentication) {
                    app.use((req, res, next) => {
                        if (req.method != 'GET' && req.method != 'PUT' && req.path != '/store/payfast/payment') {
                            auth.authenticate({
                                'req': req,
                                'res': res
                            })
                                .then(result => {
                                    next();
                                }, err => {
                                    __logger.error('authCheck error: ' + JSON.stringify(err));
                                    err.error.code = 401;
                                    err.error.errors[0].code = 401;
                                    __responder.error(req, res, err);
                                });
                        } else {
                            next();
                        };
                    });
                };

                app.use('/', express.static(__dirname + '/store/dist/store'));
                app.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/store/dist/store/index.html');
                });

                app.use('/store/apis', require('./api/apis'));
                __logger.info('Loaded: ./api/store/apis');

                app.use('/store/carts', require('./api/carts'));
                __logger.info('Loaded: ./api/store/carts');

                app.use('/store/config', require('./api/config'));
                __logger.info('Loaded: ./api/store/config');

                app.use('/store/orders', require('./api/orders'));
                __logger.info('Loaded: ./api/store/orders');

                app.use('/store/stores', require('./api/stores'));
                __logger.info('Loaded: ./api/store/stores');

                app.use('/store/reports', require('./api/reports'));
                __logger.info('Loaded: ./api/store/orders');

                app.use('/store/payfast', require('./api/payfast'));
                __logger.info('Loaded: ./api/store/payfast');

                app.use('/store/reviews', require('./api/reviews'));
                __logger.info('Loaded: ./api/store/reviews');

                app.use('/store/products', require('./api/products'));
                __logger.info('Loaded: ./api/store/products');

                app.use('/store/warnings', require('./api/warnings'));
                __logger.info('Loaded: ./api/store/warnings');

                app.use('/store/couriers', require('./api/couriers'));
                __logger.info('Loaded: ./api/store/couriers');

                app.use('/store/suppliers', require('./api/suppliers'));
                __logger.info('Loaded: ./api/store/suppliers');

                app.use('/store/wishlists', require('./api/wishlists'));
                __logger.info('Loaded: ./api/store/wishlists');

                app.use('/store/addresses', require('./api/addresses'));
                __logger.info('Loaded: ./api/store/addresses');

                app.use('/store/departments', require('./api/departments'));
                __logger.info('Loaded: ./api/store/departments');

                app.use('/store/collectionpoints', require('./api/collectionpoints'));
                __logger.info('Loaded: ./api/store/collectionpoints');

                app.use('/health-check', healthcheck);
                __logger.info('Loaded: ./health-check');

                app.use((err, req, res, next) => {
                    portal.errorResponse.error.code = 500;
                    portal.errorResponse.error.message = 'Something broke';
                    portal.errorResponse.error.errors[0].code = 500;
                    portal.errorResponse.error.errors[0].message = 'Something broke';
                    portal.errorResponse.hiddenErrors.push(err.stack);
                    __responder.error(req, res, portal.errorResponse);
                });

                var server = http.createServer(app);
                server.listen(args.settings.localwebserver.storeport);
                deferred.resolve(args);
            } catch (err) {
                deferred.reject(err.message);
            };

            return deferred.promise;
        },

        init: (args) => {
            if (!args.settings.production || !args.settings.authentication) {
                var index = 0;
                console.log('');
                console.log('=======================');
                console.log('');
                console.log(chalk.yellow('Warning: '));
                if (!args.settings.production) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': You are running in ') + chalk.red('"Development Mode!"') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable production mode, set the ') + chalk.bold(chalk.green('production')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                if (!args.settings.authentication) {
                    index++;
                    console.log('');
                    console.log(chalk.yellow(index + ': Authentication is not enabled ') + chalk.yellow(' This can cause issues if this environment is a production environment!'));
                    console.log('');
                    console.log(chalk.yellow('To enable Authentication mode, set the ') + chalk.bold(chalk.green('authentication')) + chalk.yellow(' variable in the config to ') + chalk.bold(chalk.green('true')) + chalk.yellow('!'));
                };
                console.log('');
                console.log('=======================');
                console.log('');
            };

            portal.logger(args)
                .then(portal.api, null)
                .then(portal.console, null)
                .then(portal.database, null)
                .then(args => {
                    console.log('Console Running on port: ', args.settings.localwebserver.consoleport);
                    console.log('Webserver Running on port: ', args.settings.localwebserver.storeport);
                }, err => {
                    console.log('Error Initializing: ', err);
                });
        },

        logger: (args) => {
            var deferred = Q.defer();

            __logger.init();
            deferred.resolve(args);

            return deferred.promise;
        },

        console: (args) => {
            var deferred = Q.defer();

            try {
                var appconsole = express();
                appconsole.use(cors());
                appconsole.use(bodyParser.urlencoded({
                    'limit': '100mb',
                    'extended': true
                }));
                appconsole.use(bodyParser.json({
                    "limit": '100mb'
                }));

                appconsole.use('/', express.static(__dirname + '/admin/dist/admin'));
                appconsole.get('/*', (req, res) => {
                    res.sendFile(__dirname + '/admin/dist/admin/index.html');
                });

                appconsole.use((err, req, res, next) => {
                    portal.errorResponse.error.code = 500;
                    portal.errorResponse.error.message = 'Something broke';
                    portal.errorResponse.error.errors[0].code = 500;
                    portal.errorResponse.error.errors[0].message = 'Something broke';
                    portal.errorResponse.hiddenErrors.push(err.stack);
                    __responder.error(req, res, portal.errorResponse);
                });

                var serverconsole = http.createServer(appconsole);
                serverconsole.listen(args.settings.localwebserver.consoleport);
                deferred.resolve(args);
            } catch (err) {
                deferred.reject(err.message);
            };

            return deferred.promise;
        },

        database: (args) => {
            var deferred = Q.defer();

            db.connect().then(database => {
                global.__database = database;
                deferred.resolve(args);
            }, err => {
                __logger.error('Database Connection Error: ' + err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch (error) {
    console.log('The following error has occurred: ', error.message);
};