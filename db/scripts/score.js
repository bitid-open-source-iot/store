db.tblRatings.aggregate([
    {
        $match: {
            "status": "approved"
        }
    },
    {
        $group: {
            "_id": "$score",
            "count": {
                $sum: 1
            }
        }
    },
    {
        $project: {
            "_id":      0,
            "score":    "$_id",
            "count":    1
        }
    }
]);