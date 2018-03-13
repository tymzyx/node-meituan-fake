let jwt = require('jsonwebtoken');
let config = require('../../../config/config')

module.exports = {
    checkToken (req, res, next) {
        // 检查post的信息或者url查询参数或者头信息\
        let token;
        if (req.body) {
            token = req.body.token || req.query.token || req.headers['x-access-token'];
        } else {
            token = req.query.token || req.headers['x-access-token'];
        }

        // 解析token
        if (token) {
            // 确认token
            jwt.verify(token, config.secret, function (err, decoded) {
                if (err) {
                    return res.json({ success: false, message: 'token信息错误.' });
                } else {
                    // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            // 如果没有token，则返回错误
            return res.status(403).send({
                success: false,
                message: '没有提供token！'
            });
        }
    }
};