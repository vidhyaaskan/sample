var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const fieldtype = mongoose.model('Fieldtype');
const Section = mongoose.model('Section');
const templates = mongoose.model('Template');

/* GET home page. */
 router.get('/', async(req, res, next)  => {
  let sections = await Section.find((err, docs) => {
    return docs;
   });

    console.log(sections);
    res.render('home', { sections:sections });

  });
 

module.exports = router;
