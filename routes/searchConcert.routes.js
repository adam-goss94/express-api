const express = require('express');
const router = express.Router();
const searchConcertController = require('../controllers/searchConcert.controller');

const app = express();

router.route('/performer/:performer').get(searchConcertController.getPerformer);
router.route('/genre/:genre').get(searchConcertController.getGenre);
router.route('/price/:price_min/:price_max').get(searchConcertController.getPriceMinMax);
router.route('/day/:day').get(searchConcertController.getDay);

module.exports = router;