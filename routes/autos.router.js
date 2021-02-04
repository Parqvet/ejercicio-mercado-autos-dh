const { Router } = require('express');
const router = Router();

const { renderIndex, renderShowAuto, searchCar } = require('../controllers/autos.controller');

router.get('/', renderIndex);
router.get('/show/:id', renderShowAuto);
router.get('/search', searchCar);

module.exports = router;