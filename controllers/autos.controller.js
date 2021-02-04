const autosDB = require('../data/autos');

module.exports = {
    renderIndex: (req, res) => {
        res.render('autos', {
            title: 'Nuestros Autos',
            autosDB
        });
    },
    renderShowAuto: (req, res) => {
        const id = req.params.id;
        const auto = autosDB.find(auto => auto.id == id);

        res.render('autos-show', {
            title: 'Vista de Detalle',
            auto
        })
    },
    searchCar: (req, res) => {
        const resultado = autosDB.filter(auto => auto.modelo.includes(req.query.busqueda));
        
        res.render('autos', {
            title: 'Resultado de la busqueda',
            autosDB: resultado
        });
    }
}