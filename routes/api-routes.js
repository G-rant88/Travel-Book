var db = require("../models");

module.exports = function(app) {

  app.post("/signup", function(req, res) {

  	db.user.create({

  		username: req.body.users,
      	password: req.body.pws

  	}).then(function(results){

  		console.log("user added");
  		console.log(results);

  		res.end();
  	});
  });

    app.get("/login", function(req, res) {

  	db.user.findAll({}).then(function(results){

  		console.log("found user data");
  		console.log(results);

  		res.json(results);
  	});

  });

 app.get("/search/:country/:city/:thing", function(req, res) {

  	db.post.findAll({

  		where:{
  			country: req.params.country,
  			city: req.params.city,
  			thing: req.params.thing
  		}

  	}).then(function(results){

  		console.log("found posts");
  		console.log(results);

  		res.render("result", results);
  	});

  });

  app.post("/add", function(req, res) {

  	db.post.create({

  		country: req.body.country,
  		city: req.body.city,
  		review: req.body.review,
  		thing: req.body.thing,
  		image: req.body.image,
  		price: req.body.price,
  		rating: req.body.rating

  	}).then(function(results){

  		console.log("added post");
  		console.log(results);

  		res.json(results);
  	});

  });


};



  

