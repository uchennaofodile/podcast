const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");

//ROUTES

//GET home
routes.get("/home", function(req, res) {
  res.render("home.ejs");
});

//GET user
routes.get("/home/user", function(req, res) {
  res.render("user.ejs");
});


//POST user
routes.post('/home/record'), function(req,res){
  res.
}

// POST login
routes.post(
  "/user/login",
  passport.authenticate("local", {
    failureRedirect: "/user/login",
    successRedirect: "/home"
  })
);

// GET sign up
routes.get("/user/signup", function(req, res) {
  res.render("registration.ejs");
});

// POST sign up
routes.post(
  "/user/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/home",
    failureRedirect: "/user/signup"
  })
);

//create a server to handle delete request
routes.delete("/delete/:index", function(req, res) {
  db.Tasks.destroy({ where: { id: req.params.index } }).then(function(results) {
    res.redirect("/home");
  });

  res.json(list);
});


module.exports = routes;
