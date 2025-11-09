const express = require('express');
const newsModel = require('../Model/newsModel');
const newsRoute = express.Router();

newsRoute.get('', async (req, res) => {
    try {
        const news = await newsModel.find();
        res.json({ msg: "Success", value: news });
    } catch (error) {
        res.status(500).json({ msg: "Error", error: error.message });
    }
});

newsRoute.post('', async (req, res) => {
    try {
        const news = await newsModel.create(req.body);
        res.status(201).json({ msg: "Success", data: news });
    } catch (error) {
        console.error("Error while adding news:", error.message);
        res.status(500).json({ msg: "Error", error: error.message });
    }
});

newsRoute.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updated = await newsModel.findByIdAndUpdate(id, req.body, { new: true });
        res.json({ msg: "Success", data: updated });
    } catch (error) {
        res.status(500).json({ msg: "Error", error: error.message });
    }
});

newsRoute.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await newsModel.findByIdAndDelete(id);
        res.json({ msg: "Success" });
    } catch (error) {
        res.status(500).json({ msg: "Error", error: error.message });
    }
});

module.exports = newsRoute;
