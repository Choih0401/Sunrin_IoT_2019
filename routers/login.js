const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const User = require('../db/users');

router.get('/', function(req, res) {
    res.render('login', {});
});

router.post('/', function(req, res) {
    let id = req.body.LoginId;
    let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.LoginPasswd).digest('base64')).digest('base64');
    User.findOne({
        where: {
            username: id,
            password: passwd
        }
    }).then(user => {
        if (!user) {
            res.render('login', {});
        } else {
            req.session.user = {
                username: id,
                name: user.name,
                authorized: true
            };
            res.redirect('/');
        }
    })
});

module.exports = router;