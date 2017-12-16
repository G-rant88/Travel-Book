var path = require("path");


module.exports = function(app) {


  app.get("/", function(req, res) {
    res.render('newTripSearch');
  });

  app.get('/add', function(req, res) {
    res.render('add');
  });

  app.get("*", function(req, res) {
    res.render('newTripSearch');

  });


};