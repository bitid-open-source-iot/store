const Q = require('q');
const ErrorResponse = require('./error-response');

var module = function () {
	var responder = {
		response: {
			update: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'updated': result.n
				});

				return deferred.promise;
			},

			delete: (result) => {
				var deferred = Q.defer();

				deferred.resolve({
					'deleted': result.n
				});

				return deferred.promise;
			},

			carts: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'cartId': result._id
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'type': obj.type,
							'title': obj.title,
							'price': obj.price,
							'email': obj.email,
							'image': obj.image,
							'cartId': obj._id,
							'storeId': obj.storeId,
							'quantity': obj.quantity,
							'promotion': obj.promotion,
							'productId': obj.productId
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				sync: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'cartId': obj._id,
							'storeId': obj.storeId,
							'productId': obj.productId
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			orders: {
				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'date': result.date,
						'email': result.email,
						'status': result.status,
						'orderId': result._id,
						'payment': result.payment,
						'storeId': result.storeId,
						'shipping': result.shipping,
						'products': result.products,
						'recipient': result.recipient,
						'serverDate': result.serverDate
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'date': obj.date,
							'email': obj.email,
							'status': obj.status,
							'orderId': obj._id,
							'payment': obj.payment,
							'storeId': obj.storeId,
							'shipping': obj.shipping,
							'products': obj.products,
							'recipient': obj.recipient,
							'serverDate': obj.serverDate
						};
					})

					deferred.resolve(result);

					return deferred.promise;
				},

				verify: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'date': result.date,
						'email': result.email,
						'status': result.status,
						'orderId': result._id,
						'payment': result.payment,
						'storeId': result.storeId,
						'shipping': result.shipping,
						'products': result.products,
						'recipient': result.recipient,
						'serverDate': result.serverDate
					});

					return deferred.promise;
				},

				process: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'orderId': result.orderId
					});

					return deferred.promise;
				},

				initialize: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'orderId': result.orderId
					});

					return deferred.promise;
				}
			},

			stores: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'storeId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'dns': result.dns,
						'maps': result.maps,
						'role': result.role,
						'logo': result.logo,
						'appId': result.appId,
						'cover': result.cover,
						'contact': result.contact,
						'payfast': result.payfast,
						'address': result.address,
						'storeId': result._id,
						'private': result.private,
						'payments': result.payments,
						'serverDate': result.serverDate,
						'description': result.description
					};

					if (typeof (result.bitid) != 'undefined') {
						if (typeof (result.bitid.auth) != 'undefined') {
							tmp.users = result.bitid.auth.users;
							tmp.organizationOnly = result.bitid.auth.organizationOnly;
						};
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				load: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'logo': result.logo,
						'maps': result.maps,
						'appId': result.appId,
						'cover': result.cover,
						'address': result.address,
						'contact': result.contact,
						'payfast': result.payfast,
						'storeId': result._id,
						'private': result.private,
						'payments': result.payments,
						'description': result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'dns': obj.dns,
							'maps': obj.maps,
							'role': obj.role,
							'logo': obj.logo,
							'appId': obj.appId,
							'cover': obj.cover,
							'contact': obj.contact,
							'payfast': obj.payfast,
							'address': obj.address,
							'storeId': obj._id,
							'private': obj.private,
							'payments': obj.payments,
							'serverDate': obj.serverDate,
							'description': obj.description
						};

						if (typeof (obj.bitid) != 'undefined') {
							if (typeof (obj.bitid.auth) != 'undefined') {
								tmp.users = obj.bitid.auth.users;
								tmp.organizationOnly = obj.bitid.auth.organizationOnly;
							};
						};

						return tmp;
					})

					deferred.resolve(result);

					return deferred.promise;
				},

				validate: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'dns': result.dns,
						'logo': result.logo,
						'address': result.address,
						'contact': result.contact,
						'payfast': result.payfast,
						'storeId': result._id,
						'private': result.private,
						'payments': result.payments,
						'description': result.description
					};

					deferred.resolve(tmp);

					return deferred.promise;
				}
			},

			reports: {
				sales: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'vat': obj.vat,
							'date': obj.date,
							'email': obj.email,
							'total': obj.total,
							'status': obj.status,
							'orderId': obj.orderId,
							'subtotal': obj.subtotal
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			reviews: {
				public: {
					list: (result) => {
						var deferred = Q.defer();

						result = result.map(obj => {
							return {
								'date': obj.serverDate,
								'score': obj.score,
								'message': obj.message
							};
						});

						deferred.resolve(result);

						return deferred.promise;
					}
				},

				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'reviewId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'store': result.store,
						'score': result.score,
						'status': result.status,
						'product': result.product,
						'storeId': result.storeId,
						'message': result.message,
						'reviewId': result._id,
						'productId': result.productId,
						'serverDate': result.serverDate
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'store': obj.store,
							'score': obj.score,
							'status': obj.status,
							'product': obj.product,
							'storeId': obj.storeId,
							'message': obj.message,
							'reviewId': obj._id,
							'productId': obj.productId,
							'serverDate': obj.serverDate
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			products: {
				public: {
					get: (result) => {
						var deferred = Q.defer();

						deferred.resolve({
							'type': result.type,
							'score': result.score,
							'links': result.links,
							'title': result.title,
							'price': result.price,
							'expiry': result.expiry,
							'images': result.images,
							'reviews': result.reviews,
							'quantity': result.quantity,
							'location': result.location,
							'productId': result._id,
							'promotion': result.promotion,
							'description': result.description
						});

						return deferred.promise;
					},

					list: (result) => {
						var deferred = Q.defer();

						result = result.map(obj => {
							var tmp = {
								'type': obj.type,
								'score': obj.score,
								'links': obj.links,
								'title': obj.title,
								'image': obj.image,
								'price': obj.price,
								'expiry': obj.expiry,
								'reviews': obj.reviews,
								'quantity': obj.quantity,
								'location': obj.location,
								'productId': obj._id,
								'promotion': obj.promotion,
								'description': obj.description
							};

							return tmp;
						});

						deferred.resolve(result);

						return deferred.promise;
					}
				},

				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'productId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					var tmp = {
						'role': result.role,
						'type': result.type,
						'score': result.score,
						'links': result.links,
						'title': result.title,
						'price': result.price,
						'expiry': result.expiry,
						'images': result.images,
						'visible': result.visible,
						'storeId': result.storeId,
						'reviews': result.reviews,
						'quantity': result.quantity,
						'location': result.location,
						'productId': result._id,
						'promotion': result.promotion,
						'supplierId': result.supplierId,
						'serverDate': result.serverDate,
						'departments': result.departments,
						'description': result.description
					};

					if (result.role > 0) {
						tmp.cost = result.cost;
					};

					deferred.resolve(tmp);

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						var tmp = {
							'role': obj.role,
							'type': obj.type,
							'score': obj.score,
							'links': obj.links,
							'title': obj.title,
							'image': obj.image,
							'price': obj.price,
							'expiry': obj.expiry,
							'storeId': obj.storeId,
							'visible': obj.visible,
							'reviews': obj.reviews,
							'quantity': obj.quantity,
							'location': obj.location,
							'productId': obj._id,
							'promotion': obj.promotion,
							'supplierId': obj.supplierId,
							'serverDate': obj.serverDate,
							'departments': obj.departments,
							'description': obj.description
						};

						if (obj.role > 0) {
							tmp.cost = obj.cost;
						};

						return tmp;
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			vouchers: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'voucherId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'code': result.code,
						'file': result.file,
						'status': result.status,
						'storeId': result.storeId,
						'productId': result.productId,
						'voucherId': result._id,
						'serverDate': result.serverDate,
						'description': result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'code': obj.code,
							'file': obj.file,
							'status': obj.status,
							'storeId': obj.storeId,
							'productId': obj.productId,
							'voucherId': obj._id,
							'serverDate': obj.serverDate,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			couriers: {
				public: {
					list: (result) => {
						var deferred = Q.defer();
	
						result = result.map(obj => {
							return {
								'options': obj.options,
								'courierId': obj._id,
								'description': obj.description
							};
						});
	
						deferred.resolve(result);
	
						return deferred.promise;
					}
				},

				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'courierId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'icon': result.icon,
						'role': result.role,
						'phone': result.phone,
						'email': result.email,
						'storeId': result.storeId,
						'options': result.options,
						'account': result.account,
						'courierId': result._id,
						'serverDate': result.serverDate,
						'description': result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'icon': obj.icon,
							'role': obj.role,
							'phone': obj.phone,
							'email': obj.email,
							'options': obj.options,
							'storeId': obj.storeId,
							'account': obj.account,
							'courierId': obj._id,
							'serverDate': obj.serverDate,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			customers: {
				iam: (result) => {
					var deferred = Q.defer();

					deferred.resolve(result);

					return deferred.promise;
				},

				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'customerId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'email': result.email,
						'status': result.status,
						'storeId': result.storeId,
						'customerId': result._id,
						'serverDate': result.serverDate
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'email': obj.email,
							'status': obj.status,
							'storeId': obj.storeId,
							'customerId': obj._id,
							'serverDate': obj.serverDate
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				},

				requestaccess: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'customerId': result._id
					});

					return deferred.promise;
				}
			},

			suppliers: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'supplierId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'phone': result.phone,
						'email': result.email,
						'address': result.address,
						'storeId': result.storeId,
						'supplierId': result._id,
						'serverDate': result.serverDate,
						'description': result.description
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'phone': obj.phone,
							'email': obj.email,
							'storeId': obj.storeId,
							'address': obj.address,
							'supplierId': obj._id,
							'serverDate': obj.serverDate,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			wishlists: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'wishlistId': result._id
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'image': obj.image,
							'price': obj.price,
							'title': obj.title,
							'storeId': obj.storeId,
							'quantity': obj.quantity,
							'promotion': obj.promotion,
							'productId': obj.productId,
							'wishlistId': obj._id,
							'serverDate': obj.serverDate,
							'description': obj.description
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			departments: {
				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'departmentId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'storeId': result.storeId,
						'serverDate': result.serverDate,
						'description': result.description,
						'departmentId': result._id
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'storeId': obj.storeId,
							'serverDate': obj.serverDate,
							'description': obj.description,
							'departmentId': obj._id
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			},

			collectionpoints: {
				public: {
					list: (result) => {
						var deferred = Q.defer();
	
						result = result.map(obj => {
							return {
								'address': obj.address,
								'description': obj.description,
								'collectionpointId': obj._id
							};
						});
	
						deferred.resolve(result);
	
						return deferred.promise;
					}
				},

				add: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'collectionpointId': result._id
					});

					return deferred.promise;
				},

				get: (result) => {
					var deferred = Q.defer();

					deferred.resolve({
						'role': result.role,
						'address': result.address,
						'storeId': result.storeId,
						'serverDate': result.serverDate,
						'description': result.description,
						'collectionpointId': result._id
					});

					return deferred.promise;
				},

				list: (result) => {
					var deferred = Q.defer();

					result = result.map(obj => {
						return {
							'role': obj.role,
							'address': obj.address,
							'storeId': obj.storeId,
							'serverDate': obj.serverDate,
							'description': obj.description,
							'collectionpointId': obj._id
						};
					});

					deferred.resolve(result);

					return deferred.promise;
				}
			}
		},

		model: (req, result) => {
			var deferred = Q.defer();

			switch (req.originalUrl) {
				case ('*'):
				case ('/store/payfast/payment'):
					deferred.resolve(result);
					break;

				case ('/store/carts/add'):
					responder.response.carts.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/carts/list'):
					responder.response.carts.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/carts/sync'):
					responder.response.carts.sync(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/orders/get'):
					responder.response.orders.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/orders/list'):
					responder.response.orders.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/orders/verify'):
					responder.response.orders.verify(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/orders/process'):
					responder.response.orders.process(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/orders/initialize'):
					responder.response.orders.initialize(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/stores/add'):
					responder.response.stores.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/stores/get'):
					responder.response.stores.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/stores/list'):
					responder.response.stores.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/stores/load'):
					responder.response.stores.load(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/stores/validate'):
					responder.response.stores.validate(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/reports/sales'):
					responder.response.reports.sales(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/reviews/add'):
					responder.response.reviews.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/reviews/get'):
					responder.response.reviews.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/reviews/list'):
					responder.response.reviews.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/reviews/public/list'):
					responder.response.reviews.public.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/products/add'):
					responder.response.products.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/products/get'):
					responder.response.products.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/products/list'):
					responder.response.products.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/products/public/get'):
					responder.response.products.public.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/products/public/list'):
					responder.response.products.public.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/vouchers/add'):
					responder.response.vouchers.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/vouchers/get'):
					responder.response.vouchers.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/vouchers/list'):
					responder.response.vouchers.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/customers/iam'):
					responder.response.customers.iam(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/customers/add'):
					responder.response.customers.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/customers/get'):
					responder.response.customers.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/customers/list'):
					responder.response.customers.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/customers/request-access'):
					responder.response.customers.requestaccess(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/couriers/add'):
					responder.response.couriers.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/couriers/get'):
					responder.response.couriers.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/couriers/list'):
					responder.response.couriers.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/couriers/public/list'):
					responder.response.couriers.public.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/suppliers/add'):
					responder.response.suppliers.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/suppliers/get'):
					responder.response.suppliers.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/suppliers/list'):
					responder.response.suppliers.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/wishlists/add'):
					responder.response.wishlists.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/wishlists/list'):
					responder.response.wishlists.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/departments/add'):
					responder.response.departments.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/departments/get'):
					responder.response.departments.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/departments/list'):
					responder.response.departments.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/collection-points/add'):
					responder.response.collectionpoints.add(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/collection-points/get'):
					responder.response.collectionpoints.get(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/collection-points/list'):
					responder.response.collectionpoints.list(result).then(deferred.resolve, deferred.reject);
					break;
				case ('/store/collection-points/public/list'):
					responder.response.collectionpoints.public.list(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/carts/update'):
				case ('/store/stores/share'):
				case ('/store/orders/update'):
				case ('/store/stores/update'):
				case ('/store/reviews/update'):
				case ('/store/reviews/reject'):
				case ('/store/reviews/approve'):
				case ('/store/products/update'):
				case ('/store/vouchers/update'):
				case ('/store/customers/update'):
				case ('/store/couriers/update'):
				case ('/store/suppliers/update'):
				case ('/store/wishlists/update'):
				case ('/store/stores/unsubscribe'):
				case ('/store/departments/update'):
				case ('/store/vouchers/mark-as-sold'):
				case ('/store/orders/update/address'):
				case ('/store/orders/update/payment'):
				case ('/store/collection-points/update'):
				case ('/store/stores/update-subscriber'):
					responder.response.update(result).then(deferred.resolve, deferred.reject);
					break;

				case ('/store/carts/delete'):
				case ('/store/orders/delete'):
				case ('/store/stores/delete'):
				case ('/store/reviews/delete'):
				case ('/store/products/delete'):
				case ('/store/vouchers/delete'):
				case ('/store/customers/delete'):
				case ('/store/couriers/delete'):
				case ('/store/suppliers/delete'):
				case ('/store/wishlists/delete'):
				case ('/store/departments/delete'):
				case ('/store/collection-points/delete'):
					responder.response.delete(result).then(deferred.resolve, deferred.reject);
					break;

				default:
					deferred.resolve({
						'success': {
							'details': 'Your request resolved successfully but this payload is not modeled!'
						}
					});
					break;
			};

			return deferred.promise;
		},

		error: (req, res, err) => {
			res.status(err.error.code).json(err.error);
		},

		success: (req, res, result) => {
			responder.model(req, result)
				.then(result => {
					res.json(result);
				}, error => {
					var err = new ErrorResponse()
					err.error.code = 401;
					err.error.error[0].code = 401;
					err.error.error[0].reason = error.message;
					err.error.error[0].message = error.message;
					responder.error(req, res, err);
				});
		}
	};

	return responder;
};

exports.module = module;