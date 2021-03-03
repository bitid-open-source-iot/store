var carts = db.getCollection('tblCarts');
if (carts.count() == 0) {
    db.tblCarts.insert({
        '_id': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'storeId': '000000000000000000000001',
        'quantity': 1,
        'productId': '000000000000000000000001',
        'serverDate': ISODate()
    });

    db.tblCarts.createIndex({
        'email': 1,
        'storeId': 1,
        'productId': 1
    }, {
        'unique': true
    });
};

var stores = db.getCollection('tblStores');
if (stores.count() == 0) {
    db.tblStores.insert({
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        '_id': ObjectId('000000000000000000000001'),
        'dns': ['xxx.com'],
        'logo': 'https://xxx.com/icon.png',
        'contact': {
            'email': '',
            'number': '',
            'website': ''
        },
        'payfast': {
            'merchantId': '',
            'merchantKey': ''
        },
        'private': false,
        'serverDate': ISODate(),
        'description': 'xxx'
    });

    db.tblStores.createIndex({
        'description': 1
    }, {
        'unique': true
    });
};

var orders = db.getCollection('tblOrders');
if (orders.count() == 0) {
    db.tblOrders.insert({
        'date': {
            'paid': ISODate(),
            'sent': ISODate(),
            'ordered': ISODate(),
            'returned': ISODate(),
            'delivered': ISODate(),
            'initialized': ISODate()
        },
        'payment': {
            'vat': 0,
            'total': 0,
            'credit': 0,
            'method': 0,
            'shipping': 0,
            'subtotal': 0
        },
        'products': [
            {
                'promotion': {
                    'price': 0,
                    'enabled': true
                },
                'type': 'software',
                'title': 'xxx',
                'price': 0,
                'storeId': '000000000000000000000001',
                'productId': '000000000000000000000001'
            }
        ],
        'shipping': {
            'method': 'delivery',
            'address': {
                'vat': 'xxx',
                'type': 'xxx',
                'email': 'xxx@xxx.co.za',
                'street': 'xxx',
                'suburb': 'xxx',
                'number': 'xxx',
                'business': 'xxx',
                'cityTown': 'xxx',
                'addressId': '000000000000000000000001',
                'recipient': 'xxx',
                'postalCode': 'xxx',
                'additionalInfo': 'xxx'
            },
            'optionId': 'express',
            'courierId': '000000000000000000000001'
        },
        '_id': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'status': 0,
        'storeId': '000000000000000000000001',
        'message': 'xxx',
        'serverDate': ISODate(),
        'description': 'xxx'
    });
};

var reviews = db.getCollection('tblReviews');
if (reviews.count() == 0) {
    db.tblReviews.insert({
        '_id': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'points': NumberInt('5'),
        'message': 'It's Nice!',
        'storeId': '000000000000000000000001',
        'productId': '000000000000000000000001',
        'serverDate': ISODate()
    });

    db.tblReviews.createIndex({
        'email': 1,
        'storeId': 1,
        'productId': 1
    }, {
        'unique': true
    });
};

var products = db.getCollection('tblProducts');
if (products.count() == 0) {
    db.tblProducts.insert({
        'info': [{
            'title': 'xxx',
            'value': 'xxx'
        }],
        'images': [
            {
                'src': 'xxx',
                'main': true,
                'position': NumberInt('1')
            }
        ],
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        'departments': [
            '000000000000000000000001'
        ],
        'promotion': {
            'price': 0,
            'enabled': true
        },
        '_id': ObjectId('000000000000000000000001'),
        'type': 'software',
        'score': NumberInt('0'),
        'price': 250,
        'title': 'xxx',
        'storeId': '000000000000000000000001',
        'reviews': 0,
        'returned': 0,
        'purchased': 0,
        'supplierId': '000000000000000000000001',
        'serverDate': ISODate(),
        'description': 'xxx'
    });
};

