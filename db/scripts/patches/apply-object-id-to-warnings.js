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
var max         = db.tblWarnings.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblWarnings.find(query, {
    '_id':          1,
    'storeId':      1,
    'productId':    1
}).forEach(warning => {
    try {
        if (typeof(warning.storeId) == 'string' && warning.storeId.length == 24) {
            warning.storeId = ObjectId(warning.storeId);
        };
        if (typeof(warning.productId) == 'string' && warning.productId.length == 24) {
            warning.productId = ObjectId(warning.productId);
        };
        db.tblWarnings.update({
            '_id': warning._id
        }, {
            $set: {
                'storeId':      warning.storeId,
                'productId':    warning.productId
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