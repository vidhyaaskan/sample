const mongoose = require('mongoose');

var sectionSchema = new mongoose.Schema({
    name: {
        type: String
     },
     templatename:{
         type:String
     },
     category:{
        type:String
    }
});
mongoose.model('Section', sectionSchema);