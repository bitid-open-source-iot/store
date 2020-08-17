var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblApis.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblApis.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(api => {
    try {
        db.tblApis.update({
            '_id': api._id
        }, {
            $set: {
                'storeId': ObjectId(api.storeId)
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