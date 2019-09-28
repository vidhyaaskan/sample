var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Fieldtype = mongoose.model('Fieldtype');
const Section = mongoose.model('Section');
const templates = mongoose.model('Template');
const Category = mongoose.model('Category');
/* GET home page. */
 router.get('/', async(req, res, next) => {

  let sections = await Section.find((err, docs) => {
    return docs;
  });
  let fieldtype = await Fieldtype.find((err, docs) =>{
    return docs;
  });

 let template = await templates.find((err, docs) => {
  return docs;
});
let category= await Category.find((err,docs) => {
  return docs;
});
  res.render('template/create', { 
    sections:sections || [],template:template,fieldtype:fieldtype,category:category,tempsection:[]
    });
  });
 
  router.post('/sections', function(req, res, next){
    var section = new Section();
    section.name  = req.body.section;
    section.templatename = req.body.templatename;
    section.category = req.body.category;
    
  if(req.body.sec_id == '')
     _secInsert(section,res);
      else
     _secUpdate(section,res,req.body.sec_id,req);
 });

 function _secInsert(section,res) {
  let tempname=section.templatename;
  let tempcate=section.category;
  section.save((err, doc) => {
      if(!err){
          Section.find({templatename:tempname,category:tempcate}, function(err,document){
             res.send({ tempsection:document || [] });
            });
          
         } 
    });
}
 function _secUpdate(section1,res,id,req){
  let tempname=section1.templatename;
  let tempcate=section1.category;
     Section.update({ _id: req.body.sec_id }, {name: section1.name,templatename:section1.templatename,category:section1.category}, (err, doc) => {
    if (!err) { 
      Section.find({templatename:tempname,category:tempcate}, function(err, document) {
           res.send({ tempsection:document || [] });
        });
    }
    });
  }
module.exports = router;
