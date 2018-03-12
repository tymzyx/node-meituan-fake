let express = require('express');
let login = require('../controller/login/login');
let checkToken = require('../controller/middleware/checkToken');

const router = express.Router();

// router.use(checkToken);
router.post('/login', login.login);

module.exports = router;
