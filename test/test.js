const Q = require('q');
const chai = require('chai');
const fetch = require('node-fetch');
const subset = require('chai-subset');
const assert = require('chai').assert;
const expect = require('chai').expect;
const should = require('chai').should();
const config = require('./config.json');

chai.use(subset);

var apiId = null;
var cartId = null;
var orderId = null;
var storeId = null;
var reviewId = null;
var addressId = null;
var productId = null;
var warningId = null;
var courierId = null;
var supplierId = null;
var wishlistId = null;
var departmentId = null;
var collectionpointId = null;

describe('Stores', function () {
    it('/store/stores/add', function (done) {
        this.timeout(5000);

        tools.api.stores.add()
            .then((result) => {
                try {
                    storeId = result.storeId;
                    result.should.have.property('storeId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/get', function (done) {
        this.timeout(5000);

        tools.api.stores.get()
            .then((result) => {
                try {
                    result.should.have.property('dns');
                    result.should.have.property('role');
                    result.should.have.property('logo');
                    result.should.have.property('users');
                    result.should.have.property('cover');
                    result.should.have.property('private');
                    result.should.have.property('address');
                    result.should.have.property('contact');
                    result.should.have.property('payfast');
                    result.should.have.property('storeId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    result.should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/list', function (done) {
        this.timeout(5000);

        tools.api.stores.list()
            .then((result) => {
                try {
                    result[0].should.have.property('dns');
                    result[0].should.have.property('role');
                    result[0].should.have.property('logo');
                    result[0].should.have.property('users');
                    result[0].should.have.property('cover');
                    result[0].should.have.property('private');
                    result[0].should.have.property('address');
                    result[0].should.have.property('contact');
                    result[0].should.have.property('payfast');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    result[0].should.have.property('organizationOnly');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/update', function (done) {
        this.timeout(5000);

        tools.api.stores.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/share', function (done) {
        this.timeout(5000);

        tools.api.stores.share()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/update-subscriber', function (done) {
        this.timeout(5000);

        tools.api.stores.updatesubscriber()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/unsubscribe', function (done) {
        this.timeout(5000);

        tools.api.stores.unsubscribe()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/validate', function (done) {
        this.timeout(5000);

        tools.api.stores.validate()
            .then((result) => {
                try {
                    result.should.have.property('dns');
                    result.should.have.property('logo');
                    result.should.have.property('contact');
                    result.should.have.property('payfast');
                    result.should.have.property('storeId');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Apis', function () {
    it('/store/apis/add', function (done) {
        this.timeout(5000);

        tools.api.apis.add()
            .then((result) => {
                try {
                    apiId = result.apiId;
                    result.should.have.property('apiId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/apis/get', function (done) {
        this.timeout(5000);

        tools.api.apis.get()
            .then((result) => {
                try {
                    result.should.have.property('url');
                    result.should.have.property('role');
                    result.should.have.property('body');
                    result.should.have.property('apiId');
                    result.should.have.property('method');
                    result.should.have.property('headers');
                    result.should.have.property('trigger');
                    result.should.have.property('storeId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/apis/list', function (done) {
        this.timeout(5000);

        tools.api.apis.list()
            .then((result) => {
                try {
                    result[0].should.have.property('url');
                    result[0].should.have.property('role');
                    result[0].should.have.property('body');
                    result[0].should.have.property('apiId');
                    result[0].should.have.property('method');
                    result[0].should.have.property('headers');
                    result[0].should.have.property('trigger');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/apis/update', function (done) {
        this.timeout(5000);

        tools.api.apis.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Couriers', function () {
    it('/store/couriers/add', function (done) {
        this.timeout(50000);

        tools.api.couriers.add()
            .then((result) => {
                try {
                    courierId = result.courierId;
                    result.should.have.property('courierId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/couriers/get', function (done) {
        this.timeout(50000);

        tools.api.couriers.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('icon');
                    result.should.have.property('email');
                    result.should.have.property('phone');
                    result.should.have.property('account');
                    result.should.have.property('storeId');
                    result.should.have.property('courierId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/couriers/list', function (done) {
        this.timeout(50000);

        tools.api.couriers.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('icon');
                    result[0].should.have.property('email');
                    result[0].should.have.property('phone');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('account');
                    result[0].should.have.property('courierId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/couriers/update', function (done) {
        this.timeout(50000);

        tools.api.couriers.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Suppliers', function () {
    it('/store/suppliers/add', function (done) {
        this.timeout(5000);

        tools.api.suppliers.add()
            .then((result) => {
                try {
                    supplierId = result.supplierId;
                    result.should.have.property('supplierId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/suppliers/get', function (done) {
        this.timeout(5000);

        tools.api.suppliers.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('phone');
                    result.should.have.property('email');
                    result.should.have.property('address');
                    result.should.have.property('storeId');
                    result.should.have.property('supplierId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/suppliers/list', function (done) {
        this.timeout(5000);

        tools.api.suppliers.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('phone');
                    result[0].should.have.property('email');
                    result[0].should.have.property('address');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('supplierId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/suppliers/update', function (done) {
        this.timeout(5000);

        tools.api.suppliers.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Addresses', function () {
    it('/store/addresses/add', function (done) {
        this.timeout(5000);

        tools.api.addresses.add()
            .then((result) => {
                try {
                    addressId = result.addressId;
                    result.should.have.property('addressId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/addresses/get', function (done) {
        this.timeout(5000);

        tools.api.addresses.get()
            .then((result) => {
                try {
                    result.should.have.property('vat');
                    result.should.have.property('type');
                    result.should.have.property('number');
                    result.should.have.property('street');
                    result.should.have.property('suburb');
                    result.should.have.property('storeId');
                    result.should.have.property('business');
                    result.should.have.property('cityTown');
                    result.should.have.property('addressId');
                    result.should.have.property('recipient');
                    result.should.have.property('serverDate');
                    result.should.have.property('postalCode');
                    result.should.have.property('additionalInfo');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/addresses/list', function (done) {
        this.timeout(5000);

        tools.api.addresses.list()
            .then((result) => {
                try {
                    result[0].should.have.property('vat');
                    result[0].should.have.property('type');
                    result[0].should.have.property('number');
                    result[0].should.have.property('street');
                    result[0].should.have.property('suburb');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('business');
                    result[0].should.have.property('cityTown');
                    result[0].should.have.property('addressId');
                    result[0].should.have.property('recipient');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('postalCode');
                    result[0].should.have.property('additionalInfo');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/addresses/update', function (done) {
        this.timeout(5000);

        tools.api.addresses.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Departments', function () {
    it('/store/departments/add', function (done) {
        this.timeout(5000);

        tools.api.departments.add()
            .then((result) => {
                try {
                    departmentId = result.departmentId;
                    result.should.have.property('departmentId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/departments/get', function (done) {
        this.timeout(5000);

        tools.api.departments.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('storeId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    result.should.have.property('departmentId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/departments/list', function (done) {
        this.timeout(5000);

        tools.api.departments.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    result[0].should.have.property('departmentId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/departments/update', function (done) {
        this.timeout(5000);

        tools.api.departments.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Collection Points', function () {
    it('/store/collection-points/add', function (done) {
        this.timeout(5000);

        tools.api.collectionpoints.add()
            .then((result) => {
                try {
                    collectionpointId = result.collectionpointId;
                    result.should.have.property('collectionpointId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/collection-points/get', function (done) {
        this.timeout(5000);

        tools.api.collectionpoints.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('storeId');
                    result.should.have.property('address');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    result.should.have.property('collectionpointId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/collection-points/list', function (done) {
        this.timeout(5000);

        tools.api.collectionpoints.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('address');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    result[0].should.have.property('collectionpointId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/collection-points/update', function (done) {
        this.timeout(5000);

        tools.api.collectionpoints.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Products', function () {
    it('/store/products/add', function (done) {
        this.timeout(5000);

        tools.api.products.add()
            .then((result) => {
                try {
                    productId = result.productId;
                    result.should.have.property('productId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/products/get', function (done) {
        this.timeout(5000);

        tools.api.products.get()
            .then((result) => {
                try {
                    result.should.have.property('cost');
                    result.should.have.property('role');
                    result.should.have.property('info');
                    result.should.have.property('type');
                    result.should.have.property('score');
                    result.should.have.property('title');
                    result.should.have.property('price');
                    result.should.have.property('images');
                    result.should.have.property('storeId');
                    result.should.have.property('reviews');
                    result.should.have.property('productId');
                    result.should.have.property('promotion');
                    result.should.have.property('supplierId');
                    result.should.have.property('serverDate');
                    result.should.have.property('departments');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/products/list', function (done) {
        this.timeout(5000);

        tools.api.products.list()
            .then((result) => {
                try {
                    result[0].should.have.property('cost');
                    result[0].should.have.property('role');
                    result[0].should.have.property('info');
                    result[0].should.have.property('type');
                    result[0].should.have.property('score');
                    result[0].should.have.property('title');
                    result[0].should.have.property('image');
                    result[0].should.have.property('price');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('reviews');
                    result[0].should.have.property('productId');
                    result[0].should.have.property('promotion');
                    result[0].should.have.property('supplierId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('departments');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/products/update', function (done) {
        this.timeout(5000);

        tools.api.products.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Warnings', function () {
    it('/store/warnings/add', function (done) {
        this.timeout(5000);

        tools.api.warnings.add()
            .then((result) => {
                try {
                    warningId = result.warningId;
                    result.should.have.property('warningId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/warnings/get', function (done) {
        this.timeout(5000);

        tools.api.warnings.get()
            .then((result) => {
                try {
                    result.should.have.property('role');
                    result.should.have.property('storeId');
                    result.should.have.property('warningId');
                    result.should.have.property('serverDate');
                    result.should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/warnings/list', function (done) {
        this.timeout(5000);

        tools.api.warnings.list()
            .then((result) => {
                try {
                    result[0].should.have.property('role');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('warningId');
                    result[0].should.have.property('serverDate');
                    result[0].should.have.property('description');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/warnings/update', function (done) {
        this.timeout(5000);

        tools.api.warnings.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Carts', function () {
    it('/store/carts/add', function (done) {
        this.timeout(5000);

        tools.api.carts.add()
            .then((result) => {
                try {
                    cartId = result.cartId;
                    result.should.have.property('cartId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/carts/list', function (done) {
        this.timeout(5000);

        tools.api.carts.list()
            .then((result) => {
                try {
                    result[0].should.have.property('type');
                    result[0].should.have.property('title');
                    result[0].should.have.property('price');
                    result[0].should.have.property('email');
                    result[0].should.have.property('image');
                    result[0].should.have.property('cartId');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('quantity');
                    result[0].should.have.property('promotion');
                    result[0].should.have.property('productId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/carts/update', function (done) {
        this.timeout(5000);

        tools.api.carts.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/carts/delete', function (done) {
        this.timeout(5000);

        tools.api.carts.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Reviews', function () {
    it('/store/reviews/add', function (done) {
        this.timeout(5000);

        tools.api.reviews.add()
            .then((result) => {
                try {
                    reviewId = result.reviewId;
                    result.should.have.property('reviewId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/get', function (done) {
        this.timeout(5000);

        tools.api.reviews.get()
            .then((result) => {
                try {
                    result.should.have.property('score');
                    result.should.have.property('status');
                    result.should.have.property('message');
                    result.should.have.property('storeId');
                    result.should.have.property('reviewId');
                    result.should.have.property('productId');
                    result.should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/list', function (done) {
        this.timeout(5000);

        tools.api.reviews.list()
            .then((result) => {
                try {
                    result[0].should.have.property('score');
                    result[0].should.have.property('status');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('message');
                    result[0].should.have.property('reviewId');
                    result[0].should.have.property('productId');
                    result[0].should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/update', function (done) {
        this.timeout(5000);

        tools.api.reviews.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/reject', function (done) {
        this.timeout(5000);

        tools.api.reviews.reject()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/delete', function (done) {
        this.timeout(5000);

        tools.api.reviews.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/add', function (done) {
        this.timeout(5000);

        tools.api.reviews.add()
            .then((result) => {
                try {
                    reviewId = result.reviewId;
                    result.should.have.property('reviewId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/approve', function (done) {
        this.timeout(5000);

        tools.api.reviews.approve()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Wishlists', function () {
    it('/store/wishlists/add', function (done) {
        this.timeout(5000);

        tools.api.wishlists.add()
            .then((result) => {
                try {
                    wishlistId = result.wishlistId;
                    result.should.have.property('wishlistId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/wishlists/list', function (done) {
        this.timeout(5000);

        tools.api.wishlists.list()
            .then((result) => {
                try {
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('quantity');
                    result[0].should.have.property('productId');
                    result[0].should.have.property('wishlistId');
                    result[0].should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/wishlists/update', function (done) {
        this.timeout(5000);

        tools.api.wishlists.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Orders', function () {
    it('/store/orders/initialize', function (done) {
        this.timeout(5000);

        tools.api.orders.initialize()
            .then((result) => {
                try {
                    orderId = result.orderId;
                    result.should.have.property('orderId');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/orders/update', function (done) {
        this.timeout(5000);

        tools.api.orders.update()
            .then((result) => {
                try {
                    result.should.have.property('updated');
                    expect(result.updated).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/orders/verify', function (done) {
        this.timeout(5000);

        tools.api.orders.verify()
            .then((result) => {
                try {
                    result.should.have.property('date');
                    result.should.have.property('email');
                    result.should.have.property('status');
                    result.should.have.property('orderId');
                    result.should.have.property('payment');
                    result.should.have.property('storeId');
                    result.should.have.property('shipping');
                    result.should.have.property('products');
                    result.should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/orders/get', function (done) {
        this.timeout(5000);

        tools.api.orders.get()
            .then((result) => {
                try {
                    result.should.have.property('date');
                    result.should.have.property('email');
                    result.should.have.property('status');
                    result.should.have.property('orderId');
                    result.should.have.property('payment');
                    result.should.have.property('storeId');
                    result.should.have.property('shipping');
                    result.should.have.property('products');
                    result.should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/orders/list', function (done) {
        this.timeout(5000);

        tools.api.orders.list()
            .then((result) => {
                try {
                    result[0].should.have.property('date');
                    result[0].should.have.property('email');
                    result[0].should.have.property('status');
                    result[0].should.have.property('orderId');
                    result[0].should.have.property('payment');
                    result[0].should.have.property('storeId');
                    result[0].should.have.property('shipping');
                    result[0].should.have.property('products');
                    result[0].should.have.property('serverDate');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Payfast', function () {
    it('/store/payfast/payment', function (done) {
        this.timeout(50000);

        tools.api.payfast.payment()
            .then((result) => {
                try {
                    result.should.have.property('orderId');
                    result.should.have.property('message');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Reports', function () {
    it('/store/reports/sales', function (done) {
        this.timeout(50000);

        tools.api.reports.sales()
            .then((result) => {
                try {
                    result[0].should.have.property('vat');
                    result[0].should.have.property('date');
                    result[0].should.have.property('email');
                    result[0].should.have.property('total');
                    result[0].should.have.property('orderId');
                    result[0].should.have.property('subtotal');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Remove Added Items', function () {
    it('/store/couriers/delete', function (done) {
        this.timeout(5000);

        tools.api.couriers.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/suppliers/delete', function (done) {
        this.timeout(5000);

        tools.api.suppliers.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/departments/delete', function (done) {
        this.timeout(5000);

        tools.api.departments.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/addresses/delete', function (done) {
        this.timeout(5000);

        tools.api.addresses.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/collection-points/delete', function (done) {
        this.timeout(5000);

        tools.api.collectionpoints.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/products/delete', function (done) {
        this.timeout(5000);

        tools.api.products.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/warnings/delete', function (done) {
        this.timeout(5000);

        tools.api.warnings.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/reviews/delete', function (done) {
        this.timeout(5000);

        tools.api.reviews.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/wishlists/delete', function (done) {
        this.timeout(5000);

        tools.api.wishlists.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/apis/delete', function (done) {
        this.timeout(5000);

        tools.api.apis.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });

    it('/store/stores/delete', function (done) {
        this.timeout(5000);

        tools.api.stores.delete()
            .then((result) => {
                try {
                    result.should.have.property('deleted');
                    expect(result.deleted).to.equal(1);
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

describe('Health Check', function () {
    it('/', function (done) {
        this.timeout(5000);

        tools.api.healthcheck()
            .then((result) => {
                try {
                    result.should.have.property('uptime');
                    result.should.have.property('memory');
                    result.should.have.property('database');
                    done();
                } catch (e) {
                    done(e);
                };
            }, (err) => {
                try {
                    done(err);
                } catch (e) {
                    done(e);
                };
            });
    });
});

var tools = {
    api: {
        apis: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/apis/add', {
                    'url': 'xxx',
                    'body': {},
                    'method': 'xxx',
                    'trigger': 'xxx',
                    'headers': {},
                    'storeId': storeId,
                    'description': 'API 1 TEST',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/apis/get', {
                    'filter': [
                        'url',
                        'role',
                        'body',
                        'apiId',
                        'method',
                        'trigger',
                        'headers',
                        'storeId',
                        'serverDate',
                        'description'
                    ],
                    'apiId': apiId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/apis/list', {
                    'filter': [
                        'url',
                        'role',
                        'body',
                        'apiId',
                        'method',
                        'trigger',
                        'headers',
                        'storeId',
                        'serverDate',
                        'description',
                        'organizationOnly'
                    ],
                    'apiId': apiId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/apis/update', {
                    'apiId': apiId,
                    'description': 'API 1'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/apis/delete', {
                    'apiId': apiId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        carts: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/carts/add', {
                    'cartId': cartId,
                    'storeId': storeId,
                    'quantity': 1,
                    'productId': productId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/carts/list', {
                    'filter': [
                        'type',
                        'title',
                        'price',
                        'email',
                        'image',
                        'cartId',
                        'storeId',
                        'quantity',
                        'promotion',
                        'productId'
                    ],
                    'cartId': cartId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/carts/update', {
                    'cartId': cartId,
                    'storeId': storeId,
                    'quantity': 2
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/carts/delete', {
                    'cartId': cartId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        orders: {
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/orders/get', {
                    'filter': [
                        'date',
                        'email',
                        'status',
                        'orderId',
                        'payment',
                        'storeId',
                        'shipping',
                        'products',
                        'serverDate'
                    ],
                    'orderId': orderId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/orders/list', {
                    'filter': [
                        'date',
                        'email',
                        'status',
                        'orderId',
                        'payment',
                        'storeId',
                        'shipping',
                        'products',
                        'serverDate'
                    ],
                    'orderId': orderId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            verify: () => {
                var deferred = Q.defer();

                tools.post('/store/orders/verify', {
                    'orderId': orderId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/orders/update', {
                    'payment': {
                        'vat': 30,
                        'total': 230,
                        'credit': 0,
                        'method': 'cc',
                        'shipping': 0,
                        'discount': 0,
                        'subtotal': 200
                    },
                    'shipping': {
                        'address': {
                            'type': 'business',
                            'street': '12 Waterloo Street',
                            'suburb': 'London',
                            'cityTown': 'London',
                            'postalCode': '0000',
                            'additionalInfo': ''
                        },
                        'method': 'collect',
                        'optionId': null,
                        'courierId': null,
                        'collectionpointId': null
                    },
                    'recipient': {
                        'name': {
                            'last': 'Soap',
                            'first': 'Joe'
                        },
                        'company': {
                            'vat': '10001',
                            'reg': 'AE001',
                            'name': 'biTid'
                        },
                        'email': config.email,
                        'number': '00000000000'
                    },
                    'orderId': orderId,
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            initialize: () => {
                var deferred = Q.defer();

                tools.post('/store/orders/initialize', {
                    'products': [
                        {
                            'quantity': 2,
                            'productId': productId
                        },
                        {
                            'quantity': 1,
                            'productId': '000000000000000000000001'
                        }
                    ],
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        stores: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/add', {
                    'contact': {
                        'email': config.email,
                        'number': '0000000000',
                        'website': 'https://bitid.co.za'
                    },
                    'payfast': {
                        'mechantId': 'aaa',
                        'mechantKey': 'bbb'
                    },
                    'address': {
                        'vat': 'xxx',
                        'reg': 'xxx',
                        'street': 'xxx',
                        'suburb': 'xxx',
                        'cityTown': 'xxx',
                        'postalCode': 3003
                    },
                    'dns': ['bitid.com'],
                    'logo': 'https://www.bitid.co.za/assets/icons/icon-96x96.png',
                    'cover': 'https://www.bitid.co.za/assets/icons/icon-96x96.png',
                    'private': false,
                    'description': 'My Store',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/get', {
                    'filter': [
                        'dns',
                        'role',
                        'logo',
                        'users',
                        'cover',
                        'private',
                        'contact',
                        'payfast',
                        'storeId',
                        'address',
                        'serverDate',
                        'description',
                        'organizationOnly'
                    ],
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/list', {
                    'filter': [
                        'dns',
                        'role',
                        'logo',
                        'users',
                        'cover',
                        'private',
                        'contact',
                        'payfast',
                        'storeId',
                        'address',
                        'serverDate',
                        'description',
                        'organizationOnly'
                    ],
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            share: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/share', {
                    'role': 4,
                    'email': 'shared@email.com',
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/update', {
                    'storeId': storeId,
                    'description': 'My Store'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/delete', {
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            validate: () => {
                var deferred = Q.defer();

                tools.put('/store/stores/validate', {
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            unsubscribe: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/unsubscribe', {
                    'email': 'shared@email.com',
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            updatesubscriber: () => {
                var deferred = Q.defer();

                tools.post('/store/stores/update-subscriber', {
                    'role': 2,
                    'email': 'shared@email.com',
                    'storeId': storeId,
                    'couriers': 1,
                    'products': 1,
                    'suppliers': 1,
                    'departments': 1,
                    'collectionpoints': 1
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        reports: {
            sales: () => {
                var deferred = Q.defer();

                tools.post('/store/reports/sales', {
                    'date': {
                        'to': new Date(),
                        'from': new Date()
                    },
                    'storeId': storeId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        payfast: {
            payment: () => {
                var deferred = Q.defer();

                tools.post('/store/payfast/payment', {
                    'item_name': 'Online Store Purchase',
                    'amount_fee': 4.6,
                    'amount_net': 225.4,
                    'custom_str1': storeId,
                    'custom_str2': 'order',
                    'custom_str3': '',
                    'custom_str4': '',
                    'custom_str5': '',
                    'custom_int1': 0,
                    'custom_int2': 0,
                    'custom_int3': 0,
                    'custom_int4': 0,
                    'custom_int5': 0,
                    'amount_gross': 230,
                    'm_payment_id': orderId,
                    'email_address': config.email,
                    'pf_payment_id': 'xxx',
                    'payment_status': 'SUCCESS',
                    'item_description': 'Online Store Purchase'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        reviews: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/add', {
                    'score': 1,
                    'message': 'xxx',
                    'storeId': storeId,
                    'reviewId': reviewId,
                    'productId': productId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/get', {
                    'filter': [
                        'score',
                        'status',
                        'storeId',
                        'message',
                        'reviewId',
                        'productId',
                        'serverDate'
                    ],
                    'storeId': storeId,
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/list', {
                    'filter': [
                        'score',
                        'status',
                        'storeId',
                        'message',
                        'reviewId',
                        'productId',
                        'serverDate'
                    ],
                    'storeId': storeId,
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/update', {
                    'score': 2,
                    'storeId': storeId,
                    'message': 'xxx',
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/delete', {
                    'storeId': storeId,
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            reject: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/reject', {
                    'storeId': storeId,
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            approve: () => {
                var deferred = Q.defer();

                tools.post('/store/reviews/approve', {
                    'storeId': storeId,
                    'reviewId': reviewId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        products: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/products/add', {
                    'images': [
                        {
                            'src': 'https://bitid.co.za/assets/logo.png',
                            'main': true,
                            'position': 1
                        },
                        {
                            'src': 'https://bitid.co.za/assets/logo.png',
                            'main': false,
                            'position': 2
                        }
                    ],
                    'shipping': {},
                    'promotion': {
                        'price': 0,
                        'enabled': false
                    },
                    'departments': [
                        departmentId
                    ],
                    'cost': 50,
                    'info': [],
                    'type': 'physical',
                    'title': 'My First Product',
                    'price': 100,
                    'storeId': storeId,
                    'supplierId': supplierId,
                    'description': 'xxx',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/products/get', {
                    'filter': [
                        'cost',
                        'role',
                        'info',
                        'type',
                        'score',
                        'title',
                        'price',
                        'images',
                        'storeId',
                        'reviews',
                        'productId',
                        'promotion',
                        'supplierId',
                        'serverDate',
                        'departments',
                        'description'
                    ],
                    'productId': productId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/products/list', {
                    'filter': [
                        'cost',
                        'role',
                        'info',
                        'type',
                        'image',
                        'score',
                        'title',
                        'price',
                        'storeId',
                        'reviews',
                        'productId',
                        'promotion',
                        'supplierId',
                        'serverDate',
                        'departments',
                        'description'
                    ],
                    'productId': productId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/products/update', {
                    'productId': productId,
                    'description': 'Mocha Product 1'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/products/delete', {
                    'productId': productId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        warnings: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/warnings/add', {
                    'storeId': storeId,
                    'description': 'API 1 TEST',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/warnings/get', {
                    'filter': [
                        'role',
                        'storeId',
                        'warningId',
                        'serverDate',
                        'description'
                    ],
                    'warningId': warningId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/warnings/list', {
                    'filter': [
                        'role',
                        'storeId',
                        'warningId',
                        'serverDate',
                        'description'
                    ],
                    'warningId': warningId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/warnings/update', {
                    'warningId': warningId,
                    'description': 'API 1'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/warnings/delete', {
                    'warningId': warningId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        couriers: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/couriers/add', {
                    'options': [
                        {
                            'price': 1,
                            'optionId': 'express',
                            'description': 'express'
                        }
                    ],
                    'icon': 'xxx',
                    'email': 'xxx',
                    'email': 'xxx',
                    'phone': 'xxx',
                    'account': 'xxx',
                    'storeId': storeId,
                    'description': 'xxx'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/couriers/get', {
                    'filter': [
                        'role',
                        'icon',
                        'email',
                        'phone',
                        'storeId',
                        'account',
                        'options',
                        'courierId',
                        'serverDate',
                        'description'
                    ],
                    'courierId': courierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/couriers/list', {
                    'filter': [
                        'role',
                        'icon',
                        'email',
                        'phone',
                        'storeId',
                        'account',
                        'options',
                        'courierId',
                        'serverDate',
                        'description'
                    ],
                    'courierId': courierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/couriers/update', {
                    'courierId': courierId,
                    'description': 'Courier 1'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/couriers/delete', {
                    'courierId': courierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        suppliers: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/suppliers/add', {
                    'address': {
                        'street': '22 Jump Street',
                        'suburb': 'Knuckle',
                        'country': 'South Africa',
                        'cityTown': 'Shoot',
                        'postalCode': '2020',
                        'additionalInfo': 'testing'
                    },
                    'phone': 'xxx',
                    'email': 'xxx',
                    'storeId': storeId,
                    'description': 'xxx',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/suppliers/get', {
                    'filter': [
                        'role',
                        'phone',
                        'email',
                        'address',
                        'storeId',
                        'supplierId',
                        'serverDate',
                        'description'
                    ],
                    'supplierId': supplierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/suppliers/list', {
                    'filter': [
                        'role',
                        'phone',
                        'email',
                        'storeId',
                        'address',
                        'supplierId',
                        'serverDate',
                        'description'
                    ],
                    'supplierId': supplierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/suppliers/update', {
                    'address': {
                        'street': 'xxx',
                        'suburb': 'xxx',
                        'cityTown': 'xxx',
                        'postalCode': 'xxx',
                        'additionalInfo': 'xxx'
                    },
                    'about': 'xxx',
                    'email': 'xxx',
                    'phone': 'xxx',
                    'supplierId': supplierId,
                    'description': 'Supplier 1 Updated'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/suppliers/delete', {
                    'supplierId': supplierId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        wishlists: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/wishlists/add', {
                    'storeId': storeId,
                    'quantity': 1,
                    'productId': productId,
                    'wishlistId': wishlistId

                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/wishlists/list', {
                    'filter': [
                        'storeId',
                        'quantity',
                        'productId',
                        'wishlistId',
                        'serverDate'
                    ],
                    'storeId': storeId,
                    'wishlistId': wishlistId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/wishlists/update', {
                    'quantity': 2,
                    'storeId': storeId,
                    'wishlistId': wishlistId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/wishlists/delete', {
                    'storeId': storeId,
                    'wishlistId': wishlistId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        addresses: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/addresses/add', {
                    'vat': 'xxx',
                    'type': 'business',
                    'street': 'xxx',
                    'number': 'xxx',
                    'suburb': 'xxx',
                    'storeId': storeId,
                    'business': 'xxx',
                    'cityTown': 'xxx',
                    'recipient': 'xxx',
                    'addressId': 'xxx',
                    'serverDate': 'xxx',
                    'postalCode': 'xxx',
                    'additionalInfo': 'xxx'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/addresses/get', {
                    'filter': [
                        'vat',
                        'type',
                        'street',
                        'number',
                        'suburb',
                        'storeId',
                        'business',
                        'cityTown',
                        'recipient',
                        'addressId',
                        'serverDate',
                        'postalCode',
                        'additionalInfo'
                    ],
                    'storeId': storeId,
                    'addressId': addressId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/addresses/list', {
                    'filter': [
                        'vat',
                        'type',
                        'street',
                        'number',
                        'suburb',
                        'storeId',
                        'business',
                        'cityTown',
                        'recipient',
                        'addressId',
                        'serverDate',
                        'postalCode',
                        'additionalInfo'
                    ],
                    'storeId': storeId,
                    'addressId': addressId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/addresses/update', {
                    'vat': 'xxx',
                    'type': 'xxx',
                    'street': 'xxx',
                    'suburb': 'xxx',
                    'number': 'xxx',
                    'storeId': storeId,
                    'business': 'xxx',
                    'cityTown': 'xxx',
                    'addressId': addressId,
                    'recipient': 'xxx',
                    'postalCode': 'xxx',
                    'additionalInfo': 'xxx'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/addresses/delete', {
                    'storeId': storeId,
                    'addressId': addressId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        healthcheck: () => {
            var deferred = Q.defer();

            tools.put('/health-check', {})
                .then(deferred.resolve, deferred.resolve);

            return deferred.promise;
        },
        departments: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/departments/add', {
                    'storeId': storeId,
                    'description': 'xxx',
                    'organizationOnly': 0
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/departments/get', {
                    'filter': [
                        'role',
                        'storeId',
                        'serverDate',
                        'description',
                        'departmentId'
                    ],
                    'departmentId': departmentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/departments/list', {
                    'filter': [
                        'role',
                        'storeId',
                        'serverDate',
                        'description',
                        'departmentId'
                    ],
                    'departmentId': departmentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/departments/update', {
                    'description': 'Department 1',
                    'departmentId': departmentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/departments/delete', {
                    'departmentId': departmentId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        },
        collectionpoints: {
            add: () => {
                var deferred = Q.defer();

                tools.post('/store/collection-points/add', {
                    'address': {
                        'street': 'xxx',
                        'suburb': 'xxx',
                        'country': 'xxx',
                        'cityTown': 'xxx',
                        'postalCode': 'xxx',
                        'additionalInfo': 'xxx'
                    },
                    'storeId': storeId,
                    'description': 'test'
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            get: () => {
                var deferred = Q.defer();

                tools.post('/store/collection-points/get', {
                    'filter': [
                        'role',
                        'storeId',
                        'address',
                        'serverDate',
                        'description',
                        'collectionpointId'
                    ],
                    'collectionpointId': collectionpointId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            list: () => {
                var deferred = Q.defer();

                tools.post('/store/collection-points/list', {
                    'filter': [
                        'role',
                        'storeId',
                        'address',
                        'serverDate',
                        'description',
                        'collectionpointId'
                    ],
                    'collectionpointId': collectionpointId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            update: () => {
                var deferred = Q.defer();

                tools.post('/store/collection-points/update', {
                    'address': {
                        'street': 'xxx',
                        'suburb': 'xxx',
                        'country': 'xxx',
                        'cityTown': 'xxx',
                        'postalCode': 'xxx',
                        'additionalInfo': 'xxx'
                    },
                    'description': 'test',
                    'collectionpointId': collectionpointId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            },
            delete: () => {
                var deferred = Q.defer();

                tools.post('/store/collection-points/delete', {
                    'collectionpointId': collectionpointId
                })
                    .then(deferred.resolve, deferred.resolve);

                return deferred.promise;
            }
        }
    },
    put: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.store + url, {
            'headers': {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'PUT'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    },
    post: async (url, payload) => {
        var deferred = Q.defer();

        payload.header = {
            'email': config.email,
            'appId': config.appId
        };

        payload = JSON.stringify(payload);

        const response = await fetch(config.store + url, {
            'headers': {
                'Accept': '*/*',
                'Content-Type': 'application/json; charset=utf-8',
                'Authorization': JSON.stringify(config.token),
                'Content-Length': payload.length
            },
            'body': payload,
            'method': 'POST'
        });

        const result = await response.json();

        deferred.resolve(result);

        return deferred.promise;
    }
};