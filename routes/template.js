var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Fieldtype = mongoose.model('Fieldtype');
const Section = mongoose.model('Section');
const templates = mongoose.model('Template');
const Category = mongoose.model('Category');
const Subfield = mongoose.model('Subfield');
 let  _Field_type = require('../custom/fields');
 let fin_fields= _Field_type.fi;


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
    sections:sections || [],template:template,fieldtype:fieldtype,category:category,tempsection:[],Fields:fin_fields
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

 router.post('/subfields',function(req, res, next){
   
   var subfield = new Subfield();
   subfield.section = req.body.section_id;
   subfield.field_name  = req.body.field_name;
   subfield.field_type = req.body.field_type;
   subfield.req_field  = req.body.required_field;
   subfield.default_value  = req.body.default_value;
   subfield.place_value  = req.body.place_value;
   subfield.save((err, doc) => {
     
    });

 });
 router.get('/sections', function(req, res, next){
  let tempname = req.query.templatename;let tempcate=req.query.category;
    Section.find({templatename:tempname,category:tempcate}, function(err,document){res.send({ tempsection:document || [] ,sections:document});});
 });

 function _secInsert(section,res){
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
