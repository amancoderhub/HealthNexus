const mongoose = require('mongoose');
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

const doctorModel = mongoose.model('doctor',doctorSchema);

module.exports = doctorModel;