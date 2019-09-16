const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');

router.get("/rentplan",function(req,res){
    //req.body.  
    const id = req.query.username
    const selectQuery = "SELECT  (SELECT class FROM user where id = ? LIMIT 1)";
    db.query(selectQuery, [id, passwd], function(err, result){
        
    })
})

router.post("/newotp"function(req,res){
    const id = req.query.username
    const selectQuery = "UPDATE class FROM user where id = ? LIMIT 1)";
    db.query(selectQuery, [id, passwd], function(err, result){
        
    })
})