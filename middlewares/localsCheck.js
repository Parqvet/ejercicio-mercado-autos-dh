module.exports = (req, res, next) => {
    // si se levanta sesión
    if(req.session.userAdmin) {
        // se va a crear una variable local, que va a contener informacion de la sesión
        res.locals.userAdmin = req.session.userAdmin;
    }
    next();
}