module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define("post", {
    
    country: {type:DataTypes.STRING, allowNull:false},
    city: {type:DataTypes.STRING, allowNull:false},
    review: {type:DataTypes.TEXT, allowNull:false},
    image: DataTypes.STRING,
    price: {type: DataTypes.DECIMAL, defaultValue: 1}
    
  });

post.associate = function(models) {
    post.belongsToMany(models.user, {
      through: "post2user"
    });
  };

  return post;
};
