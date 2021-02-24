module.exports = (req, res, next) => {
    // si existe userAdmin, si alguien se loguea
    if(req.session.userAdmin) {
        // que siga adelante
        next()
    } else {
        res.redirect('/admin/login');
    }
}