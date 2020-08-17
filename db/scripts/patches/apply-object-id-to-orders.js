var query = {
    $or: [
        {
            'storeId': {
                $type: 'string'
            }
        },
        {
            'product.productId': {
                $type: 'string'
            }
        }
    ]
};
var max         = db.tblOrders.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblOrders.find(query, {
    '_id':      1,
    'storeId':  1,
    'products': 1
}).forEach(order => {
    try {
        order.products = order.products.map(product => {
            if (typeof(product.productId) == 'string' && product.productId.length == 24) {
                product.productId = ObjectId(product.productId);
            };
            return product;
        });

        db.tblOrders.update({
            '_id': order._id
        }, {
            $set: {
                'storeId':  ObjectId(order.storeId),
                'products': order.products
            }
        });
    } catch (error) {
        print(error.message);
    };

    percentage = Math.floor((index / max) * 100);
    if (last != percentage) {
        print(percentage + '%');
        last = percentage;
    };
    index++;
});