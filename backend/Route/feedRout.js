const express = require("express");
const mongoose = require("mongoose");
const feedModel = require("../Model/feedModel.js");
const doctorModel = require("../Model/doctorModel.js");
const patientModel = require("../Model/patientModel.js");

const feedRoute = express.Router();

feedRoute.post("", async (req, res) => {
    try {
        const { uid, utype, type, msg, status } = req.body;

        if (!mongoose.isValidObjectId(uid)) {
        return res.status(400).json({ msg: "Invalid UID format" });
        }

        const feed = new feedModel({ uid, utype, type, msg, status });
        await feed.save();
        res.json({ msg: "Success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    });

    feedRoute.put("/:id", async (req, res) => {
    try {
        await feedModel.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    });

    feedRoute.delete("/:id", async (req, res) => {
    try {
        await feedModel.findByIdAndDelete(req.params.id);
        res.json({ msg: "Success" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    });

    // 🟣 🔥 Unified Route — works for both doctor & patient
    feedRoute.get("/u/:id", async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ msg: "Invalid user ID format" });
        }

        // Detect whether user is a doctor or patient
        let utype = null;
        const doctor = await doctorModel.findById(id);
        if (doctor) utype = "doctor";
        else {
        const patient = await patientModel.findById(id);
        if (patient) utype = "patient";
        }

        if (!utype) {
        return res.status(404).json({ msg: "User not found" });
        }

        const feedbacks = await feedModel.find({ uid: id, utype }).populate("uid");
        res.json({ msg: "Success", value: feedbacks });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
    });

    // 🟤 Get all feedback (admin)
    feedRoute.get("", async (req, res) => {
    try {
        const feed = await feedModel.find().populate("uid");
        res.json({ msg: "Success", value: feed });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
});

module.exports = feedRoute;
