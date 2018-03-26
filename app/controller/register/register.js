'use strict';

let User = require('../../models/user');

let register = function (req, res) {
    let {username, password, email, mobile} = req.body;
    User.find({}, {name: 1}, function (err, names) {
        if (err) {
            console.log('error', err);
            res.json({
                status: 0,
                message: '注册失败'
            });
            throw err;
        }
        if (names.indexOf(username)) {
            res.json({
                status: 0,
                message: '注册失败，用户名已存在'
            });
        } else {
            User.create({
                name: username,
                password: password,
                mobile: mobile,
                email: email
            }, function (err) {
                if (err) {
                    console.log('error', err);
                    res.json({
                        status: 0,
                        message: '注册失败'
                    });
                    throw err;
                }
                res.json({
                    status: 1,
                    message: '注册成功'
                })
            })
        }
    })
};

export default {
    register: register
}