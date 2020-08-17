var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblCouriers.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblCouriers.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(courier => {
    try {
        db.tblCouriers.update({
            '_id': courier._id
        }, {
            $set: {
                'storeId': ObjectId(courier.storeId)
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