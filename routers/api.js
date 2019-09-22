const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const Room = require('../db/rooms')
const Log = require('../db/logs')
const Plan = require('../db/plans')

router.post("/rent", function(req, res) {
    req.session.user.classnum
    Plan.findOne({
        
    })    
})

router.get("/log", function(req,res){
    Log.findAll({
        order: 'time DESC', 
        limit: 50, 
        offset: 0
    }).then(
        (data)=>
        { 
            res.send(data)
        }
    );
})

router.post("/log", function(req,res){
    Log.create({ msg: req.body.msg, type: req.body.msg }).then(
        () => {
            res.status(200).send("GOOOOD")
        }
    )
})

router.get("/newotp", function(req, res) {
    let no = req.query.no;
    let newotp = req.query.value;
    console.log(no)
    console.log(newotp)
    Room.findOrCreate({ where: { no: no } }).then(
        room => {
            return Room.update({ otp: newotp }, { where: { id: room.id } })
        }
    ).then(
        () => {
            res.status(200).send("GOOOOD")
        }
    ).catch(reason => res.status(500).send(reason))
})

module.exports = router