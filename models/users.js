//create a model for our task
const bycrpt = require("bcryptjs");

//create a table for users

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    //define columns of our table
    email: {
      type: DataTypes.STRING,
      allowNull: false, //user must have email
      unique: true, //email must be unique
      validate: {
        isEmail: true //email must be valid
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.CHAR,
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    image: {
      type: DataTypes.CHAR,
      allowNull: true
    }
  });

  // create custom methods for our user model

  User.prototype.verifyPassword = function(password) {
    return bycrpt.compareSync(password, this.password);
  };

  // hooks happen on specific scenarios

  // encrypting user passwords

  User.addHook("beforeCreate", function(user) {
    user.password = bycrpt.hashSync(
      user.password,
      bycrpt.genSaltSync(10),
      null
    );
  });

  return User;
};
