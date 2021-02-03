const { Router } = require('express');
const router = Router();

const autosController = require('../controllers/autos.controller');

router.get('/', autosController.renderIndex);

// llegar a esta ruta con un parametro
router.get('/show/:id', autosController.show);

module.exports = router;