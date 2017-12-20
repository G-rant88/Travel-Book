var aws = require('aws-sdk'),
  multer = require('multer'),
  multerS3 = require('multer-s3');

aws.config.update({
  secretAccessKey: process.env.S3_SECRET_KEY || require("../key.js").secretAccessKey,
  accessKeyId: process.env.S3_ACCESS_KEY || require("../key.js").accessKeyId,
  region: 'us-west-1'
});

var s3 = new aws.S3();

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'travelbookpictures',
    key: function(req, file, cb) {
      // console.log(file.originalname);
      cb(null, file.originalname); //use Date.now() for unique file keys
    }
  })
});

var db = require("../models");

module.exports = function(app) {

  app.post("/signup", function(req, res) {

    db.user.create({

      username: req.body.users,
      password: req.body.pws

    }).then(function(results) {

      console.log("user added");
      console.log(results);

      res.end();
    });
  });

  app.get("/login", function(req, res) {

    db.user.findAll({}).then(function(results) {

      // console.log("found user data");
      // console.log(results);

      res.json(results);
    });

  });

  app.get("/search/:country/:city/:categories", function(req, res) {

    db.post.findAll({

      where: {
        country: req.params.country,
        city: req.params.city,
        categories: req.params.categories,
      },
      include: [db.user]

    }).then(function(results) {

      // console.log(results);
      var data = {
        daty: results,
        city: req.params.city,
        country: req.params.country
      }

      console.log(data.daty);

      res.render("result", {
        data
      });
    });

  });

  app.post("/add", upload.array('upl', 1), function(req, res) {
    var user = req.body.user;
    db.user.findOne({
      where: {
        username: req.body.user
      }
    }).then(function(results) {

      db.post.create({
        image: req.files[0].originalname,
        country: req.body.countryC,
        city: req.body.cityC,
        review: req.body.review,
        name: req.body.place,
        categories: req.body.category,
        price: parseInt(req.body.pricepoint),
        rating: parseInt(req.body.rating),
        userId: results.id

      }).then(function(results) {

        console.log(results.dataValues);

        res.redirect("/saved/" + user);
      });

    });

  });


  app.put("/loggedin", function(req, res) {

    db.user.update({

      loggedIn: true
    }, {

      where: {

        id: req.body.info
      }

    }).then(function(results) {

      res.end();

    });
  });

  app.get("/friends/:user", function(req, res) {



    db.user.findAll({

      where: {

        username: req.params.user
      },
      include: [db.post]

    }).then(function(results) {

      var friends = results[0].friends;


      if (friends === null) {

        db.user.findAll({})

          .then(function(res2) {

            var data = {

              names: res2

            }
            // console.log(data);

            res.render("userSearch", {
              data
            })

          });
      }

      var friendsList = friends.split(",");
      var availableFriends = friends.split(",");
      availableFriends.push(results[0].username);


      var friends = friendsList.map(function(names) {

        var rObj = {};

        rObj.name = names;
        return rObj;

      });


      db.user.findAll({
          where: {
            username: {
              $notIn: availableFriends
            }
          }
        })

        .then(function(res2) {


          var data = {

            daty: friends,
            names: res2

          }

          res.render("userSearch", {
            data
          })
        })

    })

  });



  app.get("/saved/:user", function(req, res) {

    db.user.findAll({
      where: {
        username: req.params.user
      },
      include: [db.post]
    }).then(function(results) {

      var userPost = {
        data: results[0].dataValues.posts
      }

      res.render('travelBooks', {
        userPost
      });

    });

  });

  var Promise = require("bluebird");

  app.get('/future/:user/:trip', function(req, res) {
    var username = req.params.user;
    var tripName = req.params.trip;


    db.trip.findOne({

      where: {
        tripName: tripName
      }

    }).then(function(results) {

      var postIds = results.postIds.split(', ');
      var postInfo = [];
      var data = {
        tripPosts: null
      };

      Promise.map(postIds, function(postId) {
        var postIdInt = parseInt(postId);
        return db.post.findOne({
          where: {
            id: postIdInt
          }
        }).then(function(result) {
          postInfo.push(result);
          data.tripPosts = postInfo;
        });
      }).then(function() {
        res.send(data);
      });

    })
  });

  app.get("/future/:user", function(req, res) {

    var username = req.params.user;
    console.log(username);
    db.trip.findAll({

      where: {
        user: username
      },
      // include: [db.post]

    }).then(function(results) {
      //console.log(results[0].postIds.split(', '));

      var data = {
        // results is an array of all trips from user
        daty: results,
        user: username
      }

      res.render('futureTrips', {
        data
      });
    });

  });


  app.post("/add/trip", function(req, res) {



    db.trip.create({

        tripName: req.body.trip,
        user: req.body.user,
        postIds: req.body.results

      })
      .then(function(results2) {
        res.end();
      })

  });

  app.get("/edit/:user/:id", function(req, res) {

    db.post.findAll({
      where: {
        id: req.params.id
      },
    }).then(function(results) {

      var userPost = {
        data: results[0].dataValues
      }
      console.log(userPost);

      res.render('updatePost', userPost);

    });

  });


  app.delete("/deltrip", function(req, res) {


    db.trip.destroy({

      where: {

        user: req.body.user,
        tripName: req.body.trip
      }

    })

    res.end();

  });

  app.delete("/delpost", function(req, res) {


    console.log(req.body.id);

    var ids = JSON.parse(req.body.id);

    db.post.destroy({

      where: {

        id: ids
      }

    })

    res.end();

  });

  app.put("/update/:id", function(req, res) {

    console.log(req.body)

    db.post.update({
      name: req.body.name,
      city: req.body.city,
      country: req.body.country,
      categories: req.body.categories,
      rating: parseInt(req.body.rating),
      price: parseInt(req.body.price),
      review: req.body.review
    }, {
      where: {
        id: parseInt(req.params.id)
      }
    }).then(function(data) {
      res.end();
    })
  });



  app.get("/posts/:user", function(req, res) {

    var username = req.params.user

    db.user.findAll({
      where: {
        username: req.params.user
      },
      include: [db.post]
    }).then(function(results) {



      var userPost = {
        data: results[0].dataValues.posts,
        user: username
      }

      // console.log(results[0].username);
      // console.log(userPost.user);

      res.render('userposts', {
        userPost
      });

    });

  });

  app.get("/book/:user", function(req, res) {

    var username = req.params.user;
    console.log(username);
    db.trip.findAll({

      where: {
        user: username
      },
      // include: [db.post]

    }).then(function(results) {
      //console.log(results[0].postIds.split(', '));

      var data = {
        // results is an array of all trips from user
        daty: results,
        user: username
      }

      res.render('userbook', {
        data
      });
    });
  });

  app.put("/friend", function(req, res) {

    console.log(req.body.new);

    db.user.findAll({

      where: {

        username: req.body.user

      }


    }).then(function(results) {

      var friends = results[0].friends;

      console.log(friends);

      if (friends === null) {

        var friendsList = [];

        friendsList.push(req.body.new);

      } else {

        var friendsList = friends.split();

        friendsList.push(req.body.new);

      }

      var newList = friendsList.toString();

      console.log(newList);

      db.user.update({

        friends: newList
      }, {
        where: {

          username: req.body.user

        }
      })

    });

    res.end();
  });


  app.put("/delfriend", function(req, res) {


    // console.log(req.body);


    db.user.findAll({

      where: {

        username: req.body.user
      }

    }).then(function(results) {

      var friends = results[0].friends;

      // console.log(friends);

      var friendsList = friends.split(",");

      // console.log(friendsList);

      // for (var i = 0; i < friendsList.length; i++) {

      // console.log(friendsList[i]);
      // console.log(req.body.friend);

      // if (friendsList[i] === req.body.friend) {


      var number = friendsList.indexOf(req.body.friend);
      console.log(number);

      friendsList.splice(number, 1);
      // }

      // }

      var newList = friendsList.toString();

      console.log(newList);

      db.user.update({

        friends: newList

      }, {
        where: {

          username: req.body.user

        }
      })

    });

    res.end();
  });


  app.post("/update/trip", function(req, res) {

    console.log(req.body.trip);
    console.log(req.body.user);

    db.trip.findAll({

      where: {

        user: req.body.user,
        tripName: req.body.trip
      }
    }).then(function(results) {

      console.log(results[0]);

      console.log(results[0].postIds);

      var posts = results[0].postIds

      postList = posts.split(", ");

      console.log(postList);

      for (var i = 0; i < req.body.results.length; i++) {


        postList.push(req.body.results[i]);
      }

      var newList = postList.join(", ");

      console.log(newList);

      db.trip.update({

        postIds: newList
      }, {

        where: {

          user: req.body.user,
          tripName: req.body.trip
        }
      });

      res.end();
    });

  });


  app.get("/get/trip", function(req, res) {

    db.trip.findAll({}).then(function(results) {

      res.json(results);


    });

  });

};