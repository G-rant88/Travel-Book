module.exports = function(sequelize, DataTypes) {
  var trip = sequelize.define("trip", {
    
    tripName: DataTypes.STRING,
    user: DataTypes.STRING,
    postIds: DataTypes.STRING
  });

  return trip;
};
