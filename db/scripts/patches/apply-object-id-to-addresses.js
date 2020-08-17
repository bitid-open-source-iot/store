var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblAddresses.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblAddresses.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(address => {
    try {
        db.tblAddresses.update({
            '_id': address._id
        }, {
            $set: {
                'storeId': ObjectId(address.storeId)
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