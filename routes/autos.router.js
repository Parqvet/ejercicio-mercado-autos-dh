const { Router } = require('express');
const router = Router();

const autosController = require('../controllers/autos.controller');

router.get('/', autosController.renderIndex);

module.exports = router;