const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

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

patientSchema.pre("save", async function hashPasswordBeforeSave(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const patientModel = mongoose.model("patient", patientSchema);

module.exports = patientModel;
