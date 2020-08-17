export const environment = {
	"auth":           "https://auth.bitid.co.za",
	"drive":          "https://drive.bitid.co.za",
	"store":          "https://shop.bitid.co.za",
	"appName":        "store",
	"production":     true,
	"appId":   "000000000000000000000008",
	"payfast": {
        "url":       	"https://www.payfast.co.za/eng/process",
        "notify_url":	"https://shop.bitid.co.za/store/payfast/payment",
		"merchant_id": 	10000100,
		"merchant_key": "46f0cd694581a"
    },
	"scopes": [
		{"url": "/users/get", "role": 4},
		{"url": "/users/update", "role": 4},
		
		{"url": "/store/carts/add", "role": 4},
		{"url": "/store/carts/list", "role": 4},
		{"url": "/store/carts/update", "role": 4},
		{"url": "/store/carts/delete", "role": 4},
	
		{"url": "/store/orders/get", "role": 4},
		{"url": "/store/orders/list", "role": 4},
		{"url": "/store/orders/verify", "role": 4},
		{"url": "/store/orders/update", "role": 4},
		{"url": "/store/orders/initialize", "role": 4},
	
		{"url": "/store/stores/get", "role": 4},
		{"url": "/store/stores/validate", "role": 4},
	
		{"url": "/store/products/get", "role": 4},
		{"url": "/store/products/list", "role": 4},
	
		{"url": "/store/couriers/get", "role": 4},
		{"url": "/store/couriers/list", "role": 4},
	
		{"url": "/store/suppliers/get", "role": 4},
		{"url": "/store/suppliers/list", "role": 4},
	
		{"url": "/store/addresses/add", "role": 4},
		{"url": "/store/addresses/get", "role": 4},
		{"url": "/store/addresses/list", "role": 4},
		{"url": "/store/addresses/update", "role": 4},
		{"url": "/store/addresses/delete", "role": 4},
	
		{"url": "/store/departments/get", "role": 4},
		{"url": "/store/departments/list", "role": 4},
	
		{"url": "/store/collectionpoints/get", "role": 4},
		{"url": "/store/collectionpoints/list", "role": 4},
	
		{"url": "/store/reviews/add", "role": 4},
		{"url": "/store/reviews/get", "role": 4},
		{"url": "/store/reviews/list", "role": 4},
		{"url": "/store/reviews/update", "role": 4},
		{"url": "/store/reviews/delete", "role": 4},
	
		{"url": "/store/wishlists/add", "role": 4},
		{"url": "/store/wishlists/list", "role": 4},
		{"url": "/store/wishlists/update", "role": 4},
		{"url": "/store/wishlists/delete", "role": 4}
	]
};