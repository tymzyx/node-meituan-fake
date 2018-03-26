import register from '../controller/register/register'
let express = require('express');

const router = express.Router();

router.get('/register', register.register);

module.exports = router;