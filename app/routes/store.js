let express = require('express');
let store = require('../controller/store/store');

const router = express.Router();

router.get('/findNearby', store.findNearby);

module.exports = router;