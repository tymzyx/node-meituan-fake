let express = require('express');
let login = require('../controller/login/login');
let checkToken = require('../controller/middleware/checkToken');

const router = express.Router();

router.post('/login', login.login);

router.use(checkToken.checkToken);
router.post('/isLogin', login.isLogin);

module.exports = router;
