
module.exports = function(app) {

	app.get("/", function(req, res) {
		res.render('newTripSearch');
	});

	app.get('/add', function(req, res) {
		res.render('add');
	});


	app.get("/country/:country", function(req, res) {
		var cities = require('countries-cities').getCities(req.params.country);
		cities.sort();
		res.json(cities)
	});

	app.get("*", function(req, res) {
		res.render('newTripSearch');
	});

};