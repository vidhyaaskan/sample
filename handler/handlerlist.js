
var hbs = require('hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
    return a == b  ? 'id="defaultOpen"' : '';
});

hbs.registerHelper('if_selected', function(value,value2) {
    return value === value2 ? 'selected' : '';
  });

module.exports=hbs;