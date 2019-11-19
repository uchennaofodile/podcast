const express = require("express");

const db = require("./models");

const routes = require("./routes");

const passport = require("./config/passport");

const session = require("express-session");

const app = express();

// middleware
app.set("view engine", "ejs");

app.use(express.static("./public"));

// routing manager
app.use(routes);

db.sequelize.sync().then(function() {
  app.listen(3000, function(err) {
    if (err) console.log(err);
    console.log("API up and running");
  });
});
