
var hbs = require('hbs');

hbs.registerHelper('if_eq', function(a, b, opts) {
    if (a == b) {
        return  'id="defaultOpen"';
    } else {
        return '';
    }
});

module.exports=hbs;