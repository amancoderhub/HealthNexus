const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const adminSchema = mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String
    }
});
adminSchema.pre("save", async function hashPasswordBeforeSave(next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

const adminModel = mongoose.model('admin',adminSchema);
module.exports = adminModel;
