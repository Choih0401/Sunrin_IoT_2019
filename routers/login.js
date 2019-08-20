const express = require("express");
const router = express.Router();
const db = require('../db/connector.js');
const crypto = require('crypto');

router.get('/', function(req, res){
  res.render('login', {
  });
});

router.post('/', function(req,res){
  let id = req.body.LoginId;
  if(id.length > 80){
    id = id.slice(0,80);
  }
  let passwd = crypto.createHash('sha512').update(crypto.createHash('sha512').update(req.body.LoginPasswd).digest('base64')).digest('base64');
  const selectQuery = "SELECT * FROM user where id = ? and passwd = ?";
  console.log("[login/login]");
  db.query(selectQuery, [id, passwd], function(err, result){
    if(err) throw err;
    if(result.length == 0){
      res.render('login', {
      });
    }else if(result[0].passwd == passwd){
      req.session.user = {
        id : id,
        name : result[0].name,
        authorized : true
      };
      res.redirect('/');
    }else{
      res.render('login', {
      });
    }
  });
});

module.exports = router;
