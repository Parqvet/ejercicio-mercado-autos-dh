const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

// requerir express-validator
const { check, validationResult, body } = require('express-validator');

const { getAdmins, setAdmins } = require(path.join('..', 'data', 'admins'));
const admins = getAdmins();

module.exports = {
    renderRegister: (req, res) => {
        res.render('admin/register');
    },
    renderLogin: (req, res) => {
        res.render('admin/login');
    },
    processRegister: (req, res) => {
        // traer validationResult
        const errores = validationResult(req);
        // 
        if(!errores.isEmpty()) {
            return res.render('admin/register', {
                errores: errores.mapped(),
                old: req.body
            })
        } else {
            const { username, pass } = req.body;
    
            let lastID = 0;
            admins.forEach(admin => {
                if (admin.id > lastID) {
                    lastID = admin.id;
                }
            });
    
            // para hashear la pass
            let passHash = bcrypt.hashSync(pass.trim(), 12);
    
            const newAdmin = {
                id: +(lastID + 1),
                username: username.trim(),
                pass: passHash
            }
    
            admins.push(newAdmin);
            setAdmins(admins);
    
            res.redirect('/admin/login');

        }

    },
    processLogin: (req, res) => {
        const { username, pass, recordar } = req.body;

        // buscar si existe el usuario
        let result = admins.find(admin => admin.username === username.trim());

        // si el usuario está registrado
        if(result) {
            // se comparan contraseñas
            if(bcrypt.compareSync(pass.trim(), result.pass)) {

                // una vez que se confirmó su autorizacion aplicamos session
                // agregamos una propiedad al objeto session (userAdmin)
                // almacenamos los datos del usuario
                req.session.userAdmin = {
                    id: result.id,
                    username: result.username
                }

                // crear cookie
                if(recordar != 'undefined') {
                    res.cookie('userAdmin', req.session.userAdmin, {
                        maxAge: 1000 * 60
                    })
                }

                return res.redirect('/admin');
            } else {
                res.render('admin/login', {
                    error: 'Credenciales inválidas'
                });
            } 
        } else {
            res.render('admin/login', {
                error: 'Credenciales inválidas'
            })
        }
    },
    logout: (req, res) => {
        // req.session.destroy();
        delete req.session.userAdmin;

        if(req.cookies.userAdmin) {
            res.cookie('userAdmin', '', {
                maxAge: -1
            })
        }
        res.redirect('/');
    }
}