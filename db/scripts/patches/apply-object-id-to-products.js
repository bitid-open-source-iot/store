var query = {
    $or: [
        {
            'storeId': {
                $type: 'string'
            }
        },
        {
            'supplierId': {
                $type: 'string'
            }
        }
    ]
};
var max         = db.tblProducts.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblProducts.find(query, {
    '_id':          1,
    'storeId':      1,
    'supplierId':   1,
    'departments':  1
}).forEach(product => {
    try {
        if (typeof(product.storeId) == 'string' && product.storeId.length == 24) {
            product.storeId = ObjectId(product.storeId);
        };
        if (typeof(product.supplierId) == 'string' && product.supplierId.length == 24) {
            product.supplierId = ObjectId(product.supplierId);
        };
        product.departments = product.departments.map(department => {
            if (typeof(department) == 'string' && department.length == 24) {
                department = ObjectId(department);
            };
            return department;
        });
        db.tblProducts.update({
            '_id': product._id
        }, {
            $set: {
                'storeId':      product.storeId,
                'supplierId':   product.supplierId,
                'departments':  product.departments
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