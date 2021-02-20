const path = require('path');
const bcrypt = require('bcrypt');

const { getAutos, setAutos } = require(path.join('..', 'data', 'autos'));
const { getAdmins, setAdmins } = require(path.join('..', 'data', 'admins'));

const autos = getAutos();
const admins = getAdmins();

module.exports = {
    renderRegister: (req, res) => {
        res.render('admin/register');
    },
    renderLogin: (req, res) => {
        res.render('admin/login');
    },
    processRegister: (req, res) => {
        const { username, pass } = req.body;

        let lastID = 0;
        admins.forEach(admin => {
            if (admin.id > lastID) {
                lastID = admin.id;
            }
        });

        // para hashear la pass
        let passHash = bcrypt.hashSync(pass.trim(), 12);

        const newAdmin = {
            id: +(lastID + 1),
            username: username.trim(),
            pass: passHash
        }

        admins.push(newAdmin);
        setAdmins(admins);

        res.redirect('/admin/login');
    },
    processLogin: (req, res) => {
        const { username, pass } = req.body;

        // buscar si existe el usuario
        let result = admins.find(admin => admin.username === username.trim());

        if(result) {
            // se comparan contraseñas
            if(bcrypt.compareSync(pass.trim(), result.pass)) {
                return res.redirect('/admin');
            } else {
                res.render('admin/login', {
                    error: 'Credenciales inválidas'
                });
            } 
        } else {
            res.render('admin/login', {
                error: 'Credenciales inválidas'
            })
        }
    },
    renderAdmin: (req, res) => {
        res.render('admin/index');
    },
    renderCarsList: (req, res) => {
        res.render('admin/carsList', {
            autos
        });
    },
    carsCreate: (req, res) => {
        res.render('admin/carsCreate');
    },
    carsStore: (req, res) => {
        let lastID = 1;
        autos.forEach(auto => {
            if (auto.id > lastID) {
                lastID = auto.id;
            }
        });

        const { marca, modelo, color, anio, img } = req.body;
        
        const auto = {
            id: Number(lastID + 1),
            marca,
            modelo,
            color,
            anio,
            img
        }

        autos.push(auto);

        setAutos(autos);
        res.redirect('/admin/autos/list');

    },
    carsEdit: (req, res) => {
        
        const auto = autos.find(auto => auto.id === +req.params.id);

        res.render('admin/carEdit', {
            auto
        });
    },
    carsUpdate: (req, res) => {
        const { marca, modelo, color, anio, img } = req.body;
        
        autos.forEach(auto => {
            if(auto.id === +req.params.id) {
                auto.id = Number(req.params.id);
                auto.marca = marca;
                auto.modelo = modelo;
                auto.color = color;
                auto.anio = anio;
                auto.img = img;
            }
        })

        setAutos(autos);
        res.redirect('/admin/autos/list');
    },
    carsDelete: (req, res) => {
        autos.forEach(auto => {
            if (auto.id === +req.params.id) {
                // con indexOf se busca en que indice esta el auto
                let aEliminar = autos.indexOf(auto);
                // con splice se elimina ese auto
                autos.splice(aEliminar, 1);
            }
        })

        fs.writeFileSync('./data/autos.json', JSON.stringify(autos), 'utf-8');
        res.redirect('/admin/autos/list');
    }
}