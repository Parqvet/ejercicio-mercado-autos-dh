const adminDB = require('../data/autos');

module.exports = {
    renderAdmin: (req, res) => {
        res.render('admin/index');
    }
}