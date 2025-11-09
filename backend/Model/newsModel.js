const mongoose = require('mongoose');
const newsSchema = mongoose.Schema({
    title:String,
    desc:String,
    status:{
        type:String,
        default:"u"
    }
},{
    timestamps:true
});

const newsModel = mongoose.model('news',newsSchema);
module.exports = newsModel;