const Q = require('q');
const hbs = require('nodemailer-express-handlebars');
const nodemailer = require('nodemailer');

exports.exworks = (notification) => {
    var deferred = Q.defer();

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
        'to': __settings.production ? notification.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'context': notification,
        'subject': ['EXWORKS DELIVERY: ', '#', notification.orderId].join('').toUpperCase(),
        'template': 'exworks'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(notification);
    });

    return deferred.promise;
};

exports.supplier = (notification) => {
    var deferred = Q.defer();

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
        'to': __settings.production ? notification.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'context': notification,
        'subject': ['Purchase Order: ', '#', notification.orderId].join('').toUpperCase(),
        'template': 'supplier'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(notification);
    });

    return deferred.promise;
};

exports.confirmation = (notification) => {
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

    transporter.sendMail({
        'to': __settings.production ? notification.email : __settings.smtp.auth.user,
        'from': __settings.production ? 'support@bitid.co.za' : __settings.smtp.auth.user,
        'context': notification,
        'subject': ['Order Confirmation: ', '#', notification.orderId].join('').toUpperCase(),
        'template': 'confirmation'
    }, (error, info) => {
        if (error) {
            __logger.error(error);
        } else {
            __logger.info(info);
        };
        deferred.resolve(notification);
    });

    return deferred.promise;
};