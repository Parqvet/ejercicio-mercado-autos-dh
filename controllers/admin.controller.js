// db
const autos = require('../data/autos');

const fs = require('fs');
const { json } = require('express');


module.exports = {
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

        fs.writeFileSync('./data/autos.json', JSON.stringify(autos), 'utf-8');
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

        fs.writeFileSync('./data/autos.json', JSON.stringify(autos), 'utf-8');
        res.redirect('/admin/autos/list');
    },
    carsDelete: (req, res) => {
        
    }
}