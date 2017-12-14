var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var PORT = process.env.PORT || 3000;
var db = require("./models");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.use(express.static("public"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



require("./routes/api-routes.js")(app);

require("./routes/html-routes.js")(app);


db.sequelize.sync({force:true}).then(function() {
  app.listen(PORT, function() {
    console.log("Travel App listening on PORT " + PORT);
  });
});