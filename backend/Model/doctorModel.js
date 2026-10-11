const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const doctorSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    number: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    gender:{
        type:String,
        require:true
    },
    qua:{
        type:String,
        required:true
    },
    exp:{
        type:String,
        required:true
    },
    spe:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:'u'
    }

},{
    timestamps :true
});

doctorSchema.pre("save", async function hashPasswordBeforeSave(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const doctorModel = mongoose.model('doctor',doctorSchema);

module.exports = doctorModel;
