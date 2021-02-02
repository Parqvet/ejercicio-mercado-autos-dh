const { Router } = require('express');
const router = Router();

const indexController = require('../controllers/index.controller');

router.get('/', indexController.renderIndex);
router.get('/about', indexController.renderAbout);

module.exports = router;