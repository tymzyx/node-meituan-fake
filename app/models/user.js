'use strict';

let mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    password: String,
    admin: Boolean,
    is_active: Boolean,
    avatar: String,
    mobile: String,
    email: String,
    address: []
});

// 导出User模块
module.exports = mongoose.model('User', userSchema);
