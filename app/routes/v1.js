import locations from '../controller/v1/locations'
import search from '../controller/v1/search'
let express = require('express');

const router = express.Router();

router.get('/pois/:geohash', locations.pois);
router.get('/searchPlace', search.search)

module.exports = router;