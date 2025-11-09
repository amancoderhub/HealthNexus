const mongoose = require('mongoose');

const patientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: String,
        required: true
    },
    altnumber: {
        type: String,
        required: false   
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    bloodgrp: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "u"
    }
}, { timestamps: true });

const patientModel = mongoose.model("patient", patientSchema);

module.exports = patientModel;
