const autosDB = require('../data/autos');

module.exports = {
    renderIndex: (req, res) => {
        res.render('autos', {
            title: 'Nuestros Autos',
            autosDB
        });
    },
    show: (req, res) => {
        const id = req.params.id;
        const auto = autosDB.find(auto => auto.id == id);

        res.render('autos-show', {
            title: 'Vista de Detalle',
            auto
        })
    }
}