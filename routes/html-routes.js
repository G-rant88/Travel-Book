var path = require("path");


module.exports = function(app) {

	  app.get("/", function(req, res) {
      res.render('newTripSearch');
    });

	  app.get("/logins", function(req, res) {
      res.render("login");
    });

	  app.get("*", function(req, res) {
      res.render('newTripSearch');
    });

	};