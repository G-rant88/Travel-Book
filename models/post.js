module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
    
    country: {type:DataTypes.STRING, allowNull:false},
    city: {type:DataTypes.STRING, allowNull:false},
    name: {type:DataTypes.STRING, allowNull:false},
    review: {type:DataTypes.TEXT, allowNull:false},
    categories: {type:DataTypes.STRING, allowNull:false},
    image: DataTypes.STRING,
    price: {type: DataTypes.INTEGER, defaultValue: 2, len: [1,3]},
    rating: {type: DataTypes.INTEGER, defaultValue: 3, len: [1,5]}
    
  });

post.associate = function(models) {
    post.belongsTo(models.user, {
      foreignKey: {
        allowNull: false
      }
    });
    post.hasMany(models.trip, {
      foreignKey: {
        allowNull: false
      }
    });
}

  return post;
};
