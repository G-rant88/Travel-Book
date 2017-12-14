module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define("user", {
    
    username: {type:DataTypes.STRING, allowNull:false},
    password: {type:DataTypes.STRING, allowNull:false},
    loggedIn: {type:DataTypes.BOOLEAN, defaultValue:false},

  });

user.associate = function(models) {
    
    user.belongsToMany(models.post, {
      through: "post2user"
    });
  };

  return user;
};
