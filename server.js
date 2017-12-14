var express = require('express');
var exphbs  = require('express-handlebars');
 
var app = express();
var PORT = process.env.PORT || 3000;
 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
 
app.get('/', function (req, res) {
    res.render('newTripSearch');
});
 
app.listen(PORT, function () {
    console.log('App listening on port ' + PORT);
});