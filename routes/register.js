var express = require('express');
var router = express.Router();

/* GET home page. */
 router.get('/', function(req, res, next) {
    res.render('register', { 
    firstname:"First Name",
    lastname: "Last Name",
    email: "Email",
    pwd: "Password",
    cnspwd: "Confirm Password",
    agree: "I agree to the Terms of User",
    signup: "Sing Up",
    back: "Back",
    });
  });
 

module.exports = router;
