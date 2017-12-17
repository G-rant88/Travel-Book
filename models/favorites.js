
module.exports = function(sequelize, DataTypes) {
  var favorite = sequelize.define("favorite", {

  	user: DataTypes.STRING,
  	country: DataTypes.STRING,
  	city: DataTypes.STRING,
  	place: DataTypes.STRING,
  	price: DataTypes.STRING,
  	rating: DataTypes.STRING,
  	category: DataTypes.STRING,
    review: DataTypes.TEXT,
    image: DataTypes.STRING 

  });

return favorite;

  };
