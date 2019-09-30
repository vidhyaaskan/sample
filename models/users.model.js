const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,

     },
     firstname: {
      type: String,
      required: true,

   },
   lastname: {
      type: String,
      required: true,

   },
     password:{
        type: String,
        required: true,
     }
});

userSchema.path('email').validate((val)=>{
   emailRegex=/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
   return emailRegex.test(val);
},'Invalid email');

mongoose.model('User', userSchema);