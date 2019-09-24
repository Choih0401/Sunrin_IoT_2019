const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');

router.get('/', function (req, res) {
  let user = req.session.user;

  // 주석 해제해야함
  // if (user === undefined){
  //   res.redirect('/login');
  // }
  // else {
  console.log('[index/index]');
  res.render('index', {
  });
  // }
});


router.get('/login', function (req, res) {
  let user = req.session.user;
  res.render('login', {
  });
});

router.get('/register', function (req, res) {
  let user = req.session.user;
  res.render('register', {
  });
});

router.get('/admin', function (req, res) {
  let user = req.session.user;
  res.render('admin', {
  });
});

router.get('/auth', function (req, res) {
  let user = req.session.user;
  res.render('auth', {
  });
});

router.get('/logout', function (req, res) {
  console.log('[index/logout]');
  req.session.destroy();
  res.redirect('/')
});

module.exports = router;
