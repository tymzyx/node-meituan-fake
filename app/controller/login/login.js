let User = require('../../models/user');
let jwt = require('jsonwebtoken');
let config = require('../../../config/config')

module.exports = {
    login(req, res) {
        User.findOne({
            name: req.body.name
        }, function (err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                res.json({success: false, message: '认证失败，用户名找不到'});
            } else if (user) {
                // 检查密码
                if (user.password !== req.body.password) {
                    res.json({ success: false, message: '认证失败，密码错误' });
                } else {
                    // 创建token
                    let token = jwt.sign({
                        username: user.name,
                        password: user.password,
                        admin: user.admin
                    }, config.secret, {
                        expiresIn: 3600 // 设置过期时间 expiresIn
                    });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        })
    },
    isLogin(req, res) {
        req.decoded.success = true;
        res.json(req.decoded);
    }
};