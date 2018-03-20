let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const storeSchema = new Schema({
    name: String,
    rank: String,
    avg_time: String,
    base_price: String,
    send_price: String,
    menu: {},
    comment_info: {},
    address: String,
    sale_time: String,
    phone: String
});

// 导出User模块
module.exports = mongoose.model('Store', storeSchema);