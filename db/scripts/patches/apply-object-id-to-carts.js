var query = {
    $or: [
        {
            'storeId': {
                $type: 'string'
            }
        },
        {
            'productId': {
                $type: 'string'
            }
        }
    ]
};
var max         = db.tblCarts.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblCarts.find(query, {
    '_id':          1,
    'storeId':      1,
    'productId':    1
}).forEach(api => {
    try {
        if (typeof(api.storeId) == 'string') {
            api.storeId = ObjectId(api.storeId);
        };
        if (typeof(api.productId) == 'string') {
            api.productId = ObjectId(api.productId);
        };
        db.tblCarts.update({
            '_id': api._id
        }, {
            $set: {
                'storeId':      api.storeId,
                'productId':    api.productId
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