const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const Room = require('../db/rooms')
const Log = require('../db/logs')
const Plan = require('../db/plans')
const Auth = require('../db/auths')
const User = require('../db/users')
const sequelize = require('sequelize')
const Op = sequelize.Op;
const request = require('request')

router.post("/register", function(req, res) {
    User.create({
        username: req.body.username,
        password: req.body.password,
        classnum: req.body.classnum,
        studentnum: req.body.studentnum,
        name: req.body.name
    }).then(() => {
        res.send("OK")
    })
})

router.post("/rent", function(req, res) {
    Plan.findAll({
        where: {
            [Op.and]: [
                { classnum: 102 }, //req.session.user.classnum },
                {
                    startTime: {
                        [Op.lte]: new Date()
                    }
                },
                {
                    endTime: {
                        [Op.gte]: new Date()
                    }
                }
            ]
        }
    }).then((datas) => {
        datas.forEach(element => {
            Room.findOne({ where: { no: element.roomnum, otp: req.body.otp } }).then(
                ele => {
                    if (ele) {
                        Auth.create({ successTime: new Date(), roomnum: element.roomnum }).then(() => {
                            res.send({ name: ele.name })
                        })
                    }
                }
            )
        });
    })
})

router.put("/rent", function(req, res) {
    Plan.create({
        classnum: req.body.classnum,
        roomnum: req.body.roomnum,
        startTime: req.body.startTime,
        endTime: req.body.endTime
    }).then(() => {
        res.send("OK")
    })
})

router.delete("/rent", function(req, res) {
    Plan.destroy({
        where: {
            classnum: req.body.classnum,
            roomnum: req.body.roomnum,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        }
    }).then(() => {
        res.send("OK")
    })
})

router.post("/sanity", function(req, res) {
    Plan.findOne({
        where: {
            [Op.and]: [
                { roomnum: req.body.roomnum },
                {
                    startTime: {
                        [Op.lte]: new Date()
                    }
                },
                {
                    end: {
                        [Op.gte]: new Date()
                    }
                }
            ]
        }
    }).then(data => {
        if (!data) {
            request({
                method: 'POST',
                json: true,
                uri: 'https://api-sens.ncloud.com/v1/sms/services/ncp:sms:kr:253673265568:woosong-con/messages',
                headers: {
                    'Content-Type': 'application/json',
                    'X-NCP-auth-key': '2aUYzyYJq3sZokQrZG4y',
                    'X-NCP-service-secret': '5d5ce02e59964782ab4b07bcc9a421c9'
                },
                body: {
                    type: 'sms',
                    contentType: "COMM",
                    countryCode: "82",
                    from: '01021904621',
                    to: '01021904621',
                    content: `${req.body.roomnum}실의 문이 예정에 없지만 열렸습니다!`
                }
            });
            res.send("Weird")
        } else {
            res.send("OK")
        }
    })
})

router.get("/rent", function(req, res) {
    console.log("hi start")
    Auth.findOne({
        [Op.and]: {
            roomnum: req.query.roomnum,
            successTime: {
                [Op.gte]: new Date() - 60000
            }
        }
    }).then((hi) => {
        console.log(`${hi}`)
        if (hi) {
            Auth.destroy({
                where: {
                    id: hi.id
                }
            }).then(() => {
                res.send(true)
                res.end();
            })
        } else {
            res.send(false)
            res.end();
        }
    })
    console.log("hi end")
})

router.get("/log", function(req, res) {
    Log.findAll({
        order: sequelize.literal('time DESC'),
        limit: 50,
        offset: 0
    }).then(
        (data) => {
            res.send(data)
        }
    );
})

router.post("/log", function(req, res) {
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