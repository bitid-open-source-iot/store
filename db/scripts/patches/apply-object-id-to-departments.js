var query = {
    'storeId': {
        $type: 'string'
    }
};
var max         = db.tblDepartments.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblDepartments.find(query, {
    '_id':      1,
    'storeId':  1
}).forEach(department => {
    try {
        db.tblDepartments.update({
            '_id': department._id
        }, {
            $set: {
                'storeId': ObjectId(department.storeId)
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