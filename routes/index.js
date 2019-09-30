var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const { check, validationResult } = require('express-validator');

/* GET home page. */
 router.get('/', function(req, res, next) {
    res.render('index', {  username:"User Name",
    pwd: "Password",
    remember: "Remember Me",
    forgot: "Forget Password?",
    login: "Log in",
    sign: "Sign Up",
    que: "Don't have an account?" 
  });
 });

router.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/home',
    failureRedirect:'/',
   failureFlash: true
  })(req, res, next);
});

router.get('/register', function(req, res, next) {
  res.render('register');
 });

 router.post('/register',[
  check('firstname').not().isEmpty().withMessage('First Name field is required'),
  check('lastname').not().isEmpty().withMessage('Lastname field is required'),
  check('email').isEmail().withMessage('email field is required'),
  check('password').isLength({ min: 6 }).withMessage('Password Must be at least 5 chars long and Requried'),
  check('confirmpassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    return true;
  }),
], (request, response) => {
 const errors = validationResult(request);
  if (!errors.isEmpty()) {   
   let  errmsg = {"firstnameError":"","lastnameError":"","emailError":"","passwordError":"","confirmpasswordError":""};
   let fiObj = Object.assign(request.body,errmsg);
    handleValidationError(errors,fiObj);
    response.render("register",{register:fiObj});
  }else{
  request.body.password = bcrypt.hashSync(request.body.password, 10);
  var user = new User(request.body);
  var result =  user.save();
  response.redirect('/');
  }
});

function handleValidationError(err,body) { 
    for (field in err.errors) { 
       switch (err.errors[field].param) {
            case 'firstname': body.firstnameError = err.errors[field].msg; 
            break; 
            case 'lastname': body.lastnameError = err.errors[field].msg;  
            break; 
            case 'email': body.emailError = err.errors[field].msg; 
             break;
             case 'password' : body.passwordError = err.errors[field].msg; 
             break;
             case 'confirmpassword': body.confirmpasswordError = err.errors[field].msg; 
             break;
              default: 
              break; 
           }
        }}
module.exports = router;
