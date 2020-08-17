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
var max         = db.tblReviews.find(query).count();
var last        = 0;
var index       = 1;
var percentage  = 0;

db.tblReviews.find(query, {
    '_id':          1,
    'storeId':      1,
    'productId':    1
}).forEach(review => {
    try {
        if (typeof(review.storeId) == 'string' && review.storeId.length == 24) {
            review.storeId = ObjectId(review.storeId);
        };
        if (typeof(review.productId) == 'string' && review.productId.length == 24) {
            review.productId = ObjectId(review.productId);
        };
        db.tblReviews.update({
            '_id': review._id
        }, {
            $set: {
                'storeId':      review.storeId,
                'productId':    review.productId
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