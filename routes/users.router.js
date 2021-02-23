const { Router } = require('express');
const router = Router();

// requerir multer
const upload = require('../middlewares/multerAutos');

const { renderRegister, processRegister, renderLogin, processLogin } = require('../controllers/users.controller');

// renderizar y procesar el registro
router.get('/register', renderRegister);
router.post('/register', processRegister)

// renderizar y procesar el login
router.get('/login', renderLogin);
router.post('/login', processLogin);

module.exports = router;