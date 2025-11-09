const express = require('express');
const appModel = require('../Model/appModel');
const appRoute = express.Router();


appRoute.post('', async (req, res) => {
    try {
        await appModel.create(req.body);
        res.json({ msg: "Success" });
    } catch (error) {
        res.json({ msg: error.message });
    }
});

appRoute.get('', async (req, res) => {
    try {
        const apps = await appModel.find()
            .populate("pid")   
            .populate("did");  

        res.json({ "msg": "Success", "value": apps });
    } catch (error) {
        res.json({ msg: error.message });
    }
});

appRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await appModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ "msg": "Success" });
    } catch (error) {
        res.json({ "msg": error });
    }
});

// Complete appointment
appRoute.put('/:id/complete', async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await appModel.findByIdAndUpdate(
            id,
            { status: "completed" },
            { new: true }
        );
        res.json({ msg: "Appointment completed", value: updated });
    } catch (error) {
        res.json({ msg: error.message });
    }
});


appRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await appModel.findByIdAndDelete(id);
        res.json({ "msg": "Success" });
    } catch (error) {
        res.json({ "msg": error });
    }
});

appRoute.get('/p/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const apps = await appModel.find({ pid: id })
            .populate("pid")
            .populate("did");

        res.json({ "msg": "Success", "value": apps });
    } catch (error) {
        res.json({ "msg": error });
    }
});

appRoute.get('/d/:did', async (req, res) => {
    try {
        const did = req.params.did;
        const apps = await appModel.find({ did: did })
            .populate("pid")
            .populate("did");

        res.json({ "msg": "Success", "value": apps });
    } catch (error) {
        res.json({ "msg": error });
    }
});

appRoute.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const app = await appModel.findById(id)
            .populate("pid")
            .populate("did");

        res.json({ "msg": "Success", "value": app });
    } catch (error) {
        res.json({ "msg": error });
    }
});

module.exports = appRoute;
