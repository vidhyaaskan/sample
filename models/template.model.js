const mongoose = require('mongoose');

var templateSchema = new mongoose.Schema({
    name: {
        type: String
     }
});
mongoose.model('Template', templateSchema);