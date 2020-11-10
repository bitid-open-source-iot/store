const Q = require('q');
const mysql = require('mysql');

var module = function () {
	var db = {
		errorResponse: {
			"error": {
				"code": 601,
				"message": "database error",
				"errors": [{
					"reason": "General Error",
					"message": "Database Error",
					"location": "dbMySQL",
					"locationType": "Database",
				}]
			},
			"hiddenErrors": []
		},

		connect: (args) => {
			var deferred = Q.defer();

			var connection = mysql.createConnection({
				"host": __settings.sql.host,
				"user": __settings.sql.user,
				"password": __settings.sql.password,
				"database": __settings.sql.database
			});

			connection.connect(err => {
				if (err) {
					deferred.reject({
						'code': 601,
						'description': err.message
					});
				} else {
					args.connection = connection;
					deferred.resolve(args);
				};
			});

			return deferred.promise;
		},

		beginTransaction: (args) => {
			var deferred = Q.defer();

			args.connection.beginTransaction(err => {
				if (err) {
					deferred.reject({
						'code': 82,
						'description': 'Begin Transaction Error'
					});
				} else {
					deferred.resolve(args);
				};
			});

			return deferred.promise;
		},

		commitTransaction: (args) => {
			var deferred = Q.defer();

			args.connection.commit(err => {
				if (err) {
					deferred.reject({
						'code': 82,
						'description': 'Commit Transaction Error'
					});
				} else {
					deferred.resolve(args);
				};
			});

			return deferred.promise;
		},

		rollbackTransaction: (args) => {
			var deferred = Q.defer();

			args.connection.rollback(err => {
				if (err) {
					deferred.reject({
						'code': 82,
						'description': 'Rollback Transaction Error'
					});
				} else {
					deferred.resolve(args);
				};
			});

			return deferred.promise;
		},

		dbCall: (args) => {
			var deferred = Q.defer();

			args.connection.query(args.query, args.params, (err, result, fields) => {
				if (err) {
					args.connection.end();

					deferred.reject({
						'code': 72,
						'description': 'Error Running SQL Query'
					});
				} else {
					if (typeof (result) == 'undefined') {
						args.connection.end();

						deferred.reject({
							'code': 71,
							'description': 'SQL Result Undefined'
						});
					} else {
						if (args.type == "update" || args.type == "insert") {
							args[3] = result;
							deferred.resolve(args)
						} else if (result.length > 0) {
							args[3] = result;
							deferred.resolve(args)
						} else {
							if (args.allowNoRecordsFound) {
								deferred.resolve({
									'code': 69,
									'description': 'No Records Found',
								});
							} else {
								args.connection.end();

								deferred.reject({
									'code': 69,
									'description': 'No Records Found',
								});
							};
						};
					};
				};
			});

			return deferred.promise;
		}
	}

	return db;
};

exports.module = module;