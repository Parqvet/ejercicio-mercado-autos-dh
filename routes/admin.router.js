const { Router } = require('express');
const router = Router();

// requerir multer
const upload = require('../middlewares/multerAutos');

const { renderAdmin, renderCarsList, carsCreate, carsStore, carsEdit, carsUpdate, carsDelete } = require('../controllers/admin.controller');

// renderizas index del admin
router.get('/', renderAdmin);

// listar autos
router.get('/autos/list', renderCarsList);

// crear autos
router.get('/autos/create', carsCreate);
router.post('/autos/store', upload.any(), carsStore);

// editar autos
router.get('/autos/edit/:id', carsEdit);
router.put('/autos/update/:id', carsUpdate);

// eliminar autos
router.delete('/autos/delete/:id', carsDelete);

module.exports = router;