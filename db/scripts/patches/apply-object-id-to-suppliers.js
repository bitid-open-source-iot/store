var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblSuppliers.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblSuppliers.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(supplier => {
    try {
        if (typeof(supplier.storeId) == 'string' && supplier.storeId.length == 24) {
            supplier.storeId = ObjectId(supplier.storeId);
        };
     
        db.tblSuppliers.update({
            '_id': supplier._id
        }, {
            $set: {
                'storeId': supplier.storeId
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