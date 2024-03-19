const mongoose = require('mongoose');
const { Schema } = mongoose;
const notesSchema = new Schema ({
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User' // Assuming your user model is named 'User'
    },
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    tag : {
        type : String,
        default : 'General'
    },
    date : {
        type : Date,
        default : Date.now
    }
});

module.exports = mongoose.model('Note', notesSchema);