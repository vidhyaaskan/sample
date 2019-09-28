const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
 
    // Local Strategy
    passport.use(new LocalStrategy(function(email, password, done){
      // Match Username
      console.log(email,password);
 
      let query = {email:email};
      User.findOne(query, function(err, user){
 
        if(err) throw err;
        if(!user){
          return done(null, false, {message: 'No user found'});
        }
  
        // Match Password
        bcrypt.compare(password, user.password, function(err, isMatch){
          console.log('matchfound');
          if(err) throw err;
          if(isMatch){
            return done(null, user);
          } else {
            return done(null, false, {message: 'Wrong password'});
          }
        });
      });
    }));
  
    passport.serializeUser(function(user, done) {

      done(null, user._id);
    });
  
    passport.deserializeUser(function(id, done) {
      User.findById(id, function(err, user) {
        done(err, user);
      });
    });
  }

// const LocalStrategy = require('passport-local').Strategy
// const bcrypt = require('bcrypt')

// function initialize(passport, getUserByEmail, getUserById) {
//   const authenticateUser = async (email, password, done) => {
//     const user = getUserByEmail(email)
//     if (user == null) {
//       return done(null, false, { message: 'No user with that email' })
//     }

//     try {
//       if (await bcrypt.compare(password, user.password)) {
//         return done(null, user)
//       } else {
//         return done(null, false, { message: 'Password incorrect' })
//       }
//     } catch (e) {
//       return done(e)
//     }
//   }

//   passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
//   passport.serializeUser((user, done) => done(null, user.id))
//   passport.deserializeUser((id, done) => {
//     return done(null, getUserById(id))
//   })
// }

// module.exports = initialize