var query = {
    'address': {
        $exists: false
    }
};
var max = db.tblCollectionPoints.find(query).count();
var last = 0;
var index = 1;
var percentage = 0;

db.tblCollectionPoints.find(query).forEach(point => {
    try {
        db.tblCollectionPoints.update({
            '_id': point._id
        }, {
            $set: {
                'address': {
                    'street': point.street,
                    'suburb': point.suburb,
                    'storeId': point.storeId,
                    'cityTown': point.cityTown,
                    'postalCode': point.postalCode,
                    'additionalInfo': point.additionalInfo
                }
            },
            $unset: {
                'vat': true,
                'type': true,
                'number': true,
                'business': true,
                'recipient': true
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