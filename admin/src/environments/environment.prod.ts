export const environment = {
	"auth": 		"https://auth.bitid.co.za",
	"drive":		"https://drive.bitid.co.za",
	"store":		"https://shop.bitid.co.za",
	"appId":   		"000000000000000000000008",
	"appName":		"store admin",
	"production":	true,
	"roles": [
		{
			'title': 'Read',
			'value': 1
		},
		{
			'title': 'Write',
			'value': 2
		},
		{
			'title': 'Read/Write',
			'value': 3
		},
		{
			'title': 'Admin',
			'value': 4
		},
		{
			'title': 'Owner',
			'value': 5
		}
	],
	"scopes": [
		{"url": "/users/get", "role": 4},
		{"url": "/users/update", "role": 4},
		
		{"url": "/store/apis/add", "role": 4},
		{"url": "/store/apis/get", "role": 4},
		{"url": "/store/apis/list", "role": 4},
		{"url": "/store/apis/share", "role": 4},
		{"url": "/store/apis/update", "role": 4},
		{"url": "/store/apis/delete", "role": 4},
		{"url": "/store/apis/unsubscribe", "role": 4},
		{"url": "/store/apis/updatesubscriber", "role": 4},
		
		{"url": "/store/stores/add", "role": 4},
		{"url": "/store/stores/get", "role": 4},
		{"url": "/store/stores/list", "role": 4},
		{"url": "/store/stores/share", "role": 4},
		{"url": "/store/stores/update", "role": 4},
		{"url": "/store/stores/delete", "role": 4},
		{"url": "/store/stores/unsubscribe", "role": 4},
		{"url": "/store/stores/updatesubscriber", "role": 4},

		{"url": "/store/reviews/get", "role": 4},
		{"url": "/store/reviews/list", "role": 4},
		{"url": "/store/reviews/reject", "role": 4},
		{"url": "/store/reviews/approve", "role": 4},
		
		{"url": "/store/products/add", "role": 4},
		{"url": "/store/products/get", "role": 4},
		{"url": "/store/products/list", "role": 4},
		{"url": "/store/products/share", "role": 4},
		{"url": "/store/products/update", "role": 4},
		{"url": "/store/products/delete", "role": 4},
		{"url": "/store/products/unsubscribe", "role": 4},
		{"url": "/store/products/updatesubscriber", "role": 4},

		{"url": "/store/couriers/add", "role": 4},
		{"url": "/store/couriers/get", "role": 4},
		{"url": "/store/couriers/list", "role": 4},
		{"url": "/store/couriers/share", "role": 4},
		{"url": "/store/couriers/update", "role": 4},
		{"url": "/store/couriers/delete", "role": 4},
		{"url": "/store/couriers/unsubscribe", "role": 4},
		{"url": "/store/couriers/updatesubscriber", "role": 4},

		{"url": "/store/suppliers/add", "role": 4},
		{"url": "/store/suppliers/get", "role": 4},
		{"url": "/store/suppliers/list", "role": 4},
		{"url": "/store/suppliers/share", "role": 4},
		{"url": "/store/suppliers/update", "role": 4},
		{"url": "/store/suppliers/delete", "role": 4},
		{"url": "/store/suppliers/unsubscribe", "role": 4},
		{"url": "/store/suppliers/updatesubscriber", "role": 4},

		{"url": "/store/departments/add", "role": 4},
		{"url": "/store/departments/get", "role": 4},
		{"url": "/store/departments/list", "role": 4},
		{"url": "/store/departments/share", "role": 4},
		{"url": "/store/departments/update", "role": 4},
		{"url": "/store/departments/delete", "role": 4},
		{"url": "/store/departments/unsubscribe", "role": 4},
		{"url": "/store/departments/updatesubscriber", "role": 4},

		{"url": "/store/collectionpoints/add", "role": 4},
		{"url": "/store/collectionpoints/get", "role": 4},
		{"url": "/store/collectionpoints/list", "role": 4},
		{"url": "/store/collectionpoints/share", "role": 4},
		{"url": "/store/collectionpoints/update", "role": 4},
		{"url": "/store/collectionpoints/delete", "role": 4},
		{"url": "/store/collectionpoints/unsubscribe", "role": 4},
		{"url": "/store/collectionpoints/updatesubscriber", "role": 4}
	]
};