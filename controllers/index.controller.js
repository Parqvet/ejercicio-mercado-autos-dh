module.exports = {
    renderIndex: (req, res) => {
        res.render('index', {
            title: 'Mercado Autos'
        });
    },
    renderAbout: (req, res) => {
        res.render('about', {
            title: 'About'
        });
    }
}