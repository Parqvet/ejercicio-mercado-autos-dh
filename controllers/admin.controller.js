const autos = require('../data/autos');

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

    },
    carsStore: (req, res) => {
        
    },
    carsEdit: (req, res) => {
        
    },
    carsUpdate: (req, res) => {
        
    },
    carsDelete: (req, res) => {
        
    }
}