const Q = require('q');
const tools = require('../lib/tools');
const moment = require('moment');
const emails = require('./../emails/emails');
const payfast = require('@payfast/core');
const dalModule = require('./../dal/dal');
const ErrorResponse = require('./../lib/error-response');

var module = function () {
    var bllApis = {
        trigger: (args) => {
            var deferred = Q.defer();

            deferred.resolve(args);

            return deferred.promise;
        },

        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.apis.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.apis.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.apis.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.apis.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.apis.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllCarts = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.carts.add, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        sync: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.carts.sync, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.carts.list, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.carts.update, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.carts.delete, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllOrders = {
        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            if (Array.isArray(args.req.body.filter)) {
                if (!args.req.body.filter.includes('status')) {
                    args.req.body.filter.push('status');
                };
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.orders.get, null)
                .then(args => {
                    var deferred = Q.defer();

                    args.order = args.result;
                    delete args.result;

                    deferred.resolve(args);

                    return deferred.promise;
                }, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        if (args.order.status == 'initialized') {
                            args.req.body.filter = ['type', 'image', 'title', 'price', 'promotion', 'productId'];
                            args.req.body.productId = args.order.products.map(product => product.productId);

                            myModule.products.list(args)
                                .then(args => {
                                    var products = [];

                                    args.order.products.map(item => {
                                        var tmp = {
                                            'quantity': item.quantity,
                                            'productId': item.productId
                                        };
                                        args.result.map(product => {
                                            if (item.productId == product._id) {
                                                tmp.type = product.type;
                                                tmp.image = product.image;
                                                tmp.title = product.title;
                                                tmp.price = product.price;
                                                tmp.promotion = product.promotion;
                                            };
                                        });

                                        products.push(tmp);
                                    });

                                    args.order.products = products;

                                    deferred.resolve(args);
                                }, null)
                                .then(args => {
                                    var deferred = Q.defer();

                                    if (args.order.shipping.method == 'deliver') {
                                        args.req.body.filter = ['options'];
                                        args.req.body.courierId = args.order.shipping.courierId;
                                        myModule.couriers.get(args)
                                            .then(args => {
                                                args.result.options.map(option => {
                                                    if (option.optionId == args.order.shipping.optionId) {
                                                        args.order.payment.shipping = option.price;
                                                    };
                                                });

                                                deferred.resolve(args);
                                            }, deferred.reject);
                                    } else {
                                        deferred.resolve(args);
                                    };

                                    return deferred.promise;
                                }, null)
                                .then(args => {
                                    deferred.resolve(args);
                                }, err => {
                                    deferred.reject(err);
                                });
                        } else {
                            deferred.resolve(args);
                        };
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        if (Array.isArray(args.order.products)) {
                            args.req.body.vat = 0;
                            args.req.body.total = 0;
                            args.req.body.credit = 0;
                            args.req.body.shipping = 0;
                            args.req.body.subtotal = 0;

                            if (args.order.shipping.method == 'deliver') {
                                args.req.body.shipping = args.order.payment.shipping;
                            };

                            args.order.products.map(product => {
                                if (product.promotion.enabled) {
                                    args.req.body.subtotal += (product.promotion.price * product.quantity);
                                } else {
                                    args.req.body.subtotal += (product.price * product.quantity);
                                };
                            });
                            args.req.body.total = (args.req.body.subtotal + args.req.body.shipping) - args.req.body.credit;
                            args.req.body.vat = args.req.body.total * 0.15;
                            args.req.body.total = args.req.body.total + args.req.body.vat;

                            if (typeof (args.order.payment) != 'undefined') {
                                if (typeof (args.order.payment.vat) != 'undefined') {
                                    args.order.payment.vat = args.req.body.vat;
                                };
                                if (typeof (args.order.payment.total) != 'undefined') {
                                    args.order.payment.total = args.req.body.total;
                                };
                                if (typeof (args.order.payment.credit) != 'undefined') {
                                    args.order.payment.credit = args.req.body.credit;
                                };
                                if (typeof (args.order.payment.shipping) != 'undefined') {
                                    args.order.payment.shipping = args.req.body.shipping;
                                };
                                if (typeof (args.order.payment.subtotal) != 'undefined') {
                                    args.order.payment.subtotal = args.req.body.subtotal;
                                };
                            };
                        };
                        deferred.resolve(args);
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    __responder.success(req, res, args.order);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            if (Array.isArray(args.req.body.filter)) {
                if (!args.req.body.filter.includes('status')) {
                    args.req.body.filter.push('status');
                };
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.orders.list, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        args.req.body.productId = [];

                        args.orders = args.result;
                        delete args.result;

                        args.orders.map(o => {
                            if (o.status == 'initialized') {
                                o.products.map(product => product.productId).map(id => args.req.body.productId.push(id));
                            };
                        });

                        if (args.req.body.productId.length > 0) {
                            args.req.body.filter = ['type', 'image', 'title', 'price', 'promotion', 'productId'];

                            myModule.products.list(args)
                                .then(args => {
                                    args.orders.map(order => {
                                        if (order.status == 'initialized') {
                                            order.products = order.products.map(item => {
                                                var tmp = {
                                                    'quantity': item.quantity,
                                                    'productId': item.productId
                                                };

                                                args.result.map(product => {
                                                    if (item.productId == product._id) {
                                                        tmp.type = product.type;
                                                        tmp.image = product.image;
                                                        tmp.title = product.title;
                                                        tmp.price = product.price;
                                                        tmp.promotion = product.promotion;
                                                    };
                                                });

                                                return tmp;
                                            });
                                        };
                                    });

                                    deferred.resolve(args);
                                }, err => {
                                    deferred.reject(err);
                                });
                        } else {
                            deferred.resolve(args);
                        };
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    __responder.success(req, res, args.orders);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.orders.update, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        verify: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.orders.get, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        var summary = {};
                        summary.vat = 0;
                        summary.total = 0;
                        summary.credit = args.result.payment.credit;
                        summary.shipping = args.result.payment.shipping;
                        summary.subtotal = 0;
                        summary.discount = 0;
                        args.result.products.map(product => {
                            summary.subtotal += product.price * product.quantity;
                            if (product.promotion.enabled) {
                                summary.discount -= (product.price - product.promotion.price) * product.quantity;
                            };
                        });
                        summary.total = summary.subtotal + summary.shipping + summary.discount;
                        summary.vat = summary.total * 0.15;
                        summary.total = summary.total * 1.15;

                        args.result.payment.vat = parseFloat(summary.vat.toFixed(2));
                        args.result.payment.total = parseFloat(summary.total.toFixed(2));
                        args.result.payment.credit = parseFloat(summary.credit.toFixed(2));
                        args.result.payment.shipping = parseFloat(summary.shipping.toFixed(2));
                        args.result.payment.discount = parseFloat(summary.discount.toFixed(2));
                        args.result.payment.subtotal = parseFloat(summary.subtotal.toFixed(2));

                        deferred.resolve(args);
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        process: (args) => {
            var deferred = Q.defer();

            args.req.body.status = 'initialized';

            var myModule = new dalModule.module();
            myModule.orders.getStoreId(args)
                .then(myModule.stores.validate, null)
                .then(myModule.orders.get, null)
                .then(myModule.orders.getProductsWithSupplier, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        args.products.map(product => {
                            args.order.products.map(item => {
                                if (item.productId == product.productId) {
                                    item.cost = product.cost;
                                    item.title = product.title;
                                    item.image = product.image;
                                    item.storeId = product.storeId;
                                    item.supplier = product.supplier;
                                };
                            });
                        });
                        args.order.orderId = args.order._id;
                        delete args.order._id;
                        deferred.resolve(args);
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(myModule.orders.paid, null)
                .then(myModule.transactions.order, null)
                .then(args => {
                    var deferred = Q.defer();

                    if (args.order.shipping.method == 'deliver') {
                        args.req.body.filter = ['icon', 'phone', 'account', 'options', 'description'];
                        args.req.body.courierId = args.order.shipping.courierId;
                        myModule.couriers.get(args)
                            .then(args => {
                                args.courier = args.result;
                                deferred.resolve(args);
                            }, err => {
                                deferred.resolve(args);
                            });
                    } else {
                        deferred.resolve(args);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    var deferred = Q.defer();

                    args.order.products.map(product => {
                        if (product.promotion.enabled) {
                            product.amount = (product.promotion.price * product.quantity).toFixed(2);
                        } else {
                            product.amount = (product.price * product.quantity).toFixed(2);
                        };
                    });

                    var notification = {
                        'payment': {
                            'vat': args.order.payment.vat.toFixed(2),
                            'total': args.order.payment.total.toFixed(2),
                            'discount': args.order.payment.discount.toFixed(2),
                            'shipping': args.order.payment.shipping.toFixed(2),
                            'subtotal': args.order.payment.subtotal.toFixed(2)
                        },
                        'date': moment().format('YYYY/MM/DD'),
                        'store': args.store,
                        'email': args.order.email,
                        'courier': args.courier,
                        'orderId': args.order.orderId,
                        'products': args.order.products,
                        'shipping': args.order.shipping,
                        'recipient': args.order.recipient
                    };

                    emails.confirmation(notification);
                    deferred.resolve(args);

                    return deferred.promise;
                }, null)
                .then(myModule.orders.getSuppliersProducts, null)
                .then(args => args.suppliers.reduce((promise, supplier) => promise.then(() => {
                    var deferred = Q.defer();

                    supplier.products.map(product => {
                        args.order.products.map(item => {
                            if (product.productId == item.productId) {
                                product.amount = (product.cost * item.quantity).toFixed(2);
                                product.quantity = item.quantity.toFixed(2);
                            };
                        });
                    });

                    try {
                        var notification = {
                            'payment': {
                                'vat': 0,
                                'total': 0,
                                'subtotal': 0
                            },
                            'courier': {
                                'phone': null,
                                'display': args.order.shipping.method == 'deliver' ? 'block' : 'none',
                                'account': null,
                                'description': null
                            },
                            'date': moment().format('YYYY/MM/DD'),
                            'store': args.store,
                            'email': supplier.email,
                            'orderId': args.order.orderId,
                            'products': supplier.products,
                            'shipping': args.order.shipping,
                            'recipient': args.order.recipient
                        };

                        if (typeof (args.courier) != 'undefined' && args.courier != null && args.courier != '') {
                            notification.courier = {
                                'phone': args.courier.phone,
                                'display': args.order.shipping.method == 'deliver' ? 'block' : 'none',
                                'account': args.courier.account,
                                'description': args.courier.description
                            };
                        }

                        notification.products.map(product => {
                            notification.payment.subtotal += parseFloat(product.amount);
                        });
                        notification.payment.vat = (notification.payment.subtotal * 0.15).toFixed(2);
                        notification.payment.total = (notification.payment.subtotal * 1.15).toFixed(2);
                        notification.payment.subtotal = notification.payment.subtotal.toFixed(2);

                        emails.supplier(notification);
                        deferred.resolve(args);
                    } catch (error) {
                        deferred.resolve(args);
                    };

                    return deferred.promise;
                }), Q.when(args)), null)
                .then(args => {
                    var deferred = Q.defer();

                    if (args.order.shipping.method == 'exworks') {
                        myModule.orders.getSuppliersProducts(args)
                            .then(args => {
                                args.suppliers.map(supplier => {
                                    supplier.products.map(product => {
                                        args.order.products.map(item => {
                                            if (product.productId == item.productId) {
                                                product.quantity = item.quantity.toFixed(2);
                                            };
                                        });
                                    });
                                });

                                var notification = {
                                    'date': moment().format('YYYY/MM/DD'),
                                    'store': args.store,
                                    'email': args.order.email,
                                    'orderId': args.order.orderId,
                                    'suppliers': args.suppliers
                                };

                                emails.exworks(notification);

                                deferred.resolve(args);
                            }, err => {
                                deferred.resolve(args);
                            });
                    } else {
                        deferred.resolve(args);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    deferred.resolve(args);
                }, err => {
                    deferred.reject(err);
                });

            return deferred.promise;
        },

        initialize: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        if (Array.isArray(args.req.body.products)) {
                            if (args.req.body.products.length > 0) {
                                myModule.carts.sync(args).then(deferred.resolve, deferred.reject);
                            } else {
                                deferred.resolve(args);
                            };
                        } else {
                            deferred.resolve(args);
                        };
                    } catch (error) {
                        deferred.resolve(args);
                    };

                    return deferred.promise;
                }, null)
                .then(myModule.carts.list, null)
                .then(args => {
                    var deferred = Q.defer();

                    args.req.body.cartId = args.result.map(o => o._id);
                    args.req.body.products = args.result;
                    deferred.resolve(args);

                    return deferred.promise;
                }, null)
                .then(myModule.orders.initialize, null)
                .then(myModule.carts.delete, null)
                .then(args => {
                    __responder.success(req, res, args);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllStores = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            tools.insertOwnerIfNoneExists(args)
                .then(myModule.stores.add, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        load: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.load(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        share: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.share(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        validate: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(args => {
                    __responder.success(req, res, args.store);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        unsubscribe: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.unsubscribe(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        updatesubscriber: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.updatesubscriber(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllReports = {
        sales: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reports.sales(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllPayfast = {
        payment: async (req, res) => {
            var args = {
                'req': req,
                'res': res
            };
            var body = JSON.parse(JSON.stringify(req.body));
            delete body.header;
            const verify = await payfast.validate.request(body);
            if (!verify.valid && __settings.production) {
                var err = new ErrorResponse();
                err.error.errors[0].code = 401;
                err.error.errors[0].reason = 'Payfast payload is invalid';
                err.error.errors[0].message = 'Payfast payload is invalid';
                __responder.error(req, res, err);
            } else {
                var body = {
                    'header': {
                        'email': args.req.body.email_address,
                        'appId': '000000000000000000000001'
                    },
                    'amount': {
                        'fee': parseFloat(args.req.body.amount_fee),
                        'net': parseFloat(args.req.body.amount_net),
                        'gross': parseFloat(args.req.body.amount_gross)
                    },
                    'orderId': args.req.body.m_payment_id
                };

                args.req.body = body;

                bllOrders.process(args)
                    .then(args => {
                        __responder.success(req, res, {
                            'message': 'Order was placed successfully',
                            'orderId': args.order.orderId
                        });
                    }, err => {
                        __responder.error(req, res, err);
                    });
            };
        }
    };

    var bllReviews = {
        public: {
            list: (req, res) => {
                var args = {
                    'req': req,
                    'res': res
                };
    
                var myModule = new dalModule.module();
                myModule.stores.validate(args)
                    .then(myModule.reviews.public.list, null)
                    .then(args => {
                        __responder.success(req, res, args.result);
                    }, err => {
                        __responder.error(req, res, err);
                    });
            }
        },

        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.get(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.list(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        reject: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.reject(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        approve: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.reviews.approve(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllProducts = {
        public: {
            get: (req, res) => {
                var args = {
                    'req': req,
                    'res': res
                };
    
                var myModule = new dalModule.module();
                myModule.stores.validate(args)
                    .then(myModule.products.public.get, null)
                    .then(args => {
                        __responder.success(req, res, args.result);
                    }, err => {
                        __responder.error(req, res, err);
                    });
            },
    
            list: (req, res) => {
                var args = {
                    'req': req,
                    'res': res
                };
    
                var myModule = new dalModule.module();
                myModule.stores.validate(args)
                    .then(myModule.products.public.list, null)
                    .then(args => {
                        __responder.success(req, res, args.result);
                    }, err => {
                        __responder.error(req, res, err);
                    });
            }
        },

        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.products.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.products.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.products.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.products.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.products.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllVouchers = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.vouchers.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.vouchers.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.vouchers.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.vouchers.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.vouchers.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllCouriers = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.couriers.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.couriers.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.couriers.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.couriers.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.couriers.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllSuppliers = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.suppliers.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.suppliers.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.suppliers.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.suppliers.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.suppliers.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllCustomers = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.customers.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.customers.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.customers.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.customers.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.customers.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllWishlists = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.wishlists.add, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.wishlists.list, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        args.wishlist = args.result;
                        delete args.result;
                        args.req.body.filter = ['image', 'price', 'title', 'productId', 'promotion'];
                        args.req.body.productId = args.wishlist.map(item => item.productId);
                        deferred.resolve(args);
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(myModule.products.list, null)
                .then(args => {
                    var deferred = Q.defer();

                    try {
                        args.result.map(product => {
                            args.wishlist.map(item => {
                                if (item.productId == product._id) {
                                    item.image = product.image;
                                    item.price = product.price;
                                    item.title = product.title;
                                    item.promotion = product.promotion;
                                };
                            });
                        });
                        deferred.resolve(args);
                    } catch (error) {
                        var err = new ErrorResponse();
                        err.error.errors[0].code = 503;
                        err.error.errors[0].reason = error.message;
                        err.error.errors[0].message = error.message;
                        deferred.reject(err);
                    };

                    return deferred.promise;
                }, null)
                .then(args => {
                    __responder.success(req, res, args.wishlist);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.wishlists.update, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.wishlists.delete, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllAddresses = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.addresses.add, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.addresses.get, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.addresses.list, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.addresses.update, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.stores.validate(args)
                .then(myModule.addresses.delete, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllDepartments = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.departments.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.departments.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.departments.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.departments.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.departments.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    var bllCollectionPoints = {
        add: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.collectionpoints.add(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        get: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.collectionpoints.get(args)
                .then(tools.setRoleObject, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        list: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.collectionpoints.list(args)
                .then(tools.setRoleList, null)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        update: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.collectionpoints.update(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        },

        delete: (req, res) => {
            var args = {
                'req': req,
                'res': res
            };

            var myModule = new dalModule.module();
            myModule.collectionpoints.delete(args)
                .then(args => {
                    __responder.success(req, res, args.result);
                }, err => {
                    __responder.error(req, res, err);
                });
        }
    };

    return {
        'apis': bllApis,
        'carts': bllCarts,
        'orders': bllOrders,
        'stores': bllStores,
        'reports': bllReports,
        'payfast': bllPayfast,
        'reviews': bllReviews,
        'products': bllProducts,
        'vouchers': bllVouchers,
        'couriers': bllCouriers,
        'customers': bllCustomers,
        'suppliers': bllSuppliers,
        'wishlists': bllWishlists,
        'addresses': bllAddresses,
        'departments': bllDepartments,
        'collectionpoints': bllCollectionPoints
    };
};

exports.module = module;