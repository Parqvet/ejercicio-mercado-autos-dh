const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

const { getAutos, setAutos } = require(path.join('..', 'data', 'autos'));
const { getAdmins, setAdmins } = require(path.join('..', 'data', 'admins'));

const autos = getAutos();
const admins = getAdmins();

module.exports = {
    renderUsersList: (req, res) => {
        res.render('admin/adminList', {
            admins
        })
    },
    renderProfileAdmin: (req, res) => {
        const admin = admins.find(admin => admin.id === +req.params.id);

        res.render('admin/profileAdmin', {
            admin
        })
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
    carsStore: (req, res, next) => {

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
            img: req.files[0].filename
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

                if(fs.existsSync(path.join('public', 'images', 'autos', auto.img))) {
                    fs.unlinkSync(path.join('public', 'images', 'autos', auto.img))
                }

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