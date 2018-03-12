let User = require('../../models/user');
let jwt = require('jsonwebtoken');

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
                    let token = jwt.sign(user, app.get('superSecret'), {
                        expiresInMinutes: 1440 // 设置过期时间 expiresIn
                    });
                    res.json({
                        success: true,
                        message: 'Enjoy your token!',
                        token: token
                    });
                }
            }
        })
    }
};