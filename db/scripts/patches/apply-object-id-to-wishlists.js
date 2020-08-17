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
var max         = db.tblWishlists.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblWishlists.find(query, {
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
        db.tblWishlists.update({
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