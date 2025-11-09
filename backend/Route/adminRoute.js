const express = require('express');
const adminRoute = express.Router();
const adminModel = require('../Model/adminModel');
const doctorModel = require('../Model/doctorModel');
const patientModel = require('../Model/patientModel');
const newsModel = require('../Model/newsModel');
const appModel = require('../Model/appModel');
const feedModel = require('../Model/feedModel');

adminRoute.get('',(req,res)=>{
    res.end("Hello");
})


adminRoute.get('/stats',async(req,res)=>{
    try {
        const d = await doctorModel.find();
        const p = await patientModel.find();
        const f = await feedModel.find({"type":"Feedback"});
        const s = await feedModel.find({"type":"Suggestion"});
        const c = await feedModel.find({"type":"Complain"});
        const n = await newsModel.find();
        const a = await appModel.find();
        const pena = await appModel.find({"status":"pending"});
        const stats = {"d":d.length,"p":p.length, "f":f.length, "s":s.length, "c":c.length,"n":n.length,"a": a.length, "pena":pena.length};
        res.json({"msg":"Success", value:stats})
    } catch (error) {
        res.json({"msg":error})
    }
})

adminRoute.post('/log' ,async(req,res)=>{

    try {
        const {email,password} = req.body;
    const ad = await adminModel.findOne({email});
    if(!ad){
        res.json({ "msg":"Not Found"});
    }
    else{
        if(ad.password == password){
            res.json({"msg": "Success"});
        }
        else{
            res.json({"msg": "Something Went Wrong"});
        }
    }
    } catch (error) {
        res.json({"msg": error});
    }
})

module.exports = adminRoute;