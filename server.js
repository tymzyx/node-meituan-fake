/**
 * Created by songli on 18/3/12.
 */

let express = require('express');
let bodyParser = require('body-parser');
let morgan = require('morgan');
let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');

let router = require('./app/routes/index');
let config = require('./config/config');

let app = express();

app.all('*', (req, res, next) => {
	res.header("Access-Control-Allow-Origin", req.headers.origin || '*');
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  	res.header("Access-Control-Allow-Credentials", true); //可以带cookies
	res.header("X-Powered-By", '3.2.1')
	if (req.method == 'OPTIONS') {
	  	res.send(200);
	} else {
	    next();
	}
});

app.get('/api', function (req, res) {
    res.json({message: 'api can work!'});
});

// =======================
// 配置 =========
// =======================
let port = process.env.PORT || 7766; // 设置启动端口
mongoose.connect(config.database); // 连接数据库
app.set('superSecret', config.secret); // 设置app 的超级密码--用来生成摘要的密码

// body-parser解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用morgan将请求日志打印到控制台
app.use(morgan('dev'));

router.router(app);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);
