//create a model for our task
const bycrpt = require("bcryptjs");

//create a table for users

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Recordings", {
    //define columns of our table
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false, //user must have email
      unique: true //email must be unique
    },
    recording: {
      type: DataTypes.CHAR,
      allowNull: false
    },

    title: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.CHAR
    },
    image: {
      type: DataTypes.CHAR,
      allowNull: false
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
