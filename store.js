var Q           = require('q');
var db          = require('./db/mongo');
var cors        = require('cors');
var http        = require('http');
var auth        = require('./lib/auth');
var chalk       = require('chalk');
var express     = require('express');
var responder   = require('./lib/responder');
var bodyParser  = require('body-parser');
var healthcheck = require('@bitid/health-check');

global.__base       = __dirname + '/';
global.__logger     = require('./lib/logger');
global.__settings   = require('./config.json');
global.__responder  = new responder.module();

try {
    var portal = {
        errorResponse: {
            "error": {
                "code":     401,
                "message":  "Invalid Credentials",
                "errors":[{
                    "reason":       "Portal Error",
                    "message":      "Portal Error",
                    "locaction":    "portal",
                    "locationType": "portal"
                }]
            },
            "hiddenErrors":[]
        },

        api: (args) => {
            var deferred    = Q.defer();

            try {
                var app    = express();
                app.use(cors());
                app.use(bodyParser.urlencoded({
                    'limit':    '100mb',
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
                                __logger.error('authCheck error: ' +  JSON.stringify(err));
                                err.error.code              = 401;
                                err.error.errors[0].code    = 401;
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

                var apis = require('./api/apis');
                app.use('/store/apis', apis);
                __logger.info('Loaded: ./api/store/apis');

                var carts = require('./api/carts');
                app.use('/store/carts', carts);
                __logger.info('Loaded: ./api/store/carts');

                var orders = require('./api/orders');
                app.use('/store/orders', orders);
                __logger.info('Loaded: ./api/store/orders');

                var stores = require('./api/stores');
                app.use('/store/stores', stores);
                __logger.info('Loaded: ./api/store/stores');

                var payfast = require('./api/payfast');
                app.use('/store/payfast', payfast);
                __logger.info('Loaded: ./api/store/payfast');

                var reviews = require('./api/reviews');
                app.use('/store/reviews', reviews);
                __logger.info('Loaded: ./api/store/reviews');

                var products = require('./api/products');
                app.use('/store/products', products);
                __logger.info('Loaded: ./api/store/products');

                var warnings = require('./api/warnings');
                app.use('/store/warnings', warnings);
                __logger.info('Loaded: ./api/store/warnings');

                var couriers = require('./api/couriers');
                app.use('/store/couriers', couriers);
                __logger.info('Loaded: ./api/store/couriers');

                var suppliers = require('./api/suppliers');
                app.use('/store/suppliers', suppliers);
                __logger.info('Loaded: ./api/store/suppliers');

                var wishlists = require('./api/wishlists');
                app.use('/store/wishlists', wishlists);
                __logger.info('Loaded: ./api/store/wishlists');

                var addresses = require('./api/addresses');
                app.use('/store/addresses', addresses);
                __logger.info('Loaded: ./api/store/addresses');

                var departments = require('./api/departments');
                app.use('/store/departments', departments);
                __logger.info('Loaded: ./api/store/departments');

                var collectionpoints = require('./api/collectionpoints');
                app.use('/store/collectionpoints', collectionpoints);
                __logger.info('Loaded: ./api/store/collectionpoints');

                app.use('/health-check', healthcheck);
                __logger.info('Loaded: ./health-check');

                app.use((err, req, res, next) => {
                    portal.errorResponse.error.code              = 500;
                    portal.errorResponse.error.message           = 'Something broke';
                    portal.errorResponse.error.errors[0].code    = 500;
                    portal.errorResponse.error.errors[0].message = 'Something broke';
                    portal.errorResponse.hiddenErrors.push(err.stack);
                    __responder.error(req, res, portal.errorResponse);
                });

                var server = http.createServer(app);
                server.listen(args.settings.localwebserver.storeport);
                deferred.resolve(args);
            } catch(err) {
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
            var deferred    = Q.defer();

            try {
                var appconsole = express();
                appconsole.use(cors());
                appconsole.use(bodyParser.urlencoded({
                    'limit':    '100mb',
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
                    portal.errorResponse.error.code              = 500;
                    portal.errorResponse.error.message           = 'Something broke';
                    portal.errorResponse.error.errors[0].code    = 500;
                    portal.errorResponse.error.errors[0].message = 'Something broke';
                    portal.errorResponse.hiddenErrors.push(err.stack);
                    __responder.error(req, res, portal.errorResponse);
                });

                var serverconsole = http.createServer(appconsole);
                serverconsole.listen(args.settings.localwebserver.consoleport);
                deferred.resolve(args);
            } catch(err) {
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
                __logger.error('Database Connection Error: ' +  err);
                deferred.reject(err);
            });

            return deferred.promise;
        }
    };

    portal.init({
        'settings': __settings
    });
} catch(error) {
    console.log('The following error has occurred: ', error.message);
};