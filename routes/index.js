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

router.post('/register',[
  // username must be an email
  check('email').isEmail(),
  // password must be at least 5 chars long
  // check('password').isLength({ min: 5 }),
  check('name').not().isEmpty(),
  check('password').not().isEmpty(),
  check('lastname').not().isEmpty()
  

], function(req, res){
  const name = req.body.name;
  const email = req.body.email;
  const lastname = req.body.lastname;
  const password = req.body.password;
  const password2 = req.body.password2;


  const errors = validationResult(req);

   if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
    
    let newUser = new User({
      name:name,
      email:email,
      lastname:lastname,
      password:password
    });

    bcrypt.genSalt(10, function(err, salt){
      bcrypt.hash(newUser.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        newUser.password = hash;
        console.log(newUser);
        newUser.save(function(err){
          if(err){
            console.log(err);
            return;
          } else {
           req.flash('success','You are now registered and can log in');
            res.redirect('/');
          }
        });
      });
    });
  
});


module.exports = router;
