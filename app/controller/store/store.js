let Store = require('../../models/store');

module.exports = {
    findNearby(req, res) {
        Store.find({}, function (err, info) {
            if (err) {
                throw err;
            }
            res.json(info);
        })
    }
};