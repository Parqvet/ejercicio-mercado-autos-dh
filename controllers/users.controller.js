const path = require('path');
const bcrypt = require('bcrypt');
const fs = require('fs');

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
        const { username, pass } = req.body;

        // verificar si se completan los campos
        if(!username || !pass) {
            return res.redirect('/admin/register');
        }

        // buscar si ya existe el usuario
        let result = admins.find(admin => admin.username === username.trim());

        // verificar si existe el usuario
        if(result) {
            return res.render('admin/register', {
                error: 'El usuario ya está registrado'
            });
        }

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
    },
    processLogin: (req, res) => {
        const { username, pass } = req.body;

        // buscar si existe el usuario
        let result = admins.find(admin => admin.username === username.trim());

        if(result) {
            // se comparan contraseñas
            if(bcrypt.compareSync(pass.trim(), result.pass)) {
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
    }
}