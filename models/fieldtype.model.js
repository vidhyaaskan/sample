const mongoose = require('mongoose');

var fiedltypeSchema = new mongoose.Schema({
    name: {
        type: String
     
    },
    icon:{
        type: String
    }
});
mongoose.model('Fieldtype', fiedltypeSchema);