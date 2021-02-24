const { Router } = require('express');
const router = Router();

// requerir middleware para carga de imagenes
const upload = require('../middlewares/multerAutos');

// requerir middleware adminCheck
const adminCheck = require('../middlewares/adminCheck');

const { renderAdmin, renderUsersList, renderCarsList, carsCreate, carsStore, carsEdit, carsUpdate, carsDelete, renderProfileAdmin } = require('../controllers/admin.controller');

// renderizas index del admin
// aplicamos middleware de ruta para entrar al panel del admin
// si alguien quiere entrar a la ruta /admin, se tiene que verificar si levantó sesion
router.get('/', adminCheck, renderAdmin);

// renderizar lista de admins y profile
router.get('/list', renderUsersList);
router.get('/profile/:id', renderProfileAdmin);

// listar autos
router.get('/autos/list', adminCheck, renderCarsList);

// crear autos
router.get('/autos/create', adminCheck, carsCreate);
router.post('/autos/store', upload.any(), carsStore);

// editar autos
router.get('/autos/edit/:id', adminCheck, carsEdit);
router.put('/autos/update/:id', carsUpdate);

// eliminar autos
router.delete('/autos/delete/:id', carsDelete);

module.exports = router;