var customers = db.getCollection('tblCustomers');
if (customers.count() == 0) {
    db.tblCustomers.insert({
        '_id': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'status': 'accepted',
        'storeId': ObjectId('000000000000000000000001'),
        'serverDate': ISODate()
    });
    db.tblCustomers.ensureIndex({
        'email': 1,
        'storeId': 1
    }, {
        'unique': true
    });
};

var couriers = db.getCollection('tblCouriers');
if (couriers.count() == 0) {
    db.tblCouriers.insert({
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        'options': [
            {
                'price': 60,
                'optionId': 'express',
                'description': 'Express Delivery'
            }
        ],
        '_id': ObjectId('000000000000000000000001'),
        'icon': 'https://bitid.co.za/assets/icon.png',
        'phone': '0000000000',
        'email': 'xxx@xxx.co.za',
        'account': '0000000000',
        'storeId': '000000000000000000000001',
        'serverDate': ISODate(),
        'description': 'The Courier Guy'
    });

    db.tblCouriers.createIndex({
        'storeId': 1,
        'description': 1
    }, {
        'unique': true
    });
};

var suppliers = db.getCollection('tblSuppliers');
if (suppliers.count() == 0) {
    db.tblSuppliers.insert({
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        '_id': ObjectId('000000000000000000000001'),
        'phone': '0000000000',
        'email': 'xxx@xxx.co.za',
        'storeId': '000000000000000000000001',
        'serverDate': ISODate(),
        'description': 'xxx'
    });

    db.tblSuppliers.createIndex({
        'storeId': 1,
        'description': 1
    }, {
        'unique': true
    });
};

var wishlists = db.getCollection('tblWishlists');
if (wishlists.count() == 0) {
    db.tblWishlists.insert({
        '_id': ObjectId('000000000000000000000001'),
        'email': 'xxx@xxx.co.za',
        'storeId': '000000000000000000000001',
        'quantity': 1,
        'productId': '000000000000000000000001',
        'serverDate': ISODate()
    });

    db.tblWishlists.createIndex({
        'email': 1,
        'storeId': 1,
        'productId': 1
    }, {
        'unique': true
    });
};

var vouchers = db.getCollection('tblVouchers');
if (vouchers.count() == 0) {
    db.tblVouchers.insert({
        '_id': ObjectId('000000000000000000000001'),
        'status': 'available',
        'storeId': ObjectId('000000000000000000000001'),
        'quantity': 1,
        'productId': ObjectId('000000000000000000000001'),
        'serverDate': ISODate()
    });

    db.tblVouchers.createIndex({
        "code": 1,
        "storeId": 1,
        "productId": 1
    }, {
        "unique": true
    })
};

var departments = db.getCollection('tblDepartments');
if (departments.count() == 0) {
    db.tblDepartments.insert({
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        '_id': ObjectId('000000000000000000000001'),
        'storeId': '000000000000000000000001',
        'description': 'xxx'
    });

    db.tblDepartments.createIndex({
        'storeId': 1,
        'description': 1
    }, {
        'unique': true
    });
};

var collectionpoints = db.getCollection('tblCollectionPoints');
if (collectionpoints.count() == 0) {
    db.tblCollectionPoints.insert({
        'bitid': {
            'auth': {
                'users': [{
                    'role': NumberInt('5'),
                    'email': 'xxx@xxx.co.za'
                }],
                'organizationOnly': NumberInt('1')
            }
        },
        '_id': ObjectId('000000000000000000000001'),
        'vat': 'xxx',
        'type': 'xxx',
        'number': 'xxx',
        'street': 'xxx',
        'suburb': 'xxx',
        'business': 'xxx',
        'storeId': '000000000000000000000001',
        'cityTown': 'xxx',
        'recipient': 'xxx',
        'serverDate': 'xxx',
        'postalCode': 'xxx',
        'additionalInfo': 'xxx'
    });

    db.tblCollectionPoints.createIndex({
        'storeId': 1
    }, {
        'unique': false
    });
};