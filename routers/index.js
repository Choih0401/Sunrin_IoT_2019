const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');

router.get('/', function(req, res){
  let user = req.session.user;


  // if (user === undefined){
  //   res.redirect('/login');
  // }
  // else {
    console.log('[index/index]');
    res.render('index', {
    // });
  }
});

router.get('/logout', function(req, res){
  console.log('[index/logout]');
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
