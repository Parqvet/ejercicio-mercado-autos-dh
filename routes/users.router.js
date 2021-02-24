const { Router } = require('express');
const router = Router();

const { renderRegister, processRegister, renderLogin, processLogin } = require('../controllers/users.controller');

// requerir middleware de validacion para registro de usuario
const registerAdminValidator = require('../validations/registerAdminValidator');

// requerir middleware de validacion para login de usuario
const loginAdminValidator = require('../validations/loginAdminValidator');

// renderizar y procesar el registro
router.get('/register', renderRegister);
router.post('/register', registerAdminValidator, processRegister);

// renderizar y procesar el login
router.get('/login', renderLogin);
router.post('/login', loginAdminValidator, processLogin);

module.exports = router;