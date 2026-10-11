const express = require('express');
const doctorRoute = express.Router();
const doctorModel = require('../Model/doctorModel');
const appModel = require('../Model/appModel');
const feedModel = require('../Model/feedModel');
const { verifyPassword, createAuthResponse } = require("../services/authService");

doctorRoute.get('', async(req,res)=>{
    try {
        const doc = await doctorModel.find();
        res.json({"msg":"Success","value":doc});
    } catch (error) {
        res.json({"msg":error});
    }
})

doctorRoute.get('/stats/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const f = await feedModel.find({"type":"Feedback","uid":id});
        const s = await feedModel.find({"type":"Suggestion","uid":id});
        const c = await feedModel.find({"type":"Complain","uid":id});
        const a = await appModel.find({"did":id});
        const pena = await appModel.find({"status":"pending","did":id});
        const cona = await appModel.find({"status":"confirmed","did":id});
        const coma = await appModel.find({"status":"completed","did":id});
        const cana = await appModel.find({"status":"cancelled","did":id});

        const stats = { "f":f.length, "s":s.length, "c":c.length,"a": a.length, "pena":pena.length,"cona":cona.length,"coma":coma.length,"cana":cana.length};
        res.json({"msg":"Success", value:stats})
    } catch (error) {
        console.log(error);
        res.json({"msg":error})
    }
});

doctorRoute.get('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        const doc = await doctorModel.findById(id);
        res.json({"msg":"Success","Value":doc});
    } catch (error) {
        res.json({"msg":error})
    }
})

doctorRoute.post('/log' ,async(req,res)=>{

    try {
        const {email,password} = req.body;
    const doctor = await doctorModel.findOne({ email: email.toLowerCase() });
    const isPasswordValid = await verifyPassword(doctor, password);

    if (!isPasswordValid) {
        return res.status(401).json({ msg: "Invalid email or password" });
    }

    const auth = createAuthResponse(doctor, "doctor");
    res.json({ msg: "Success", id: doctor._id, ...auth });
    } catch (error) {
        res.status(500).json({ msg: "Unable to log in" });
    }
})


doctorRoute.post('',async(req,res)=>{
    try {
        await doctorModel.create(req.body);
        res.json({"msg": "Success"})
    } catch (error) {
        res.json({"msg":error});
    }
})
doctorRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedDoctor = await doctorModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ "msg": "Success", "value": updatedDoctor });
    } catch (error) {
        res.json({ "msg": error.message });
    }
});

doctorRoute.delete('/:id',async(req,res)=>{
    try {
        const id = req.params.id;
        await doctorModel.findByIdAndDelete(id);
        res.json({"msg":"Success"});
    } catch (error) {
        res.json({"msg":error});
    }
})

module.exports = doctorRoute;
