var path = require("path");


module.exports = function(app) {

	app.get("/", function(req, res) {
		res.render('newTripSearch');
	});

	app.get("*", function(req, res) {
		res.render('newTripSearch');
	});

	   app.get("/saved", function(req, res) {
      res.render('savedTrips');
    });

       app.get("/future", function(req, res) {
      res.render('futureTrips');
    });

         app.get("/liked", function(req, res) {
      res.render('favorites');
    });

	  app.get("*", function(req, res) {
      res.render('newTripSearch');

    app.get('/add', function (req, res) {
		res.render('add');	
      // res.sendFile(path.join(__dirname, "../upload.html"));

    });


};