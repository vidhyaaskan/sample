const mongoose = require('mongoose');

var subfieldSchema = new mongoose.Schema({
    section: {
        type: String
     },
     field_name:{
         type:String
     },
     field_type:{
        type:String
    },
    req_field:{
        type:String
    },
    default_value:{
        type:String
    },
    place_value:{
        type:String
    }

});
mongoose.model('Subfield', subfieldSchema);