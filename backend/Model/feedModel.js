const mongoose = require('mongoose');

const feedSchema = new mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "utype",
        required: true
    },
    utype: {
        type: String,
        required: true,
        enum: ['doctor', 'patient']
    },
    type: String,
    msg: String,
    status: String
});

const feedModel = mongoose.model('feedback', feedSchema);
module.exports = feedModel;
