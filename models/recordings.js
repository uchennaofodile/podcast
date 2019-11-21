//create a model for our task
const bycrpt = require("bcryptjs");

//create a table for users

//exporting this model to our index
module.exports = function(sequelize, DataTypes) {
  var Recordings = sequelize.define("Recordings", {
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

  return Recordings;
};
