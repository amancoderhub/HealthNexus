const express=require('express');
const patientModel = require('../Model/patientModel');
const nodemailer = require('nodemailer');
const appModel = require('../Model/appModel');
const feedModel = require('../Model/feedModel');

const patientRoute = express.Router();

patientRoute.get('',async(req,res)=>{
    try{
        const patient = await patientModel.find();
        res.json({"msg":"Success","value":patient});
    }
    catch(error){
        res.json({"msg":error});
    }
});

patientRoute.get('/stats/:id',async(req,res)=>{
    try {
        const id = req.params.id;
                const f = await feedModel.find({"type":"Feedback","uid":id});
                const s = await feedModel.find({"type":"Suggestion","uid":id});
                const c = await feedModel.find({"type":"Complain","uid":id});
                const a = await appModel.find({"pid":id});
                const pena = await appModel.find({"status":"pending","pid":id});
                const cona = await appModel.find({"status":"confirmed","pid":id});
                const coma = await appModel.find({"status":"completed","pid":id});
                const cana = await appModel.find({"status":"cancelled","pid":id});
        
                const stats = { "f":f.length, "s":s.length, "c":c.length,"a": a.length, "pena":pena.length,"cona":cona.length,"coma":coma.length,"cana":cana.length};
                res.json({"msg":"Success", value:stats})
    } catch (error) {
        res.json({"msg":error})
    }
})

patientRoute.get('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        const patient = await patientModel.findById(id);
        res.json({"msg":"Success","value":patient});
    }
    catch(error){
        res.json({"msg":error});
    }
});
const sendMail = async(to,sub,msg)=>{
    try {
        let transport = nodemailer.createTransport({
            service:"gmail",
            auth:{
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            }
            
        });
        await transport.sendMail({
            from:"HealthNexsus",
            to,
            sub,
            html:msg
        });
        console.log("Mail Send Success");
    } catch (error) {
        console.log("Error during mail: ".error);
    }
}

patientRoute.post('',async(req,res)=>{
    try {
        await patientModel.create(req.body);
        await sendMail(
            req.body.email,
            "🎉 Registration Successful - Welcome to HealthNexus! 💚",
            `
            <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f4f9ff; padding: 30px; border-radius: 12px;">
            <div style="text-align: center; padding-bottom: 20px;">
            <h2 style="color: #2a9d8f;">🎉 Welcome to <span style="color:#1d3557;">HealthNexus</span> 💚</h2>
            </div>

            <div style="background-color: #ffffff; padding: 25px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.08);">
            <p style="font-size: 16px; color: #333;">Hi <b>${req.body.name}</b>, 👋</p>

            <p style="font-size: 16px; color: #333;">
                We're thrilled to have you join the <b>HealthNexus</b> community! 🩺  
                Your registration was completed successfully. ✅
            </p>

            <p style="font-size: 15px; color: #555;">
                You can now access all our health services, book appointments, and manage your profile with ease.
            </p>

            <p style="font-size: 15px; color: #555;">
                Thank you for trusting <b>HealthNexus</b>.  
                Stay healthy, stay happy! 🌿😊
            </p>

            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 25px 0;">
            
            <p style="font-size: 14px; color: #666; text-align: center;">
                With care, <br>
                💚 <b>The HealthNexus Team</b>
            </p>
            </div>
            </div>`
            );
            res.json({"msg":"Success"});
        } catch(error){
            res.json({"msg":error});
    }
});
patientRoute.put('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await patientModel.findByIdAndUpdate(id,req.body);
        res.json({"msg":"Success"});
    }catch(error){
        res.json({"msg":error});
    }
});

patientRoute.delete('/:id',async(req,res)=>{
    try{
        const id = req.params.id;
        await patientModel.findByIdAndDelete(id);
        res.json({"msg":"Success"})
    } catch(error){
        res.json({"msg":error})
    }

});

patientRoute.post('/log' ,async(req,res)=>{

    try {
        const {email,password} = req.body;
    const ad = await patientModel.findOne({email});
    if(!ad){
        res.json({ "msg":"Not Found"});
    }
    else{
        if(ad.password == password){
            res.json({"msg": "Success", "id":ad._id});
        }
        else{
            res.json({"msg": "Something Went Wrong"});
        }
    }
    } catch (error) {
        res.json({"msg": error});
    }
})


module.exports = patientRoute;