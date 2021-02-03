module.exports = {
    renderIndex: (req, res) => {
        res.render('autos', {
            title: 'Nuestros Autos'
        });
    }
}