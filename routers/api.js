const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const Room = require('../db/rooms')

router.get("/rentplan", function(req, res) {
    //req.body.  
    const id = req.query.username
    const selectQuery = "SELECT  (SELECT class FROM user where id = ? LIMIT 1)";
    db.query(selectQuery, [id, passwd], function(err, result) {

    })
})

router.get("/newotp", function(req, res) {
    let no = req.query.no;
    let newotp = req.query.value;
    console.log(no)
    console.log(newotp)
    Room.findOne({ where: { no: no } }).then(
        room => {
            if (!room) {
                return Room.create({ no: no })
            }
            return room
        }
    ).then(
        room => {
            return Room.update({ otp: newotp }, { where: { id: room.id } })
        }
    ).then(
        r => {
            res.status(200).send("GOOOOD")
        }
    ).catch(reason => res.status(500).send(reason))
})

module.exports = router