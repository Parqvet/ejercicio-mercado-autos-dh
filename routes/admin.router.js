const { Router } = require('express');
const router = Router();

const { renderAdmin, renderCarsList, carsCreate, carsStore, carsEdit, carsUpdate, carsDelete, renderRegister, processRegister, renderLogin, processLogin } = require('../controllers/admin.controller');

// renderizas index del admin
router.get('/', renderAdmin);

// renderizar y procesar el registro
router.get('/register', renderRegister);
router.post('/register', processRegister)

// renderizar y procesar el login
router.get('/login', renderLogin);
router.post('/login', processLogin);

// listar autos
router.get('/autos/list', renderCarsList);

// crear autos
router.get('/autos/create', carsCreate);
router.post('/autos/store', carsStore);

// editar autos
router.get('/autos/edit/:id', carsEdit);
router.put('/autos/update/:id', carsUpdate);

// eliminar autos
router.delete('/autos/delete/:id', carsDelete);

module.exports = router;