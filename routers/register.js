const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');

router.post('/', function(req, res){
  let name = req.body.username;
  if(name.length > 80){
    name = name.slice(0,80);
  }
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.RegisterPasswd).digest('base64')).digest('base64');
  let id = req.body.RegisterId;
  if(id.length > 80){
    id = id.slice(0,80);
  }

  const insertQuery = "INSERT INTO user (name, id, passwd) VALUES(?, ?, ?)";
  console.log("[login/register]");
  db.query(insertQuery, [name, id, passwd], function(err, result){
    res.render('login', {
    });
  });
});

module.exports = router;
