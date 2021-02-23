const path = require('path');

const { getAutos, setAutos } = require(path.join('..', 'data', 'autos'));
const autos = getAutos();

module.exports = {
    renderIndex: (req, res) => {
        res.render('autos', {
            title: 'Nuestros Autos',
            autos
        });
    },
    renderShowAuto: (req, res) => {
        const id = req.params.id;
        const auto = autos.find(auto => auto.id == id);

        res.render('autos-show', {
            title: 'Vista de Detalle',
            auto
        })
    },
    searchCar: (req, res) => {
        const resultado = autos.filter(auto => auto.modelo.includes(req.query.busqueda));
        
        res.render('autos', {
            title: 'Resultado de la busqueda',
            autos: resultado
        });
    }
}