var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblCollectionPoints.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblCollectionPoints.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(point => {
    try {
        db.tblCollectionPoints.update({
            '_id': point._id
        }, {
            $set: {
                'storeId': ObjectId(point.storeId)
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