const express = require('express');
const adminRoute = express.Router();
const adminModel = require('../Model/adminModel');
const doctorModel = require('../Model/doctorModel');
const patientModel = require('../Model/patientModel');
const newsModel = require('../Model/newsModel');
const appModel = require('../Model/appModel');
const feedModel = require('../Model/feedModel');
const { verifyPassword, createAuthResponse } = require("../services/authService");

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
    const admin = await adminModel.findOne({ email: email.toLowerCase() });
    const isPasswordValid = await verifyPassword(admin, password);

    if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid email or password" });
    }

    res.json({ msg: "Success", ...createAuthResponse(admin, "admin") });
    } catch (error) {
        res.status(500).json({ msg: "Unable to log in" });
    }
})

module.exports = adminRoute;
