const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const User = require('../db/users');

router.post('/', function(req, res) {
    let name = req.body.username;
    if (name.length > 80) {
        name = name.slice(0, 80);
    }
    let passwd = crypto.scryptSync(req.body.RegisterPasswd).toString('base64');
    let id = req.body.RegisterId;
    if (id.length > 80) {
        id = id.slice(0, 80);
    }

    User.create({
            username: name,
            password: passwd,
            classnum: 0, // 학년반  205 형식
            studentnum: 0, // 번호
            name: "" // 사람이름   
        }).then(newuser => {
            console.log(`user : ${newuser.username} joined.`);
            //흠
        })
        //const insertQuery = "INSERT INTO user (name, id, passwd) VALUES(?, ?, ?)";
    console.log("[login/register]");
    //db.query(insertQuery, [name, id, passwd], function(err, result) {
    //    res.render('login', {});
    //});

});

module.exports = router;