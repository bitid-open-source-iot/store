var Q = require('q');
var db = require('./../db/mongo');
var dbMySQL = require('./../db/mysql');
var ObjectId = require('mongodb').ObjectId;

var module = function () {
	var dalApis = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal API Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalApis',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'url': args.req.body.url,
				'body': args.req.body.body || {},
				'method': args.req.body.method,
				'headers': args.req.body.headers || {},
				'trigger': args.req.body.trigger,
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Add API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'apiId') {
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
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Get API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.apiId) != 'undefined') {
				if (Array.isArray(args.req.body.apiId)) {
					params._id = {
						$in: args.req.body.apiId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.apiId) == 'string') {
					params._id = ObjectId(args.req.body.apiId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'apiId') {
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
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'List APIs Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Share API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.url) != 'undefined') {
				update.$set.url = args.req.body.url;
			};
			if (typeof (args.req.body.body) != 'undefined') {
				update.$set.body = args.req.body.body;
			};
			if (typeof (args.req.body.method) != 'undefined') {
				update.$set.method = args.req.body.method;
			};
			if (typeof (args.req.body.headers) != 'undefined') {
				update.$set.headers = args.req.body.headers;
			};
			if (typeof (args.req.body.trigger) != 'undefined') {
				update.$set.trigger = args.req.body.trigger;
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Update API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Remove API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblApis'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From API Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.apiId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblApis'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.apiId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblApis'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalApis.errorResponse.error.errors[0].code = err.code || dalApis.errorResponse.error.errors[0].code;
					dalApis.errorResponse.error.errors[0].reason = err.description || 'Update API Subscriber Error';
					dalApis.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalApis.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalCarts = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Carts Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalCarts',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
				}, err => {
					dalCarts.errorResponse.error.errors[0].code = err.code || dalCarts.errorResponse.error.errors[0].code;
					dalCarts.errorResponse.error.errors[0].reason = err.description || 'Add Cart Error';
					dalCarts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCarts.errorResponse);
				});

			return deferred.promise;
		},

		sync: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblCarts'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = args.req.body.products.map(o => {
						return {
							'email': args.req.body.header.email,
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
				}, err => {
					dalCarts.errorResponse.error.errors[0].code = err.code || dalCarts.errorResponse.error.errors[0].code;
					dalCarts.errorResponse.error.errors[0].reason = err.description || 'Sync Cart Error';
					dalCarts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCarts.errorResponse);
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
						'email': args.req.body.header.email,
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
				}, err => {
					dalCarts.errorResponse.error.errors[0].code = err.code || dalCarts.errorResponse.error.errors[0].code;
					dalCarts.errorResponse.error.errors[0].reason = err.description || 'List Carts Error';
					dalCarts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCarts.errorResponse);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.cartId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalCarts.errorResponse.error.errors[0].code = err.code || dalCarts.errorResponse.error.errors[0].code;
					dalCarts.errorResponse.error.errors[0].reason = err.description || 'Update Carts Error';
					dalCarts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCarts.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': null,
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (Array.isArray(args.req.body.cartId)) {
				params._id = {
					$in: args.req.body.cartId.map(id => ObjectId(id))
				};
			} else if (typeof (args.req.body.cartId) == "string") {
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
				}, err => {
					dalCarts.errorResponse.error.errors[0].code = err.code || dalCarts.errorResponse.error.errors[0].code;
					dalCarts.errorResponse.error.errors[0].reason = err.description || 'Remove Carts Error';
					dalCarts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCarts.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalOrders = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Orders Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalOrders',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId),
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.status) != "undefined") {
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
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Get Order Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'List Orders Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		paid: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.order.orderId),
				'email': args.order.email,
				'status': 'initialized',
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'status': 'paid',
					'date.paid': new Date(),
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
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Update Order Paid Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Update Order Address Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		getStoreId: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.orderId)
			};

			var filter = {
				'_id': 0,
				'storeId': 1
			};

			db.call({
				'params': params,
				'filter': filter,
				'operation': 'find',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.req.body.storeId = result[0].storeId.toString();
					deferred.resolve(args);
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Get Order Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		initialize: (args) => {
			var deferred = Q.defer();

			args.req.body.products.map(product => {
				product.productId = ObjectId(product.productId);
			});

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
					'method': null,
					'address': {},
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
					'email': args.req.body.header.email,
					'number': null
				},
				'email': args.req.body.header.email,
				'status': 'initialized',
				'storeId': ObjectId(args.req.body.storeId),
				'products': args.req.body.products,
				'serverDate': new Date()
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblOrders'
			})
				.then(result => {
					args.orderId = result[0]._id.toString();
					deferred.resolve(args);
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Initialize Order Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		getSuppliersProducts: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {
						'_id': {
							$in: args.order.products.map(product => ObjectId(product.productId))
						},
						'storeId': ObjectId(args.order.storeId)
					}
				},
				{
					$lookup: {
						'as': 'supplier',
						'from': 'tblSuppliers',
						'localField': 'supplierId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$supplier'
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
					$project: {
						'supplier': {
							'email': '$supplier.email',
							'phone': '$supplier.phone',
							'address': '$supplier.address',
							'supplierId': '$supplier._id',
							'description': '$supplier.description'
						},
						'cost': 1,
						'title': 1,
						'image': '$images.src',
						'storeId': 1,
						'productId': '$_id'
					}
				}, {
					$group: {
						'_id': '$supplier.supplierId',
						'email': {
							$first: '$supplier.email'
						},
						'phone': {
							$first: '$supplier.phone'
						},
						'address': {
							$first: '$supplier.address'
						},
						'description': {
							$first: '$supplier.description'
						},
						'products': {
							$push: {
								'cost': '$cost',
								'title': '$title',
								'image': '$image',
								'storeId': '$storeId',
								'productId': '$productId'
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
					args.suppliers = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Get Products With Supplier Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		},

		getProductsWithSupplier: (args) => {
			var deferred = Q.defer();

			var params = [
				{
					$match: {
						'_id': {
							$in: args.order.products.map(product => ObjectId(product.productId))
						},
						'storeId': ObjectId(args.order.storeId)
					}
				},
				{
					$lookup: {
						'as': 'supplier',
						'from': 'tblSuppliers',
						'localField': 'supplierId',
						'foreignField': '_id'
					}
				},
				{
					$unwind: '$supplier'
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
					$project: {
						'supplier': {
							'email': '$supplier.email',
							'phone': '$supplier.phone',
							'address': '$supplier.address',
							'supplierId': '$supplier._id',
							'description': '$supplier.description'
						},
						'cost': 1,
						'title': 1,
						'image': '$images.src',
						'storeId': 1,
						'productId': '$_id'
					}
				}
			];

			db.call({
				'params': params,
				'operation': 'aggregate',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.products = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalOrders.errorResponse.error.errors[0].code = err.code || dalOrders.errorResponse.error.errors[0].code;
					dalOrders.errorResponse.error.errors[0].reason = err.description || 'Get Products With Supplier Error';
					dalOrders.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalOrders.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalStores = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Config Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalStores',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

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
					'cityTown': args.req.body.address.cityTown || '',
					'postalCode': args.req.body.address.postalCode || ''
				},
				'dns': args.req.body.dns || [],
				'logo': args.req.body.logo,
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Add Store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.storeId),
				'bitid.auth.users.email': args.req.body.header.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Get store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users.email': args.req.body.header.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Get store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Share store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.payfast) != 'undefined' && typeof (args.req.body.payfast) == 'object') {
				if (typeof (args.req.body.payfast.merchantId) != 'undefined') {
					update.$set['payfast.merchantId'] = args.req.body.payfast.merchantId;
				};
				if (typeof (args.req.body.payfast.merchantKey) != 'undefined') {
					update.$set['payfast.merchantKey'] = args.req.body.payfast.merchantKey;
				};
			};
			if (typeof (args.req.body.contact) != 'undefined' && typeof (args.req.body.contact) == 'object') {
				if (typeof (args.req.body.contact.email) != 'undefined') {
					update.$set['contact.email'] = args.req.body.contact.email;
				};
				if (typeof (args.req.body.contact.number) != 'undefined') {
					update.$set['contact.number'] = args.req.body.contact.number;
				};
				if (typeof (args.req.body.contact.website) != 'undefined') {
					update.$set['contact.website'] = args.req.body.contact.website;
				};
			};
			if (typeof (args.req.body.address) != 'undefined' && typeof (args.req.body.address) == 'object') {
				if (typeof (args.req.body.address.vat) != 'undefined') {
					update.$set['address.vat'] = args.req.body.address.vat;
				};
				if (typeof (args.req.body.address.reg) != 'undefined') {
					update.$set['address.reg'] = args.req.body.address.reg;
				};
				if (typeof (args.req.body.address.street) != 'undefined') {
					update.$set['address.street'] = args.req.body.address.street;
				};
				if (typeof (args.req.body.address.suburb) != 'undefined') {
					update.$set['address.suburb'] = args.req.body.address.suburb;
				};
				if (typeof (args.req.body.address.cityTown) != 'undefined') {
					update.$set['address.cityTown'] = args.req.body.address.cityTown;
				};
				if (typeof (args.req.body.address.postalCode) != 'undefined') {
					update.$set['address.postalCode'] = args.req.body.address.postalCode;
				};
			};
			if (typeof (args.req.body.dns) != 'undefined' && Array.isArray(args.req.body.dns)) {
				update.$set.dns = args.req.body.dns;
			};
			if (typeof (args.req.body.logo) != 'undefined') {
				update.$set.logo = args.req.body.logo;
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Update Store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Remove Store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
				});

			return deferred.promise;
		},

		validate: (args) => {
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
				dalStores.errorResponse.error.errors[0].code = 503;
				dalStores.errorResponse.error.errors[0].reason = 'Cant validate store!';
				deferred.reject(dalStores.errorResponse);
			} else {
				var filter = {
					'_id': 1,
					'dns': 1,
					'logo': 1,
					'address': 1,
					'payfast': 1,
					'contact': 1,
					'payments': 1,
					'description': 1
				};

				db.call({
					'params': params,
					'filter': filter,
					'operation': 'find',
					'collection': 'tblStores'
				})
					.then(result => {
						args.store = result[0];
						if (typeof (args.req.body.storeId) == 'undefined' || args.req.body.storeId == null || args.req.body.storeId == '') {
							args.req.body.storeId = args.store._id.toString();
						};
						deferred.resolve(args);
					}, err => {
						dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
						dalStores.errorResponse.error.errors[0].reason = err.description || 'Validate Store Error';
						dalStores.errorResponse.hiddenErrors.push(err.error);
						deferred.reject(dalStores.errorResponse);
					});
			};

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
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
						'email': args.req.body.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From store Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
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
						'email': args.req.body.header.email
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
								'email': args.req.body.email
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
				}, err => {
					dalStores.errorResponse.error.errors[0].code = err.code || dalStores.errorResponse.error.errors[0].code;
					dalStores.errorResponse.error.errors[0].reason = err.description || 'Update Store Subscriber Error';
					dalStores.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalStores.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalReviews = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Ratings Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalReviews',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Add Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Get Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.status) != 'undefined') {
				params.status = args.req.body.status;
			};

			if (typeof (args.req.body.reviewId) != 'undefined') {
				if (Array.isArray(args.req.body.reviewId)) {
					params._id = {
						$in: args.req.body.reviewId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.reviewId) == 'string') {
					params._id = ObjectId(args.req.body.reviewId);
				};
			};

			if (typeof (args.req.body.productId) != 'undefined') {
				if (Array.isArray(args.req.body.productId)) {
					params.productId = {
						$in: args.req.body.productId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.productId) == 'string') {
					params.productId = ObjectId(args.req.body.productId);
				};
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'List Ratings Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Update Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.reviewId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Remove Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		reject: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.storeId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblStores'
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Approve Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		},

		approve: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.storeId),
				'bitid.auth.users.email': args.req.body.header.email
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblStores'
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
								"status": "approved",
								"productId": result[0].productId
							}
						},
						{
							$group: {
								"_id": "$productId",
								"max": {
									$sum: "$score"
								},
								"count": {
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
						"_id": ObjectId(result[0]._id)
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
				}, err => {
					dalReviews.errorResponse.error.errors[0].code = err.code || dalReviews.errorResponse.error.errors[0].code;
					dalReviews.errorResponse.error.errors[0].reason = err.description || 'Approve Rating Error';
					dalReviews.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalReviews.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalProducts = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Products Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalProducts',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'cost': args.req.body.cost || 0,
				'type': args.req.body.type,
				'info': args.req.body.info || [],
				'links': args.req.body.links || [],
				'score': 0,
				'title': args.req.body.title,
				'price': args.req.body.price,
				'images': args.req.body.images || [],
				'reviews': 0,
				'storeId': ObjectId(args.req.body.storeId),
				'visible': args.req.body.visible,
				'returned': 0,
				'purchased': 0,
				'promotion': args.req.body.promotion || { 'price': 0, 'enabled': false },
				'supplierId': ObjectId(args.req.body.supplierId),
				'serverDate': new Date(),
				'departments': args.req.body.departments || [],
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Add Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'productId') {
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
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Get Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.visible) != 'undefined') {
				params.visible = args.req.body.visible;
			};

			if (typeof (args.req.body.productId) != 'undefined') {
				if (Array.isArray(args.req.body.productId)) {
					params._id = {
						$in: args.req.body.productId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.productId) == 'string') {
					params._id = ObjectId(args.req.body.productId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'productId') {
						filter['_id'] = 1;
					} else if (f == 'image') {
						filter['images'] = {
							$elemMatch: {
								'main': true
							}
						};
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
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = result.map(item => {
						if (Array.isArray(item.images)) {
							if (item.images.length > 0) {
								item.image = item.images[0].src;
								delete item.images;
							};
						};
						return item;
					});
					deferred.resolve(args);
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'List Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
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
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Share Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.cost) != 'undefined') {
				update.$set.cost = args.req.body.cost;
			};
			if (typeof (args.req.body.info) != 'undefined') {
				update.$set.info = args.req.body.info;
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
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
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
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Update Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblProducts'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Remove Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
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
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Product Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.productId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblProducts'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.productId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblProducts'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalProducts.errorResponse.error.errors[0].code = err.code || dalProducts.errorResponse.error.errors[0].code;
					dalProducts.errorResponse.error.errors[0].reason = err.description || 'Update Product Subscriber Error';
					dalProducts.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalProducts.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalWarnings = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Warning Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalWarnings',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Add Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'warningId') {
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
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Get Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.warningId) != 'undefined') {
				if (Array.isArray(args.req.body.warningId)) {
					params._id = {
						$in: args.req.body.warningId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.warningId) == 'string') {
					params._id = ObjectId(args.req.body.warningId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'warningId') {
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
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'List Warnings Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Share Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)

			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Update Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Remove Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblWarnings'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Warning Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.warningId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblWarnings'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.warningId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblWarnings'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalWarnings.errorResponse.error.errors[0].code = err.code || dalWarnings.errorResponse.error.errors[0].code;
					dalWarnings.errorResponse.error.errors[0].reason = err.description || 'Update Warning Subscriber Error';
					dalWarnings.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWarnings.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalCouriers = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Courier Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalCouriers',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			args.req.body.options.map(option => {
				if (option.optionId.length == 24) {
					option.optionId = ObjectId(option.optionId);
				};
			});

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'icon': args.req.body.icon,
				'phone': args.req.body.phone,
				'email': args.req.body.email,
				'options': args.req.body.options,
				'storeId': ObjectId(args.req.body.storeId),
				'account': args.req.body.account,
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Add Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.enabled) != 'undefined') {
				params.enabled = args.req.body.enabled;
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'courierId') {
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
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Get Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.courierId) != 'undefined') {
				if (Array.isArray(args.req.body.courierId)) {
					params._id = {
						$in: args.req.body.courierId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.courierId) == 'string') {
					params._id = ObjectId(args.req.body.courierId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'courierId') {
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
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'List Couriers Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Share Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
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
			if (typeof (args.req.body.email) != 'undefined') {
				update.$set.email = args.req.body.email;
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
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Update Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Remove Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCouriers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Courier Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.courierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblCouriers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.courierId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblCouriers'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCouriers.errorResponse.error.errors[0].code = err.code || dalCouriers.errorResponse.error.errors[0].code;
					dalCouriers.errorResponse.error.errors[0].reason = err.description || 'Update Courier Subscriber Error';
					dalCouriers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCouriers.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalSuppliers = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Supplier Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalSuppliers',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'address': {
					'street': null,
					'suburb': null,
					'cityTown': null,
					'postalCode': null,
					'additionalInfo': null
				},
				'phone': args.req.body.phone,
				'email': args.req.body.email,
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			if (typeof (args.req.body.address) != 'undefined' && args.req.body.address != null && args.req.body.address != '') {
				if (typeof (args.req.body.address.street) != 'undefined' && args.req.body.address.street != null && args.req.body.address.street != '') {
					params.address.street = args.req.body.address.street;
				};
				if (typeof (args.req.body.address.suburb) != 'undefined' && args.req.body.address.suburb != null && args.req.body.address.suburb != '') {
					params.address.suburb = args.req.body.address.suburb;
				};
				if (typeof (args.req.body.address.cityTown) != 'undefined' && args.req.body.address.cityTown != null && args.req.body.address.cityTown != '') {
					params.address.cityTown = args.req.body.address.cityTown;
				};
				if (typeof (args.req.body.address.postalCode) != 'undefined' && args.req.body.address.postalCode != null && args.req.body.address.postalCode != '') {
					params.address.postalCode = args.req.body.address.postalCode;
				};
				if (typeof (args.req.body.address.additionalInfo) != 'undefined' && args.req.body.address.additionalInfo != null && args.req.body.address.additionalInfo != '') {
					params.address.additionalInfo = args.req.body.address.additionalInfo;
				};
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Add Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				var filter = {
					'_id': 0
				};
				args.req.body.filter.map(f => {
					if (f == 'supplierId') {
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
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Get Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.supplierId) != 'undefined') {
				if (Array.isArray(args.req.body.supplierId)) {
					params._id = {
						$in: args.req.body.supplierId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.supplierId) == 'string') {
					params._id = ObjectId(args.req.body.supplierId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				var filter = {
					'_id': 0
				};
				args.req.body.filter.map(f => {
					if (f == 'supplierId') {
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
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'List Suppliers Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Share Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
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
			if (typeof (args.req.body.email) != 'undefined' && args.req.body.email != null && args.req.body.email != '') {
				update.$set.email = args.req.body.email;
			};
			if (typeof (args.req.body.description) != 'undefined' && args.req.body.description != null && args.req.body.description != '') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined' && args.req.body.organizationOnly != null && args.req.body.organizationOnly != '') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Update Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Remove Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Supplier Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.supplierId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblSuppliers'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.supplierId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblSuppliers'
					})

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalSuppliers.errorResponse.error.errors[0].code = err.code || dalSuppliers.errorResponse.error.errors[0].code;
					dalSuppliers.errorResponse.error.errors[0].reason = err.description || 'Update Supplier Subscriber Error';
					dalSuppliers.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalSuppliers.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalWishlists = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Wishlists Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalWishlists',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
				}, err => {
					dalWishlists.errorResponse.error.errors[0].code = err.code || dalWishlists.errorResponse.error.errors[0].code;
					dalWishlists.errorResponse.error.errors[0].reason = err.description || 'Add Wishlist Error';
					dalWishlists.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWishlists.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
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
				}, err => {
					dalWishlists.errorResponse.error.errors[0].code = err.code || dalWishlists.errorResponse.error.errors[0].code;
					dalWishlists.errorResponse.error.errors[0].reason = err.description || 'List Wishlists Error';
					dalWishlists.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWishlists.errorResponse);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.wishlistId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalWishlists.errorResponse.error.errors[0].code = err.code || dalWishlists.errorResponse.error.errors[0].code;
					dalWishlists.errorResponse.error.errors[0].reason = err.description || 'Update Wishlist Error';
					dalWishlists.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWishlists.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.wishlistId),
				'email': args.req.body.header.email,
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
				}, err => {
					dalWishlists.errorResponse.error.errors[0].code = err.code || dalWishlists.errorResponse.error.errors[0].code;
					dalWishlists.errorResponse.error.errors[0].reason = err.description || 'Remove Wishlist Error';
					dalWishlists.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalWishlists.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalAddresses = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Address Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalAddresses',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'vat': args.req.body.vat || '',
				'type': args.req.body.type,
				'email': args.req.body.header.email,
				'street': args.req.body.street,
				'suburb': args.req.body.suburb,
				'number': args.req.body.number,
				'storeId': ObjectId(args.req.body.storeId),
				'business': args.req.body.business || '',
				'cityTown': args.req.body.cityTown,
				'recipient': args.req.body.recipient,
				'serverDate': new Date(),
				'postalCode': args.req.body.postalCode,
				'additionalInfo': args.req.body.additionalInfo || ''
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblAddresses'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalAddresses.errorResponse.error.errors[0].code = err.code || dalAddresses.errorResponse.error.errors[0].code;
					dalAddresses.errorResponse.error.errors[0].reason = err.description || 'Add Address Error';
					dalAddresses.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalAddresses.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.addressId),
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'addressId') {
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
				'collection': 'tblAddresses'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalAddresses.errorResponse.error.errors[0].code = err.code || dalAddresses.errorResponse.error.errors[0].code;
					dalAddresses.errorResponse.error.errors[0].reason = err.description || 'Get Address Error';
					dalAddresses.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalAddresses.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.addressId) != 'undefined') {
				if (Array.isArray(args.req.body.addressId)) {
					params._id = {
						$in: args.req.body.addressId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.addressId) == 'string') {
					params._id = ObjectId(args.req.body.addressId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'addressId') {
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
				'collection': 'tblAddresses'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalAddresses.errorResponse.error.errors[0].code = err.code || dalAddresses.errorResponse.error.errors[0].code;
					dalAddresses.errorResponse.error.errors[0].reason = err.description || 'List Addresses Error';
					dalAddresses.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalAddresses.errorResponse);
				});

			return deferred.promise;
		},

		update: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.addressId),
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.vat) != 'undefined') {
				update.$set.vat = args.req.body.vat;
			};
			if (typeof (args.req.body.type) != 'undefined') {
				update.$set.type = args.req.body.type;
			};
			if (typeof (args.req.body.street) != 'undefined') {
				update.$set.street = args.req.body.street;
			};
			if (typeof (args.req.body.suburb) != 'undefined') {
				update.$set.suburb = args.req.body.suburb;
			};
			if (typeof (args.req.body.number) != 'undefined') {
				update.$set.number = args.req.body.number;
			};
			if (typeof (args.req.body.business) != 'undefined') {
				update.$set.business = args.req.body.business;
			};
			if (typeof (args.req.body.cityTown) != 'undefined') {
				update.$set.cityTown = args.req.body.cityTown;
			};
			if (typeof (args.req.body.recipient) != 'undefined') {
				update.$set.recipient = args.req.body.recipient;
			};
			if (typeof (args.req.body.postalCode) != 'undefined') {
				update.$set.postalCode = args.req.body.postalCode;
			};
			if (typeof (args.req.body.additionalInfo) != 'undefined') {
				update.$set.additionalInfo = args.req.body.additionalInfo;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblAddresses'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalAddresses.errorResponse.error.errors[0].code = err.code || dalAddresses.errorResponse.error.errors[0].code;
					dalAddresses.errorResponse.error.errors[0].reason = err.description || 'Update Address Error';
					dalAddresses.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalAddresses.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.addressId),
				'email': args.req.body.header.email,
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblAddresses'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalAddresses.errorResponse.error.errors[0].code = err.code || dalAddresses.errorResponse.error.errors[0].code;
					dalAddresses.errorResponse.error.errors[0].reason = err.description || 'Remove Address Error';
					dalAddresses.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalAddresses.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalDepartments = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Department Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalDepartments',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Add Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.departmentId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'departmentId') {
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
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Get Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.departmentId) != 'undefined') {
				if (Array.isArray(args.req.body.departmentId)) {
					params._id = {
						$in: args.req.body.departmentId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.departmentId) == 'string') {
					params._id = ObjectId(args.req.body.departmentId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'departmentId') {
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
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'List Departments Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.departmentId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Share Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.departmentId)
			};
			var update = {
				$set: {
					'storeId': ObjectId(args.req.body.storeId),
					'serverDate': new Date()
				}
			};
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set.description = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Update Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.departmentId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Remove Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.departmentId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblDepartments'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Department Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.departmentId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblDepartments'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.departmentId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblDepartments'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalDepartments.errorResponse.error.errors[0].code = err.code || dalDepartments.errorResponse.error.errors[0].code;
					dalDepartments.errorResponse.error.errors[0].reason = err.description || 'Update Department Subscriber Error';
					dalDepartments.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalDepartments.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalTransactions = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Transactions Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalTransactions',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		order: (args) => {
			var deferred = Q.defer();

			dalTransactions.dbArgs = {
				'type': 'insert',
				'query': 'INSERT into tblTransactions SET ?',
				'params': {
					'_id': args.req.body.orderId,
					'type': 'order',
					'debit': args.req.body.amount.gross,
					'email': args.req.body.header.email,
					'credit': args.req.body.amount.gross,
					'storeId': args.req.body.storeId,
					'serverDate': new Date(),
					'description': 'Order Paid: ' + args.req.body.orderId
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
				}, err => {
					dalTransactions.errorResponse.error.errors[0].code = err.code || dalTransactions.errorResponse.error.errors[0].code;
					dalTransactions.errorResponse.error.errors[0].reason = err.description || 'Pay For Order Transaction Error';
					dalTransactions.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalTransactions.errorResponse);
				});

			return deferred.promise;
		}
	};

	var dalCollectionPoints = {
		errorResponse: {
			'error': {
				'code': 401,
				'message': 'Invalid Credentials',
				'errors': [{
					'reason': 'Dal Collection Point Error',
					'message': 'Invalid Credentials',
					'locaction': 'dalCollectionPoints',
					'locationType': 'header'
				}]
			},
			'hiddenErrors': []
		},

		add: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid': {
					'auth': {
						'users': args.req.body.users,
						'organizationOnly': args.req.body.organizationOnly || 0
					}
				},
				'address': {
					'street': null,
					'suburb': null,
					'cityTown': null,
					'postalCode': null,
					'additionalInfo': null
				},
				'storeId': ObjectId(args.req.body.storeId),
				'serverDate': new Date(),
				'description': args.req.body.description
			};

			if (typeof (args.req.body.address) != 'undefined' && args.req.body.address != null && args.req.body.address != '') {
				if (typeof (args.req.body.address.street) != 'undefined' && args.req.body.address.street != null && args.req.body.address.street != '') {
					params.address.street = args.req.body.address.street;
				};
				if (typeof (args.req.body.address.suburb) != 'undefined' && args.req.body.address.suburb != null && args.req.body.address.suburb != '') {
					params.address.suburb = args.req.body.address.suburb;
				};
				if (typeof (args.req.body.address.cityTown) != 'undefined' && args.req.body.address.cityTown != null && args.req.body.address.cityTown != '') {
					params.address.cityTown = args.req.body.address.cityTown;
				};
				if (typeof (args.req.body.address.postalCode) != 'undefined' && args.req.body.address.postalCode != null && args.req.body.address.postalCode != '') {
					params.address.postalCode = args.req.body.address.postalCode;
				};
				if (typeof (args.req.body.address.additionalInfo) != 'undefined' && args.req.body.address.additionalInfo != null && args.req.body.address.additionalInfo != '') {
					params.address.additionalInfo = args.req.body.address.additionalInfo;
				};
			};

			db.call({
				'params': params,
				'operation': 'insert',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Add Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
				});

			return deferred.promise;
		},

		get: (args) => {
			var deferred = Q.defer();

			var params = {
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'collectionpointId') {
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
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result[0]));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Get Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
				});

			return deferred.promise;
		},

		list: (args) => {
			var deferred = Q.defer();

			var params = {
				'storeId': ObjectId(args.req.body.storeId)
			};

			if (typeof (args.req.body.collectionpointId) != 'undefined') {
				if (Array.isArray(args.req.body.collectionpointId)) {
					params._id = {
						$in: args.req.body.collectionpointId.map(id => ObjectId(id))
					};
				} else if (typeof (args.req.body.collectionpointId) == 'string') {
					params._id = ObjectId(args.req.body.collectionpointId);
				};
			};

			var filter = {};
			if (typeof (args.req.body.filter) != 'undefined') {
				filter._id = 0;
				args.req.body.filter.map(f => {
					if (f == 'collectionpointId') {
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
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'List Collection Points Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'bitid.auth.users.email': {
					$ne: args.req.body.email
				},
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$push: {
					'bitid.auth.users': {
						'role': args.req.body.role,
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Share Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
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
			if (typeof (args.req.body.description) != 'undefined') {
				update.$set['description'] = args.req.body.description;
			};
			if (typeof (args.req.body.organizationOnly) != 'undefined') {
				update.$set['bitid.auth.organizationOnly'] = args.req.body.organizationOnly;
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Update Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
				});

			return deferred.promise;
		},

		delete: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'role': 5,
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'remove',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Remove Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
				});

			return deferred.promise;
		},

		unsubscribe: (args) => {
			var deferred = Q.defer();

			var params = {
				'bitid.auth.users': {
					$elemMatch: {
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
			};
			var update = {
				$set: {
					'serverDate': new Date()
				},
				$pull: {
					'bitid.auth.users': {
						'email': args.req.body.email
					}
				}
			};

			db.call({
				'params': params,
				'update': update,
				'operation': 'update',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Unsubscribe From Collection Point Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
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
						'email': args.req.body.header.email
					}
				},
				'_id': ObjectId(args.req.body.collectionpointId),
				'storeId': ObjectId(args.req.body.storeId)
			};

			db.call({
				'params': params,
				'operation': 'find',
				'collection': 'tblCollectionPoints'
			})
				.then(result => {
					var deferred = Q.defer();

					var params = {
						'bitid.auth.users': {
							$elemMatch: {
								'email': args.req.body.email
							}
						},
						'_id': ObjectId(args.req.body.collectionpointId),
						'storeId': ObjectId(args.req.body.storeId)
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
						'collection': 'tblCollectionPoints'
					});

					return deferred.promise;
				}, null)
				.then(db.call, null)
				.then(result => {
					args.result = JSON.parse(JSON.stringify(result));
					deferred.resolve(args);
				}, err => {
					dalCollectionPoints.errorResponse.error.errors[0].code = err.code || dalCollectionPoints.errorResponse.error.errors[0].code;
					dalCollectionPoints.errorResponse.error.errors[0].reason = err.description || 'Update Collection Point Subscriber Error';
					dalCollectionPoints.errorResponse.hiddenErrors.push(err.error);
					deferred.reject(dalCollectionPoints.errorResponse);
				});

			return deferred.promise;
		}
	};

	return {
		'apis': dalApis,
		'carts': dalCarts,
		'orders': dalOrders,
		'stores': dalStores,
		'reviews': dalReviews,
		'products': dalProducts,
		'warnings': dalWarnings,
		'couriers': dalCouriers,
		'suppliers': dalSuppliers,
		'wishlists': dalWishlists,
		'addresses': dalAddresses,
		'departments': dalDepartments,
		'transactions': dalTransactions,
		'collectionpoints': dalCollectionPoints
	};
};

exports.module = module;