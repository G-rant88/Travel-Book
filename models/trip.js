module.exports = function(sequelize, DataTypes) {
  var trip = sequelize.define("trip", {
    
    tripName: DataTypes.STRING,
    user: DataTypes.STRING,
  });

  trip.associate = function(models) {
    trip.belongsTo(models.post, {
      foreignKey: {
        allowNull: false
      }
    });
  }
  return trip;
};
