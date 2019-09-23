const express = require('express');
const path = require('path');
const router = express.Router();
const db = require('../db/connector.js');
const Room = require('../db/rooms')
const Log = require('../db/logs')
const Plan = require('../db/plans')
const Auth = require('../db/auths')
const sequelize = require('sequelize')
const Op = sequelize.Op;

router.post("/rent", function(req, res) {
    Plan.findMany({
        where:{      
            [Op.and]: [      
                {classnum:req.session.user.classnum},
                {startTime:{[Op.lte]:new Date()}},
                {end:{[Op.gte]:new Date()}}
            ]
        }
    }).then((datas)=>{
        datas.forEach(element => {
            Room.findOne({where:{no:element.roomnum,otp:req.body.otp}}).then(
                ele=>{
                    if(ele)
                    {                        
                        Auth.create({successTime:new Date(),roomnum:element.roomnum}).then(()=>{
                            res.send({name:ele.name})
                        })
                    }
                }
            )
        });
    })
})

router.put("/rent",function(req,res){
    Plan.create({
        classnum: res.body.classnum,
        roomnum: res.body.roomnum,
        startTime: res.body.startTime,
        endTime: res.body.endTime
    }).then(()=>{
        res.send("OK")
    })
})

router.delete("/rent",function(req,res){
    Plan.destroy({where:{
        classnum: res.body.classnum,
        roomnum: res.body.roomnum,
        startTime: res.body.startTime,
        endTime: res.body.endTime
    }}).then(()=>{
        res.send("OK")
    })
})

router.get("/rent", function(req,res){
    Auth.findOne({[Op.and]:{
        roomnum:req.query.roomnum,
        successTime:{[Op.gte]:new Date() - 60000}
    }}).then((hi)=>
    {
        if(hi)
        {
            Auth.destroy({where:{
                id: hi.id
            }}).then(()=>{
                res.send(true)
            })
        }else{            
            res.send(false)
        }
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