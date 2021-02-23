const { Router } = require('express');
const router = Router();

const { renderRegister, processRegister, renderLogin, processLogin } = require('../controllers/users.controller');
const registerAdminValidator = require('../validations/registerAdminValidator');

// renderizar y procesar el registro
router.get('/register', renderRegister);
router.post('/register', registerAdminValidator, processRegister);

// renderizar y procesar el login
router.get('/login', renderLogin);
router.post('/login', processLogin);

module.exports = router;