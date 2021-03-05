const Q = require('q');
const _ = require('lodash');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

exports.exworks = (args) => {
    var deferred = Q.defer();

    try {
        if (args.order.shipping.enabled && args.order.shipping.method == 'exworks') {
            const transporter = nodemailer.createTransport(__settings.smtp);

            transporter.use('compile', hbs({
                'viewEngine': {
                    'extName': '.hbs',
                    'layoutsDir': __dirname + '/templates',
                    'partialsDir': __dirname + '/templates',
                    'defaultLayout': 'exworks.hbs'
                },
                'extName': '.hbs',
                'viewPath': __dirname + '/templates'
            }));

            transporter.sendMail({
                'to': __settings.production ? args.order.email : __settings.smtp.auth.user,
                'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
                'context': args.order,
                'subject': ['EXWORKS DELIVERY: ', '#', args.order.orderId].join('').toUpperCase(),
                'template': 'exworks'
            });

            deferred.resolve(args);
        } else {
            deferred.resolve(args);
        };
    } catch (error) {
        var err = new ErrorResponse();
        err.error.errors[0].code = 503;
        err.error.errors[0].reason = 'Issue in exworks email!';
        err.error.errors[0].message = error.message;
        deferred.reject(err);
    }

    return deferred.promise;
};

exports.vouchers = (args) => {
    var deferred = Q.defer();

    if (args.order.vouchers.length > 0) {
        const transporter = nodemailer.createTransport(__settings.smtp);
    
        transporter.use('compile', hbs({
            'viewEngine': {
                'extName': '.hbs',
                'layoutsDir': __dirname + '/templates',
                'partialsDir': __dirname + '/templates',
                'defaultLayout': 'vouchers.hbs'
            },
            'extName': '.hbs',
            'viewPath': __dirname + '/templates'
        }));
    
        transporter.sendMail({
            'to': __settings.production ? args.order.email : __settings.smtp.auth.user,
            'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
            'context': args.order,
            'subject': ['Your Vouchers: ', '#', args.order.orderId].join('').toUpperCase(),
            'template': 'vouchers'
        });
                
        deferred.resolve(args);
    } else {
        deferred.resolve(args);
    };

    return deferred.promise;
};

exports.suppliers = (args) => {
    var deferred = Q.defer();

    try {
        var config = _.groupBy(args.order.products, o => o.supplierId);
        var suppliers = [];
        Object.keys(config).map(key => {
            suppliers.push({
                date: args.order.date,
                phone: config[key][0].supplier.phone,
                email: config[key][0].supplier.email,
                store: args.order.store,
                payment: args.order.payment,
                address: config[key][0].supplier.address,
                orderId: args.order.orderId,
                products: config[key],
                shipping: args.order.shipping,
                recipient: args.order.recipient,
                supplierId: key,
                description: config[key][0].supplier.description,
            });
        });

        suppliers.reduce((promise, supplier) => promise.then(() => {
            var deferred = Q.defer();

            supplier.payment = {
                'vat': 0,
                'total': 0,
                'subtotal': 0
            };

            supplier.products.map(product => {
                supplier.payment.total += product.cost * product.quantity;
                product.cost = product.cost.toFixed(2);
            })

            supplier.payment.vat = supplier.payment.total * 0.15;
            supplier.payment.subtotal = supplier.payment.total - supplier.payment.vat;

            supplier.payment.vat = supplier.payment.vat.toFixed(2);
            supplier.payment.total = supplier.payment.total.toFixed(2);
            supplier.payment.subtotal = supplier.payment.subtotal.toFixed(2);
            
            const transporter = nodemailer.createTransport(__settings.smtp);

            transporter.use('compile', hbs({
                'viewEngine': {
                    'extName': '.hbs',
                    'layoutsDir': __dirname + '/templates',
                    'partialsDir': __dirname + '/templates',
                    'defaultLayout': 'supplier.hbs'
                },
                'extName': '.hbs',
                'viewPath': __dirname + '/templates'
            }));
        
            transporter.sendMail({
                'context': {
                    date: supplier.date,
                    phone: supplier.phone,
                    email: supplier.email,
                    store: supplier.store,
                    payment: supplier.payment,
                    address: supplier.address,
                    orderId: supplier.orderId,
                    shipping: supplier.shipping,
                    products: supplier.products,
                    recipient: supplier.recipient,
                    supplierId: supplier.supplierId,
                    description: supplier.description
                },
                'to': __settings.production ? supplier.email : __settings.smtp.auth.user,
                'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
                'subject': ['PURCHASE ORDER: ', '#', args.order.orderId].join('').toUpperCase(),
                'template': 'supplier'
            });
            
            deferred.resolve(supplier);

            return deferred.promise;
        }), Q.when(args))
        .then(res => {
            deferred.resolve(args);
        }, err => {
            var err = new ErrorResponse();
            err.error.errors[0].code = 503;
            err.error.errors[0].reason = 'Issue in supplier email!';
            err.error.errors[0].message = error.message;
            deferred.reject(err);
        });
    } catch (error) {
        var err = new ErrorResponse();
        err.error.errors[0].code = 503;
        err.error.errors[0].reason = 'Issue in supplier email!';
        err.error.errors[0].message = error.message;
        deferred.reject(err);
    }

    return deferred.promise;
};

exports.confirmation = (args) => {
    var deferred = Q.defer();

    const transporter = nodemailer.createTransport(__settings.smtp);

    transporter.use('compile', hbs({
        'viewEngine': {
            'extName': '.hbs',
            'layoutsDir': __dirname + '/templates',
            'partialsDir': __dirname + '/templates',
            'defaultLayout': 'confirmation.hbs'
        },
        'extName': '.hbs',
        'viewPath': __dirname + '/templates'
    }));
    
    var order = JSON.parse(JSON.stringify(args.order));

    order.payment.vat = order.payment.vat.toFixed(2);
    order.payment.total = order.payment.total.toFixed(2);
    order.payment.discount = order.payment.discount.toFixed(2);
    order.payment.shipping = order.payment.shipping.toFixed(2);
    order.payment.subtotal = order.payment.subtotal.toFixed(2);

    order.products.map(product => {
        product.price = product.price.toFixed(2);
        product.promotion.price = product.promotion.price.toFixed(2);
    })

    transporter.sendMail({
        'to': __settings.production ? args.order.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'context': order,
        'subject': ['Order Confirmation: ', '#', args.order.orderId].join('').toUpperCase(),
        'template': 'confirmation'
    });
            
    deferred.resolve(args);

    return deferred.promise;
};