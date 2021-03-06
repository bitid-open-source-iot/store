const Q = require('q');
const db = require('./../db/mongo');
const format = require('../lib/format');
const dbMySQL = require('./../db/mysql');
const ObjectId = require('mongodb').ObjectId;
const ErrorResponse = require('./../lib/error-response');

var module = function () {
	var dalCarts = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId),
				'quantity': args.req.body.quantity,
				'productId': ObjectId(args.req.body.productId),
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblCarts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		sync: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'removeMany',
				'collection': 'tblCarts'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = args.req.body.products.map(o => {
						return {
							'email': format.email(args.req.body.header.email),
							'storeId': ObjectId(args.req.body.storeId),
							'quantity': o.quantity,
							'productId': ObjectId(o.productId),
							'serverDate': new Date()
						};
					});


					deferred.resolve({
						'params': params,
						'operation': 'insertMany',
						'collection': 'tblCarts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var filter = {
				'_id': 1,
				'type': 1,
				'title': 1,
				'price': 1,
				'email': 1,
				'image': '$images.src',
				'storeId': 1,
				'quantity': 1,
				'promotion': 1,
				'productId': 1
			};

			if (Array.isArray(args.req.body.filter)) {
				if (args.req.body.filter.length > 0) {
					Object.keys(filter).map(key => {
						if (!args.req.body.filter.includes(key)) {
							filter[key] = 0;
						};
					});
					if (args.req.body.filter.includes('cartId')) {
						filter._id = 1;
					};
				};
			};

			var params = [
				{
					$match: {
						'email': format.email(args.req.body.header.email),
						'storeId': ObjectId(args.req.body.storeId)
					}
				},
				{
					$lookup: {
						as: 'product',
						from: 'tblProducts',
						localField: 'productId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$product'
				},
				{
					$project: {
						'_id': 1,
						'type': '$product.type',
						'title': '$product.title',
						'price': '$product.price',
						'email': 1,
						'images': '$product.images',
						'storeId': 1,
						'quantity': 1,
						'promotion': '$product.promotion',
						'productId': 1
					}
				},
				{
					$unwind: '$images'
				},
				{
					$match: {
						'images.main': true
					}
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCarts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.cartId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.quantity) != 'undefined') {
				update.$set.quantity = args.req.body.quantity;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCarts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': null,
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (Array.isArray(args.req.body.cartId)) {
				params._id = {
					$in: args.req.body.cartId.map(id => ObjectId(id))
				};
			} else if (typeof (args.req.body.cartId) == 'string') {
				params._id = ObjectId(args.req.body.cartId);
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblCarts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalOrders = {
		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.status) != 'undefined') {
				params.status = args.req.body.status;
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				filter.status = 1;
				args.req.body.filter.map(f => {
					if (f == 'orderId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.order = JSON.parse(JSON.stringify(result[0]));
					args.result = args.order;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		load: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {
						'_id': ObjectId(args.req.body.orderId)
					}
				},
				{
					$lookup: {
						as: 'store',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$store'
				},
				{
					$project: {
						'date': 1,
						'email': 1,
						'storeId': 1,
						'payment': 1,
						'orderId': '$_id',
						'products': 1,
						'shipping': 1,
						'recipient': 1,
						'store.logo': 1,
						'store.address': 1,
						'store.contact': 1,
						'store.description': 1
					}
				},
				{
					$unwind: '$products'
				},
				{
					$lookup: {
						as: 'config',
						from: 'tblProducts',
						localField: 'products.productId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$config'
				},
				{
					$addFields: {
						'products.cost': '$config.cost',
						'products.supplierId': '$config.supplierId'
					}
				},
				{
					$lookup: {
						as: 'supplier',
						from: 'tblSuppliers',
						localField: 'products.supplierId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$supplier'
				},
				{
					$addFields: {
						'products.supplier': {
							'phone': '$supplier.phone',
							'email': '$supplier.email',
							'address': '$supplier.address',
							'description': '$supplier.description'
						}
					}
				},
				{
					$group: {
						'_id': '$_id',
						'date': {
							$first: '$date'
						},
						'email': {
							$first: '$email'
						},
						'store': {
							$first: '$store'
						},
						'orderId': {
							$first: '$orderId'
						},
						'storeId': {
							$first: '$storeId'
						},
						'payment': {
							$first: '$payment'
						},
						'products': {
							$push: '$products'
						},
						'shipping': {
							$first: '$shipping'
						},
						'recipient': {
							$first: '$recipient'
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.order = JSON.parse(JSON.stringify(result[0]));
					args.order.vouchers = [];
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.orderId) != 'undefined') {
				if (Array.isArray(args.req.body.orderId)) {
					params._id = {
						$in: args.req.body.orderId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.orderId) == 'string') {
					params._id = ObjectId(args.req.body.orderId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				var filter = {
					'_id': 0,
					'status': 1
				};
				args.req.body.filter.map(f => {
					if (f == 'orderId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		paid: (args) => {
			var deferred = Q.defer();

			args.order.date.paid = new Date();

			var params = {
				'_id': ObjectId(args.order.orderId),
				'email': args.order.email,
				'status': 'initialized',
				'storeId': ObjectId(args.order.storeId)
			};
			var update = {
				$set: {
					'status': 'paid',
					'date.paid': args.order.date.paid,
					'serverDate': new Date()
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.result = result;
					args.order.date.paid = new Date();
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId),
				'email': format.email(args.req.body.header.email),
				'status': 'initialized',
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.payment) != 'undefined' && args.req.body.payment != null && args.req.body.payment != '') {
				if (typeof (args.req.body.payment.vat) != 'undefined') {
					update.$set['payment.vat'] = args.req.body.payment.vat;
				};
				if (typeof (args.req.body.payment.total) != 'undefined') {
					update.$set['payment.total'] = args.req.body.payment.total;
				};
				if (typeof (args.req.body.payment.credit) != 'undefined') {
					update.$set['payment.credit'] = args.req.body.payment.credit;
				};
				if (typeof (args.req.body.payment.method) != 'undefined') {
					update.$set['payment.method'] = args.req.body.payment.method;
				};
				if (typeof (args.req.body.payment.discount) != 'undefined') {
					update.$set['payment.discount'] = args.req.body.payment.discount;
				};
				if (typeof (args.req.body.payment.shipping) != 'undefined') {
					update.$set['payment.shipping'] = args.req.body.payment.shipping;
				};
				if (typeof (args.req.body.payment.subtotal) != 'undefined') {
					update.$set['payment.subtotal'] = args.req.body.payment.subtotal;
				};
			};
			if (typeof (args.req.body.shipping) != 'undefined' && args.req.body.shipping != null && args.req.body.shipping != '') {
				if (typeof (args.req.body.shipping.address) != 'undefined' && args.req.body.shipping.address != null && args.req.body.shipping.address != '') {
					if (typeof (args.req.body.shipping.address.street) != 'undefined') {
						update.$set['shipping.address.street'] = args.req.body.shipping.address.street;
					};
					if (typeof (args.req.body.shipping.address.suburb) != 'undefined') {
						update.$set['shipping.address.suburb'] = args.req.body.shipping.address.suburb;
					};
					if (typeof (args.req.body.shipping.address.cityTown) != 'undefined') {
						update.$set['shipping.address.cityTown'] = args.req.body.shipping.address.cityTown;
					};
					if (typeof (args.req.body.shipping.address.postalCode) != 'undefined') {
						update.$set['shipping.address.postalCode'] = args.req.body.shipping.address.postalCode;
					};
					if (typeof (args.req.body.shipping.address.additionalInfo) != 'undefined') {
						update.$set['shipping.address.additionalInfo'] = args.req.body.shipping.address.additionalInfo;
					};
				};
				if (typeof (args.req.body.shipping.method) != 'undefined') {
					update.$set['shipping.method'] = args.req.body.shipping.method;
				};
				if (typeof (args.req.body.shipping.enabled) != 'undefined') {
					update.$set['shipping.enabled'] = args.req.body.shipping.enabled;
				};
				if (typeof (args.req.body.shipping.optionId) != 'undefined' && args.req.body.shipping.optionId != null && args.req.body.shipping.optionId != '') {
					if (args.req.body.shipping.optionId.length == 24) {
						update.$set['shipping.optionId'] = ObjectId(args.req.body.shipping.optionId);
					};
				};
				if (typeof (args.req.body.shipping.courierId) != 'undefined' && args.req.body.shipping.courierId != null && args.req.body.shipping.courierId != '') {
					if (args.req.body.shipping.courierId.length == 24) {
						update.$set['shipping.courierId'] = ObjectId(args.req.body.shipping.courierId);
					};
				};
				if (typeof (args.req.body.shipping.collectionpointId) != 'undefined' && args.req.body.shipping.collectionpointId != null && args.req.body.shipping.collectionpointId != '') {
					if (args.req.body.shipping.collectionpointId.length == 24) {
						update.$set['shipping.collectionpointId'] = args.req.body.shipping.collectionpointId;
					};
				};
			};
			if (typeof (args.req.body.recipient) != 'undefined' && args.req.body.recipient != null && args.req.body.recipient != '') {
				if (typeof (args.req.body.recipient.name) != 'undefined' && args.req.body.recipient.name != null && args.req.body.recipient.name != '') {
					if (typeof (args.req.body.recipient.name.last) != 'undefined') {
						update.$set['recipient.name.last'] = args.req.body.recipient.name.last;
					};
					if (typeof (args.req.body.recipient.name.first) != 'undefined') {
						update.$set['recipient.name.first'] = args.req.body.recipient.name.first;
					};
				};
				if (typeof (args.req.body.recipient.company) != 'undefined' && args.req.body.recipient.company != null && args.req.body.recipient.company != '') {
					if (typeof (args.req.body.recipient.company.vat) != 'undefined') {
						update.$set['recipient.company.vat'] = args.req.body.recipient.company.vat;
					};
					if (typeof (args.req.body.recipient.company.reg) != 'undefined') {
						update.$set['recipient.company.reg'] = args.req.body.recipient.company.reg;
					};
					if (typeof (args.req.body.recipient.company.name) != 'undefined') {
						update.$set['recipient.company.name'] = args.req.body.recipient.company.name;
					};
				};
				if (typeof (args.req.body.recipient.email) != 'undefined') {
					update.$set['recipient.email'] = args.req.body.recipient.email;
				};
				if (typeof (args.req.body.recipient.number) != 'undefined') {
					update.$set['recipient.number'] = args.req.body.recipient.number;
				};
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId),
				'email': format.email(args.req.body.header.email),
				'status': 'initialized',
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		initialize: (args) => {
			var deferred = Q.defer();

			var params = {
				_id: {
					$in: args.req.body.products.map(o => ObjectId(o.productId))
				}
			}
			var filter = {
				_id: 1,
				quantity: 1
			}

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblProducts'
			})
				.then(result => {
					var deferred = Q.defer();

					result.map(o => {
						o.productId = o._id.toString();
						args.req.body.products.map(product => {
							if (o.productId == product.productId) {
								product.max = o.quantity;
							}
						})
					});

					args.req.body.products = args.req.body.products.filter(o => o.max > 0);

					if (args.req.body.products.length == 0) {
						var err = new ErrorResponse();
						err.error.errors[0].code = 503;
						err.error.errors[0].reason = 'Not enough products to fill order!';
						err.error.errors[0].message = 'Not enough products to fill order!';
						deferred.reject(err);
						return deferred.promise;
					} else {
						args.req.body.products.map(o => {
							if (o.max < o.quantity) {
								o.quantity = o.max;
							};
						});

						args.req.body.products = args.req.body.products.map(o => {
							o.productId = ObjectId(o.productId);
							return o;
						})

						var params = {
							'date': {
								'paid': null,
								'sent': null,
								'returned': null,
								'delivered': null,
								'initialized': new Date()
							},
							'payment': {
								'vat': null,
								'total': null,
								'credit': null,
								'method': null,
								'discount': null,
								'shipping': null,
								'subtotal': null
							},
							'shipping': {
								'address': {},
								'method': null,
								'enabled': null,
								'optionId': null,
								'courierId': null
							},
							'recipient': {
								'name': {
									'last': null,
									'first': null
								},
								'company': {
									'vat': null,
									'reg': null,
									'name': null
								},
								'email': format.email(args.req.body.header.email),
								'number': null
							},
							'email': format.email(args.req.body.header.email),
							'status': 'initialized',
							'storeId': ObjectId(args.req.body.storeId),
							'products': args.req.body.products,
							'serverDate': new Date()
						};

						deferred.resolve({
							'params': params,
							'operation': 'insert',
							'collection': 'tblOrders'
						});
					};

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.orderId = result[0]._id.toString();
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalStores = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'contact': {
					'email': args.req.body.contact.email || '',
					'number': args.req.body.contact.number || '',
					'website': args.req.body.contact.website || ''
				},
				'payfast': {
					'merchantId': args.req.body.payfast.merchantId || '',
					'merchantKey': args.req.body.payfast.merchantKey || ''
				},
				'address': {
					'vat': args.req.body.address.vat || '',
					'reg': args.req.body.address.reg || '',
					'street': args.req.body.address.street || '',
					'suburb': args.req.body.address.suburb || '',
					'country': args.req.body.address.country || '',
					'cityTown': args.req.body.address.cityTown || '',
					'postalCode': args.req.body.address.postalCode || ''
				},
				'dns': args.req.body.dns || [],
				'maps': args.req.body.maps || false,
				'logo': args.req.body.logo,
				'appId': args.req.body.appId,
				'cover': args.req.body.cover,
				'private': args.req.body.private || false,
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.storeId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'storeId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		load: (args) => {
			var deferred = Q.defer();

			var params = {};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					params._id = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					params._id = ObjectId(args.req.body.storeId);
				};
			} else {
				params.dns = args.req.headers.origin.replace('http://', '').replace('https://', '');
			};

			if (Object.keys(params).length == 0) {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Cant validate store!';
				err.error.errors[0].message = 'Cant validate store!';
				deferred.reject(err);
			} else {
				var filter = {
					_id: 1,
					maps: 1,
					logo: 1,
					appId: 1,
					cover: 1,
					address: 1,
					contact: 1,
					payfast: 1,
					private: 1,
					payments: 1,
					description: 1
				};
				db.call({
					'params': params,
					'filter': filter,
					'operation': 'find',
					'collection': 'tblStores'
				})
					.then(result => {
						args.result = result[0];
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						deferred.reject(err);
					});
			};

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId && args.req.body.storeId.length > 0)) {
					params._id = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string') {
					params._id = ObjectId(args.req.body.storeId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'storeId') {
						filter['_id'] = 1;
					} else if (f == 'role' || f == 'users') {
						filter['bitid.auth.users'] = 1;
					} else if (f == 'organizationOnly') {
						filter['bitid.auth.organizationOnly'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		share: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'bitid.auth.users.email': {
					$ne: format.email(args.req.body.email)
				},
				'_id': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': format.email(args.req.body.email)
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					if (args.result.n == 1) {
						deferred.resolve(args)
					} else {
						var err = new ErrorResponse();
						err.error.errors[0].code = 70;
						err.error.errors[0].reason = 'Could not share user!';
						err.error.errors[0].message = 'Could not share user!';
						deferred.reject(err);
					};
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2,
							$lte: 5
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.payfast) != 'undefined' && args.req.body.payfast != null) {
				if (typeof (args.req.body.payfast.merchantId) != 'undefined' && args.req.body.payfast.merchantId != null) {
					update.$set['payfast.merchantId'] = args.req.body.payfast.merchantId;
				};
				if (typeof (args.req.body.payfast.merchantKey) != 'undefined' && args.req.body.payfast.merchantKey != null) {
					update.$set['payfast.merchantKey'] = args.req.body.payfast.merchantKey;
				};
			};
			if (typeof (args.req.body.contact) != 'undefined' && args.req.body.contect != null) {
				if (typeof (args.req.body.contact.email) != 'undefined' && args.req.body.contect.email != null) {
					update.$set['contact.email'] = args.req.body.contact.email;
				};
				if (typeof (args.req.body.contact.number) != 'undefined' && args.req.body.contect.number != null) {
					update.$set['contact.number'] = args.req.body.contact.number;
				};
				if (typeof (args.req.body.contact.website) != 'undefined' && args.req.body.contect.website != null) {
					update.$set['contact.website'] = args.req.body.contact.website;
				};
			};
			if (typeof (args.req.body.address) != 'undefined' && args.req.body.address != null) {
				if (typeof (args.req.body.address.vat) != 'undefined' && args.req.body.address.vat != null) {
					update.$set['address.vat'] = args.req.body.address.vat;
				};
				if (typeof (args.req.body.address.reg) != 'undefined' && args.req.body.address.reg != null) {
					update.$set['address.reg'] = args.req.body.address.reg;
				};
				if (typeof (args.req.body.address.street) != 'undefined' && args.req.body.address.street != null) {
					update.$set['address.street'] = args.req.body.address.street;
				};
				if (typeof (args.req.body.address.suburb) != 'undefined' && args.req.body.address.suburb != null) {
					update.$set['address.suburb'] = args.req.body.address.suburb;
				};
				if (typeof (args.req.body.address.country) != 'undefined' && args.req.body.address.country != null) {
					update.$set['address.country'] = args.req.body.address.country;
				};
				if (typeof (args.req.body.address.cityTown) != 'undefined' && args.req.body.address.cityTown != null) {
					update.$set['address.cityTown'] = args.req.body.address.cityTown;
				};
				if (typeof (args.req.body.address.postalCode) != 'undefined' && args.req.body.address.postalCode != null) {
					update.$set['address.postalCode'] = args.req.body.address.postalCode;
				};
			};
			if (typeof (args.req.body.dns) != 'undefined' && Array.isArray(args.req.body.dns)) {
				update.$set.dns = args.req.body.dns;
			};
			if (typeof (args.req.body.maps) != 'undefined' && args.req.body.maps != null) {
				update.$set.maps = args.req.body.maps;
			};
			if (typeof (args.req.body.logo) != 'undefined' && args.req.body.logo != null) {
				update.$set.logo = args.req.body.logo;
			};
			if (typeof (args.req.body.cover) != 'undefined' && args.req.body.cover != null) {
				update.$set.cover = args.req.body.cover;
			};
			if (typeof (args.req.body.appId) != 'undefined' && args.req.body.appId != null) {
				update.$set.appId = args.req.body.appId;
			};
			if (typeof (args.req.body.private) != 'undefined' && args.req.body.private != null) {
				update.$set.private = args.req.body.private;
			};
			if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null) {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined' && args.req.body.organizationOnly != null) {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		validate: (args) => {
			var deferred = Q.defer();

			var match = {};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match._id = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match._id = ObjectId(args.req.body.storeId);
				};
			} else {
				match.dns = args.req.headers.origin.replace('http://', '').replace('https://', '');
			};

			var params = [
				{
					$match: match
				},
				{
					$lookup: {
						as: 'customers',
						from: 'tblCustomers',
						localField: '_id',
						foreignField: 'storeId'
					}
				},
				{
					$addFields: {
						customers: '$customers'
					}
				},
				{
					$addFields: {
						users: '$bitid.auth.users'
					}
				},
				{
					$addFields: {
						users: {
							$concatArrays: ['$users', '$customers']
						}
					}
				},
				{
					$project: {
						'dns': 1,
						'logo': 1,
						'users': 1,
						'storeId': '$_id',
						'private': 1,
						'address': 1,
						'payfast': 1,
						'contact': 1,
						'payments': 1,
						'description': 1
					}
				}
			];

			if (Object.keys(match).length == 0) {
				var err = new ErrorResponse();
				err.error.errors[0].code = 503;
				err.error.errors[0].reason = 'Cant validate store!';
				err.error.errors[0].message = 'Cant validate store!';
				deferred.reject(err);
			} else {
				db.call({
					'params': params,
					'operation': 'aggregate',
					'collection': 'tblStores'
				})
					.then(result => {
						args.store = JSON.parse(JSON.stringify(result[0]));
						if (typeof (args.req.body.storeId) == 'undefined' || args.req.body.storeId == null || args.req.body.storeId == '') {
							args.req.body.storeId = args.store.storeId;
						};

						if (args.store.private) {
							args.store.users = args.store.users.filter(o => o.status == 'accepted').map(o => o.email)
							if (args.store.users.includes(format.email(args.req.body.header.email))) {
								deferred.resolve(args);
							} else {
								var err = new ErrorResponse();
								err.error.code = 503;
								err.error.errors[0].code = 69;
								err.error.errors[0].reason = 'Store is private!';
								err.error.errors[0].message = 'Store is private!';
								err.error.errors[0].location = 'dalStores';
								err.error.errors[0].locationType = 'Validation Error';
								deferred.reject(err);
								return deferred.promise;
							};
						} else {
							deferred.resolve(args);
						};
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						err.error.errors[0].location = 'dalStores';
						deferred.reject(err);
					});
			};

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': format.email(args.req.body.email)
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblStores'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		updatesubscriber: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 4
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': format.email(args.req.body.email)
							}
						},
						'_id': ObjectId(args.req.body.storeId)
					};
					var update = {
						$set: {
							'bitid.auth.users.$.role': args.req.body.role
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblStores'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalReviews = {
		public: {
			list: (args) => {
				var deferred = Q.defer();

				var params = {
					'productId': ObjectId(args.req.body.productId)
				};

				var filter = {};
				if (typeof (args.req.body.filter) != 'undefined') {
					filter._id = 0;
					args.req.body.filter.map(f => {
						if (f == 'reviewId') {
							filter['_id'] = 1;
						} else {
							filter[f] = 1;
						};
					});
				};

				db.call({
					'params': params,
					'filter': filter,
					'operation': 'find',
					'collection': 'tblReviews'
				})
					.then(result => {
						args.result = JSON.parse(JSON.stringify(result));
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						deferred.reject(err);
					});

				return deferred.promise;
			}
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'score': args.req.body.score,
				'status': 'pending approval',
				'storeId': ObjectId(args.req.body.storeId),
				'message': args.req.body.message,
				'productId': ObjectId(args.req.body.productId),
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblReviews'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'reviewId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblReviews'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'reviewId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						store: {
							description: '$stores.description'
						},
						bitid: '$stores.bitid',
					}
				},
				{
					$lookup: {
						as: 'products',
						from: 'tblProducts',
						localField: 'productId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$products'
				},
				{
					$addFields: {
						product: {
							title: '$products.title'
						}
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblReviews'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.score) != 'undefined') {
				update.$set.score = args.req.body.score;
			};
			if (typeof (args.req.body.message) != 'undefined') {
				update.$set.message = args.req.body.message;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblReviews'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblReviews'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		reject: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						},
						'_id': ObjectId(args.req.body.reviewId)
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblReviews'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.reviewId)
					};
					var update = {
						$set: {
							'status': 'rejected'
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblReviews'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		approve: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						},
						'_id': ObjectId(args.req.body.reviewId)
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblReviews'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.reviewId)
					};
					var update = {
						$set: {
							'status': 'approved'
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblReviews'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.result = JSON.parse(JSON.stringify(result));

					var params = {
						'_id': ObjectId(args.req.body.reviewId)
					};
					var filter = {
						'productId': 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblReviews'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = [
						{
							$match: {
								'status': 'approved',
								'productId': result[0].productId
							}
						},
						{
							$group: {
								'_id': '$productId',
								'max': {
									$sum: '$score'
								},
								'count': {
									$sum: 1
								}
							}
						}
					];

					deferred.resolve({
						'params': params,
						'operation': 'aggregate',
						'collection': 'tblReviews'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(result[0]._id)
					};
					var update = {
						$set: {
							'score': (result[0].max / result[0].count)
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalReports = {
		sales: (args) => {
			var deferred = Q.defer();

			var date = {
				'to': new Date(),
				'from': new Date()
			};

			if (typeof (args.req.body.date) != 'undefined' && args.req.body.date !== null) {
				if (typeof (args.req.body.date.to) != 'undefined' && args.req.body.date.to !== null && args.req.body.date.to != '') {
					date.to = new Date(args.req.body.date.to);
				};
				if (typeof (args.req.body.date.from) != 'undefined' && args.req.body.date.from !== null && args.req.body.date.from != '') {
					date.from = new Date(args.req.body.date.from);
				};
			};

			date.to.setHours(23);
			date.to.setMinutes(59);
			date.to.setSeconds(59);
			date.to.setMilliseconds(999);

			date.from.setHours(0);
			date.from.setMinutes(0);
			date.from.setSeconds(0);
			date.from.setMilliseconds(0);

			var match = {
				$or: [
					{
						'date.initialized': {}
					},
					{
						'date.paid': {}
					},
					{
						'date.delivered': {}
					},
					{
						'date.returned': {}
					}
				]
			};

			if (typeof (args.req.body.date) != 'undefined' && args.req.body.date != null) {
				if (typeof (args.req.body.date.to) != 'undefined' && args.req.body.date.to != null) {
					match.$or.map(o => {
						Object.keys(o).map(key => {
							if (key.indexOf('date.') > -1) {
								o[key].$lte = new Date(args.req.body.date.to);
							};
						});
					});
				};
				if (typeof (args.req.body.date.from) != 'undefined' && args.req.body.date.from != null) {
					match.$or.map(o => {
						Object.keys(o).map(key => {
							if (key.indexOf('date.') > -1) {
								o[key].$gte = new Date(args.req.body.date.from);
							};
						});
					});
				};
			};
			if (typeof (args.req.body.status) != 'undefined' && args.req.body.status != null) {
				if (Array.isArray(args.req.body.status) && args.req.body.status.length > 0) {
					match.$or.map(o => {
						o.status = {
							$in: args.req.body.status
						};
					});
				} else if (typeof (args.req.body.status) == 'string') {
					match.$or.map(o => {
						o.status = args.req.body.status;
					});
				};
			};
			if (typeof (args.req.body.storeId) != 'undefined' && args.req.body.storeId != null) {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.$or.map(o => {
						o.storeId = {
							$in: args.req.body.storeId.map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.$or.map(o => {
						o.storeId = ObjectId(args.req.body.storeId);
					});
				};
			};

			match.$or.map(o => {
				Object.keys(o).map(key => {
					if (key.indexOf('date.') > -1 && Object.keys(o[key]).length == 0) {
						delete o[key];
					};
				});
			});

			var params = [
				{
					$match: match
				},
				{
					$addFields: {
						'vat': '$payment.vat',
						'total': '$payment.total',
						'orderId': '$_id',
						'subtotal': '$payment.subtotal'
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalProducts = {
		public: {
			get: (args) => {
				var deferred = Q.defer();

				var params = {
					'_id': ObjectId(args.req.body.productId),
					'visible': true,
					'storeId': ObjectId(args.req.body.storeId)
				};

				var filter = {};
				if (typeof (args.req.body.filter) != 'undefined') {
					filter._id = 0;
					args.req.body.filter.map(f => {
						if (f == 'productId') {
							filter['_id'] = 1;
						} else {
							filter[f] = 1;
						};
					});
				};

				db.call({
					'params': params,
					'filter': filter,
					'operation': 'find',
					'collection': 'tblProducts'
				})
					.then(result => {
						args.result = JSON.parse(JSON.stringify(result[0]));
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});

				return deferred.promise;
			},

			list: (args) => {
				var deferred = Q.defer();

				var match = {
					'visible': true,
					'storeId': ObjectId(args.req.body.storeId)
				};

				if (typeof (args.req.body.location) != 'undefined' && args.req.body.location != null) {
					if (typeof (args.req.body.location.enabled) != 'undefined' && args.req.body.location.enabled != null) {
						match['location.enabled'] = args.req.body.location.enabled;
					};
				};

				if (typeof (args.req.body.productId) != 'undefined' && args.req.body.productId != null) {
					if (Array.isArray(args.req.body.productId) && args.req.body.productId.length > 0) {
						match._id = {
							$in: args.req.body.productId.map(id => ObjectId(id))
						};
					} else if (typeof (args.req.body.productId) == 'string' && args.req.body.productId.length == 24) {
						match._id = ObjectId(args.req.body.productId);
					}
				};

				var filter = {};
				if (typeof (args.req.body.filter) != 'undefined') {
					filter._id = 0;
					args.req.body.filter.map(f => {
						if (f == 'productId') {
							filter['_id'] = 1;
						} else {
							filter[f] = 1;
						};
					});
				};

				var params = [
					{
						$lookup: {
							as: 'stores',
							from: 'tblStores',
							localField: 'storeId',
							foreignField: '_id'
						}
					},
					{
						$unwind: '$stores'
					},
					{
						$addFields: {
							bitid: '$stores.bitid',
							image: '$images'
						}
					},
					{
						$unwind: '$image'
					},
					{
						$match: {
							'image.main': true
						}
					},
					{
						$addFields: {
							image: '$image.src'
						}
					},
					{
						$match: match
					},
					{
						$project: filter
					}
				];

				db.call({
					'params': params,
					'operation': 'aggregate',
					'collection': 'tblProducts'
				})
					.then(result => {
						args.result = JSON.parse(JSON.stringify(result));
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});

				return deferred.promise;
			}
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'location': {
							'enabled': false,
							'latitude': 0,
							'longitude': 0
						},
						'cost': args.req.body.cost || 0,
						'type': args.req.body.type,
						'links': args.req.body.links || [],
						'score': 0,
						'title': args.req.body.title,
						'price': args.req.body.price,
						'images': args.req.body.images || [],
						'expiry': args.req.body.expiry || {},
						'reviews': 0,
						'storeId': ObjectId(args.req.body.storeId),
						'visible': args.req.body.visible,
						'quantity': args.req.body.quantity || 0,
						'returned': 0,
						'purchased': 0,
						'promotion': args.req.body.promotion || { 'price': 0, 'enabled': false },
						'supplierId': ObjectId(args.req.body.supplierId),
						'serverDate': new Date(),
						'departments': args.req.body.departments || [],
						'description': args.req.body.description
					};

					if (typeof (args.req.body.location) != 'undefined' && args.req.body.location != null) {
						if (typeof (args.req.body.location.enabled) != 'undefined' && args.req.body.location.enabled != null) {
							params.location.enabled = args.req.body.location.enabled;
						};
						if (typeof (args.req.body.location.latitude) != 'undefined' && args.req.body.location.latitude != null) {
							params.location.latitude = args.req.body.location.latitude;
						};
						if (typeof (args.req.body.location.longituded) != 'undefined' && args.req.body.location.longituded != null) {
							params.location.longituded = args.req.body.location.longituded;
						};
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.productId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'productId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.type) != 'undefined') {
				match.type = args.req.body.type;
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.location) != 'undefined' && args.req.body.location != null) {
				if (typeof (args.req.body.location.enabled) != 'undefined' && args.req.body.location.enabled != null) {
					match['location.enabled'] = args.req.body.location.enabled;
				};
			};

			if (typeof (args.req.body.productId) != 'undefined') {
				if (Array.isArray(args.req.body.productId)) {
					match._id = {
						$in: args.req.body.productId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.productId) == 'string') {
					match._id = ObjectId(args.req.body.productId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'productId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
						image: '$images'
					}
				},
				{
					$unwind: '$image'
				},
				{
					$match: {
						'image.main': true
					}
				},
				{
					$addFields: {
						image: '$image.src'
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblProducts'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.productId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.cost) != 'undefined') {
						update.$set.cost = args.req.body.cost;
					};
					if (typeof (args.req.body.type) != 'undefined') {
						update.$set.type = args.req.body.type;
					};
					if (typeof (args.req.body.links) != 'undefined') {
						update.$set.links = args.req.body.links;
					};
					if (typeof (args.req.body.title) != 'undefined') {
						update.$set.title = args.req.body.title;
					};
					if (typeof (args.req.body.price) != 'undefined') {
						update.$set.price = args.req.body.price;
					};
					if (typeof (args.req.body.images) != 'undefined') {
						update.$set.images = args.req.body.images;
					};
					if (typeof (args.req.body.visible) != 'undefined') {
						update.$set.visible = args.req.body.visible;
					};
					if (typeof (args.req.body.quantity) != 'undefined') {
						update.$set.quantity = args.req.body.quantity;
					};
					if (typeof (args.req.body.expiry) != 'undefined') {
						if (typeof (args.req.body.expiry.date) != 'undefined') {
							update.$set['expiry.date'] = new Date(args.req.body.expiry.date);
						};
						if (typeof (args.req.body.expiry.enabled) != 'undefined') {
							update.$set['expiry.enabled'] = args.req.body.expiry.enabled;
						};
					};
					if (typeof (args.req.body.location) != 'undefined') {
						if (typeof (args.req.body.location.enabled) != 'undefined') {
							update.$set['location.enabled'] = args.req.body.location.enabled;
						};
						if (typeof (args.req.body.location.latitude) != 'undefined') {
							update.$set['location.latitude'] = args.req.body.location.latitude;
						};
						if (typeof (args.req.body.location.longitude) != 'undefined') {
							update.$set['location.longitude'] = args.req.body.location.longitude;
						};
					};
					if (typeof (args.req.body.promotion) != 'undefined') {
						if (typeof (args.req.body.promotion.price) != 'undefined') {
							update.$set['promotion.price'] = args.req.body.promotion.price;
						};
						if (typeof (args.req.body.promotion.enabled) != 'undefined') {
							update.$set['promotion.enabled'] = args.req.body.promotion.enabled;
						};
					};
					if (typeof (args.req.body.supplierId) != 'undefined') {
						update.$set.supplierId = ObjectId(args.req.body.supplierId);
					};
					if (typeof (args.req.body.description) != 'undefined') {
						update.$set.description = args.req.body.description;
					};
					if (typeof (args.req.body.departments) != 'undefined') {
						update.$set.departments = args.req.body.departments.map(id => ObjectId(id));
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblProducts'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.productId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblProducts'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		purchase: (args) => {
			var deferred = Q.defer();

			var params = {
				_id: ObjectId(args.productId)
			};
			var update = {
				$inc: {
					quantity: -args.quantity
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalVouchers = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'code': args.req.body.code,
						'file': args.req.body.file,
						'status': 'available',
						'storeId': ObjectId(args.req.body.storeId),
						'productId': ObjectId(args.req.body.productId),
						'serverDate': new Date()
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblVouchers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.voucher = result[0];

					var params = {
						'status': 'available',
						'storeId': ObjectId(args.req.body.storeId),
						'productId': ObjectId(args.req.body.productId)
					};
					var filter = {
						_id: 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblVouchers',
						'allowNoRecordsFound': true
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.productId)
					};
					var update = {
						$set: {
							'quantity': result.length
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(args.voucher));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				$or: [
					{
						'_id': ObjectId(args.req.body.voucherId),
						'email': format.email(args.req.body.header.email),
						'status': 'sold'
					},
					{
						'_id': ObjectId(args.req.body.voucherId),
						'bitid.auth.users.email': format.email(args.req.body.header.email)
					}
				]
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'voucherId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid'
					}
				},
				{
					$match: match
				},
				{
					$lookup: {
						as: 'products',
						from: 'tblProducts',
						localField: 'productId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$products'
				},
				{
					$addFields: {
						description: '$products.title'
					}
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblVouchers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				$or: [
					{
						'email': format.email(args.req.body.header.email),
						'status': 'sold'
					},
					{
						'bitid.auth.users.email': format.email(args.req.body.header.email)
					}
				]
			};

			if (args.req.body.mine) {
				match.$or.splice(1, 1);
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.$or.map(o => {
						o.storeId = {
							$in: args.req.body.storeId.map(id => ObjectId(id))
						};
					})
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.$or.map(o => {
						o.storeId = ObjectId(args.req.body.storeId);
					})
				};
			};

			if (typeof (args.req.body.voucherId) != 'undefined') {
				if (Array.isArray(args.req.body.voucherId)) {
					match.$or.map(o => {
						o._id = {
							$in: args.req.body.voucherId.map(id => ObjectId(id))
						};
					});
				} else if (typeof (args.req.body.voucherId) == 'string') {
					match.$or.map(o => {
						o._id = ObjectId(args.req.body.voucherId);
					})
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'voucherId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid'
					}
				},
				{
					$match: match
				},
				{
					$lookup: {
						as: 'products',
						from: 'tblProducts',
						localField: 'productId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$products'
				},
				{
					$addFields: {
						description: '$products.title'
					}
				},
				{
					$project: filter
				}
			];
			if (Object.keys(filter).length == 0) {
				params.splice(params.length - 1, 1);
			}

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblVouchers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		paid: (args) => {
			var deferred = Q.defer();

			if (args.order.products.map(o => o.type).includes('voucher')) {
				var match = {
					productId: {
						$in: args.order.products.filter(o => o.type == 'voucher').map(o => ObjectId(o.productId))
					},
					status: 'available'
				};

				var params = [
					{
						$match: match
					},
					{
						$group: {
							'_id': '$productId',
							'vouchers': {
								$push: {
									code: '$code',
									file: '$file',
									voucherId: '$_id'
								}
							}
						}
					},
					{
						$project: {
							'_id': 0,
							'vouchers': 1,
							'productId': '$_id'
						}
					}
				];

				db.call({
					'params': params,
					'operation': 'aggregate',
					'collection': 'tblVouchers'
				})
					.then(result => {
						var deferred = Q.defer();

						var items = JSON.parse(JSON.stringify(result));

						var params = {
							'_id': {
								$in: []
							}
						};

						var update = {
							$set: {
								'email': format.email(args.req.body.header.email),
								'status': 'sold'
							}
						}

						args.order.vouchers = [];

						args.order.products.map(product => {
							items.map(item => {
								if (item.productId == product.productId) {
									item.vouchers = item.vouchers.slice(0, product.quantity);
									item.vouchers.map(o => params._id.$in.push(ObjectId(o.voucherId)));
									item.vouchers.map(o => args.order.vouchers.push(o));
								}
							})
						})

						deferred.resolve({
							'params': params,
							'update': update,
							'operation': 'updateMany',
							'collection': 'tblVouchers'
						});

						return deferred.promise;
					}, null)
					.then(db.call, null)
					.then(result => {
						var deferred = Q.defer();

						args.result = JSON.parse(JSON.stringify(result));

						var params = [
							{
								$match: {
									productId: {
										$in: args.order.products.map(o => ObjectId(o.productId))
									}
								}
							},
							{
								$group: {
									_id: '$productId',
									quantity: {
										$push: '$status'
									},
									productId: {
										$first: '$productId'
									}
								}
							},
							{
								$addFields: {
									quantity: {
										$filter: {
											cond: {
												$and: [
													{
														$eq: ['$$status', 'available']
													}
												]
											},
											as: 'status',
											input: '$quantity'
										}
									}
								}
							},
							{
								$addFields: {
									quantity: {
										$size: '$quantity'
									}
								}
							},
							{
								$project: {
									_id: 0,
									quantity: 1,
									productId: 1
								}
							}
						];

						deferred.resolve({
							'params': params,
							'operation': 'aggregate',
							'collection': 'tblVouchers',
							'allowNoRecordsFound': true
						});

						return deferred.promise;
					}, null)
					.then(db.call, null)
					.then(result => result.reduce((promise, o) => promise.then(() => db.call({
						'params': {
							_id: o.productId
						},
						'update': {
							$set: {
								'quantity': o.quantity
							}
						},
						'operation': 'update',
						'collection': 'tblProducts',
						'allowNoRecordsFound': true
					})), Promise.resolve()), null)
					.then(result => {
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});
			} else {
				deferred.resolve(args);
			}

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblVouchers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.voucherId),
						'status': 'available'
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.code) != 'undefined') {
						update.$set.code = args.req.body.code;
					};
					if (typeof (args.req.body.file) != 'undefined') {
						update.$set.file = args.req.body.file;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblVouchers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid',
						'storeId': 1,
						'productId': 1
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						},
						'_id': ObjectId(args.req.body.voucherId)
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblVouchers'
			})
				.then(result => {
					var deferred = Q.defer();

					args.voucher = JSON.parse(JSON.stringify(result[0]));
					args.req.body.storeId = args.voucher.storeId;
					args.req.body.productId = args.voucher.productId;

					var params = {
						'_id': ObjectId(args.req.body.voucherId),
						'status': 'available'
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblVouchers'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.result = result;

					var params = {
						'status': 'available',
						'storeId': ObjectId(args.req.body.storeId),
						'productId': ObjectId(args.req.body.productId)
					};
					var filter = {
						_id: 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblVouchers',
						'allowNoRecordsFound': true
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.productId)
					};
					var update = {
						$set: {
							'quantity': result.length
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		markassold: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid',
						'productId': 1
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						},
						'_id': ObjectId(args.req.body.voucherId)
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblVouchers'
			})
				.then(result => {
					var deferred = Q.defer();

					args.req.body.productId = result[0].productId.toString();

					var params = {
						'_id': ObjectId(args.req.body.voucherId),
						'status': 'available'
					};
					var update = {
						$set: {
							'status': 'sold',
							'serverDate': new Date()
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblVouchers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					args.result = JSON.parse(JSON.stringify(result));

					var params = {
						'status': 'available',
						'productId': ObjectId(args.req.body.productId)
					};
					var filter = {
						_id: 1
					};

					deferred.resolve({
						'params': params,
						'filter': filter,
						'operation': 'find',
						'collection': 'tblVouchers',
						'allowNoRecordsFound': true
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.productId)
					};
					var update = {
						$set: {
							'quantity': result.length
						}
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblProducts'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalCouriers = {
		public: {
			list: (args) => {
				var deferred = Q.defer();

				var params = {
					storeId: ObjectId(args.req.body.storeId)
				};

				var filter = {};
				if (typeof (args.req.body.filter) != 'undefined') {
					filter._id = 0;
					args.req.body.filter.map(f => {
						if (f == 'courierId') {
							filter['_id'] = 1;
						} else {
							filter[f] = 1;
						};
					});
				};

				db.call({
					'params': params,
					'filter': filter,
					'operation': 'aggregate',
					'collection': 'tblCouriers'
				})
					.then(result => {
						args.result = JSON.parse(JSON.stringify(result));
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});

				return deferred.promise;
			}
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					args.req.body.options.map(option => {
						if (option.optionId.length == 24) {
							option.optionId = ObjectId(option.optionId);
						};
					});

					var params = {
						'icon': args.req.body.icon,
						'phone': args.req.body.phone,
						'email': format.email(args.req.body.email),
						'options': args.req.body.options,
						'storeId': ObjectId(args.req.body.storeId),
						'account': args.req.body.account,
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblCouriers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.courierId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'courierId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.courierId) != 'undefined') {
				if (Array.isArray(args.req.body.courierId)) {
					match._id = {
						$in: args.req.body.courierId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.courierId) == 'string') {
					match._id = ObjectId(args.req.body.courierId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'courierId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCouriers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.courierId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.icon) != 'undefined') {
						update.$set.icon = args.req.body.icon;
					};
					if (typeof (args.req.body.phone) != 'undefined') {
						update.$set.phone = args.req.body.phone;
					};
					if (typeof (format.email(args.req.body.email)) != 'undefined') {
						update.$set.email = format.email(args.req.body.email);
					};
					if (Array.isArray(args.req.body.options)) {
						args.req.body.options.map(option => {
							if (option.optionId.length == 24) {
								option.optionId = ObjectId(option.optionId);
							};
						});
						update.$set.options = args.req.body.options;
					};
					if (typeof (args.req.body.account) != 'undefined') {
						update.$set.account = args.req.body.account;
					};
					if (typeof (args.req.body.description) != 'undefined') {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblCouriers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCouriers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.courierId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblCouriers'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalCustomers = {
		iam: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'status': 'accepted',
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblCustomers',
				'allowNoRecordsFound': true
			})
				.then(result => {
					args.result = false;
					if (result.length >= 1) {
						args.result = true;
					};
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'email': format.email(args.req.body.email),
						'status': 'accepted',
						'storeId': ObjectId(args.req.body.storeId),
						'serverDate': new Date()
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblCustomers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.customerId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'customerId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCustomers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.customerId) != 'undefined') {
				if (Array.isArray(args.req.body.customerId)) {
					match._id = {
						$in: args.req.body.customerId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.customerId) == 'string') {
					match._id = ObjectId(args.req.body.customerId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'customerId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCustomers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCustomers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.customerId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (format.email(args.req.body.email)) != 'undefined') {
						update.$set.email = format.email(args.req.body.email);
					};
					if (typeof (args.req.body.status) != 'undefined') {
						update.$set.status = args.req.body.status;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblCustomers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCustomers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.customerId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblCustomers'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		requestaccess: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'status': 'requested',
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblCustomers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalSuppliers = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'address': {
							'street': args.req.body.address.street,
							'suburb': args.req.body.address.suburb,
							'country': args.req.body.address.country,
							'cityTown': args.req.body.address.cityTown,
							'postalCode': args.req.body.address.postalCode,
							'additionalInfo': args.req.body.address.additionalInfo
						},
						'phone': args.req.body.phone,
						'email': format.email(args.req.body.email),
						'storeId': ObjectId(args.req.body.storeId),
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblSuppliers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.supplierId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'supplierId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.supplierId) != 'undefined') {
				if (Array.isArray(args.req.body.supplierId)) {
					match._id = {
						$in: args.req.body.supplierId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.supplierId) == 'string') {
					match._id = ObjectId(args.req.body.supplierId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'supplierId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.supplierId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.address) != 'undefined' && args.req.body.address != null && args.req.body.address != '') {
						if (typeof (args.req.body.address.street) != 'undefined' && args.req.body.address.street != null && args.req.body.address.street != '') {
							update.$set['address.street'] = args.req.body.address.street;
						};
						if (typeof (args.req.body.address.suburb) != 'undefined' && args.req.body.address.suburb != null && args.req.body.address.suburb != '') {
							update.$set['address.suburb'] = args.req.body.address.suburb;
						};
						if (typeof (args.req.body.address.cityTown) != 'undefined' && args.req.body.address.cityTown != null && args.req.body.address.cityTown != '') {
							update.$set['address.cityTown'] = args.req.body.address.cityTown;
						};
						if (typeof (args.req.body.address.postalCode) != 'undefined' && args.req.body.address.postalCode != null && args.req.body.address.postalCode != '') {
							update.$set['address.postalCode'] = args.req.body.address.postalCode;
						};
						if (typeof (args.req.body.address.additionalInfo) != 'undefined' && args.req.body.address.additionalInfo != null && args.req.body.address.additionalInfo != '') {
							update.$set['address.additionalInfo'] = args.req.body.address.additionalInfo;
						};
					};
					if (typeof (args.req.body.phone) != 'undefined' && args.req.body.phone != null && args.req.body.phone != '') {
						update.$set.phone = args.req.body.phone;
					};
					if (typeof (format.email(args.req.body.email)) != 'undefined' && format.email(args.req.body.email) != null && format.email(args.req.body.email) != '') {
						update.$set.email = format.email(args.req.body.email);
					};
					if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null && args.req.body.description != '') {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblSuppliers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.supplierId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblSuppliers'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalWishlists = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId),
				'quantity': args.req.body.quantity,
				'productId': ObjectId(args.req.body.productId),
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblWishlists'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.wishlistId) != 'undefined') {
				if (Array.isArray(args.req.body.wishlistId)) {
					params._id = {
						$in: args.req.body.wishlistId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.wishlistId) == 'string') {
					params._id = ObjectId(args.req.body.wishlistId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'wishlistId') {
						filter['_id'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblWishlists'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.wishlistId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.quantity) != 'undefined') {
				update.$set.quantity = args.req.body.quantity;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblWishlists'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.wishlistId),
				'email': format.email(args.req.body.header.email),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblWishlists'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalDepartments = {
		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'storeId': ObjectId(args.req.body.storeId),
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblDepartments'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.departmentId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'departmentId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.departmentId) != 'undefined') {
				if (Array.isArray(args.req.body.departmentId)) {
					match._id = {
						$in: args.req.body.departmentId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.departmentId) == 'string') {
					match._id = ObjectId(args.req.body.departmentId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'departmentId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblDepartments'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.departmentId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.description) != 'undefined') {
						update.$set.description = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblDepartments'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblDepartments'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.departmentId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblDepartments'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalTransactions = {
		order: (args) => {
			var deferred = Q.defer();

			dalTransactions.dbArgs = {
				'type': 'insert',
				'query': 'INSERT into tblTransactions SET ?',
				'params': {
					'_id': args.order.orderId,
					'type': 'order',
					'debit': args.req.body.amount.gross,
					'email': format.email(args.req.body.header.email),
					'credit': args.req.body.amount.gross,
					'storeId': args.order.storeId,
					'serverDate': new Date(),
					'description': 'Order Paid: ' + args.order.orderId
				}
			};

			var myDB = new dbMySQL.module();
			myDB.connect(dalTransactions.dbArgs)
				.then(myDB.beginTransaction, null)
				.then(myDB.dbCall, null)
				.then(myDB.commitTransaction, null)
				.then(result => {
					args.result = result;
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	var dalCollectionPoints = {
		public: {
			list: (args) => {
				var deferred = Q.defer();

				var params = {
					storeId: ObjectId(args.req.body.storeId)
				};

				var filter = {};
				if (typeof (args.req.body.filter) != 'undefined') {
					filter._id = 0;
					args.req.body.filter.map(f => {
						if (f == 'collectionpointId') {
							filter['_id'] = 1;
						} else if (f == 'role') {
							filter['bitid.auth.users'] = 1;
						} else {
							filter[f] = 1;
						};
					});
				};

				db.call({
					'params': params,
					'filter': filter,
					'operation': 'find',
					'collection': 'tblCollectionPoints'
				})
					.then(result => {
						args.result = JSON.parse(JSON.stringify(result));
						deferred.resolve(args);
					}, error => {
						var err = new ErrorResponse();
						err.error.errors[0].code = error.code;
						err.error.errors[0].reason = error.message;
						err.error.errors[0].message = error.message;
						deferred.reject(err);
					});

				return deferred.promise;
			}
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': {
							$gte: 2
						},
						'email': format.email(args.req.body.header.email)
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};

			var filter = {
				'_id': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblStores'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'address': {
							'street': args.req.body.address.street,
							'suburb': args.req.body.address.suburb,
							'country': args.req.body.address.country,
							'cityTown': args.req.body.address.cityTown,
							'postalCode': args.req.body.address.postalCode,
							'additionalInfo': args.req.body.address.additionalInfo
						},
						'storeId': ObjectId(args.req.body.storeId),
						'serverDate': new Date(),
						'description': args.req.body.description
					};

					deferred.resolve({
						'params': params,
						'operation': 'insert',
						'collection': 'tblCollectionPoints'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var match = {
				'_id': ObjectId(args.req.body.collectionpointId),
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'collectionpointId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var match = {
				'bitid.auth.users.email': format.email(args.req.body.header.email)
			};

			if (typeof (args.req.body.storeId) != 'undefined') {
				if (Array.isArray(args.req.body.storeId) && args.req.body.storeId.length > 0) {
					match.storeId = {
						$in: args.req.body.storeId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.storeId) == 'string' && args.req.body.storeId.length == 24) {
					match.storeId = ObjectId(args.req.body.storeId);
				};
			};

			if (typeof (args.req.body.collectionpointId) != 'undefined') {
				if (Array.isArray(args.req.body.collectionpointId) && args.req.body.collectionpointId.length > 0) {
					match._id = {
						$in: args.req.body.collectionpointId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.collectionpointId) == 'string' && args.req.body.collectionpointId.length == 24) {
					match._id = ObjectId(args.req.body.collectionpointId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'collectionpointId') {
						filter['_id'] = 1;
					} else if (f == 'role') {
						filter['bitid.auth.users'] = 1;
					} else {
						filter[f] = 1;
					};
				});
			};

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$addFields: {
						bitid: '$stores.bitid',
					}
				},
				{
					$match: match
				},
				{
					$project: filter
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.collectionpointId)
					};
					var update = {
						$set: {
							'serverDate': new Date()
						}
					};
					if (typeof (args.req.body.address) != 'undefined' && args.req.body.address != null && args.req.body.address != '') {
						if (typeof (args.req.body.address.street) != 'undefined' && args.req.body.address.street != null && args.req.body.address.street != '') {
							update.$set['address.street'] = args.req.body.address.street;
						};
						if (typeof (args.req.body.address.suburb) != 'undefined' && args.req.body.address.suburb != null && args.req.body.address.suburb != '') {
							update.$set['address.suburb'] = args.req.body.address.suburb;
						};
						if (typeof (args.req.body.address.country) != 'undefined' && args.req.body.address.country != null && args.req.body.address.country != '') {
							update.$set['address.country'] = args.req.body.address.country;
						};
						if (typeof (args.req.body.address.cityTown) != 'undefined' && args.req.body.address.cityTown != null && args.req.body.address.cityTown != '') {
							update.$set['address.cityTown'] = args.req.body.address.cityTown;
						};
						if (typeof (args.req.body.address.postalCode) != 'undefined' && args.req.body.address.postalCode != null && args.req.body.address.postalCode != '') {
							update.$set['address.postalCode'] = args.req.body.address.postalCode;
						};
						if (typeof (args.req.body.address.additionalInfo) != 'undefined' && args.req.body.address.additionalInfo != null && args.req.body.address.additionalInfo != '') {
							update.$set['address.additionalInfo'] = args.req.body.address.additionalInfo;
						};
					};
					if (typeof (args.req.body.description) != 'undefined') {
						update.$set['description'] = args.req.body.description;
					};

					deferred.resolve({
						'params': params,
						'update': update,
						'operation': 'update',
						'collection': 'tblCollectionPoints'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$lookup: {
						as: 'stores',
						from: 'tblStores',
						localField: 'storeId',
						foreignField: '_id'
					}
				},
				{
					$unwind: '$stores'
				},
				{
					$project: {
						'bitid': '$stores.bitid'
					}
				},
				{
					$match: {
						'bitid.auth.users': {
							$elemMatch: {
								'role': {
									$gte: 2
								},
								'email': format.email(args.req.body.header.email)
							}
						}
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'_id': ObjectId(args.req.body.collectionpointId)
					};

					deferred.resolve({
						'params': params,
						'operation': 'remove',
						'collection': 'tblCollectionPoints'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, error => {
					var err = new ErrorResponse();
					err.error.errors[0].code = error.code;
					err.error.errors[0].reason = error.message;
					err.error.errors[0].message = error.message;
					deferred.reject(err);
				});

			return deferred.promise;
		}
	};

	return {
		'carts': dalCarts,
		'orders': dalOrders,
		'stores': dalStores,
		'reviews': dalReviews,
		'reports': dalReports,
		'products': dalProducts,
		'vouchers': dalVouchers,
		'couriers': dalCouriers,
		'customers': dalCustomers,
		'suppliers': dalSuppliers,
		'wishlists': dalWishlists,
		'departments': dalDepartments,
		'transactions': dalTransactions,
		'collectionpoints': dalCollectionPoints
	};
};

exports.module = module;