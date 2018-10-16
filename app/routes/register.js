import register from '../controller/register/register'
let express = require('express');

const router = express.Router();

router.post('/register', register.register);

module.exports = router;