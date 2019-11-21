const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isauthenticated");

//defines how routes behave

// ROUTES
// GET home
routes.get("/home", authenticate, function(req, res) {
  db.Users.findAll({
    where: { userID: req.user.id }
  }).then(function(results) {
    //console.log(results);
    res.render("home.ejs", { /*list: results*/ user: req.user });
  });
});

// POST
routes.post("/profile_update", function(req, res) {
  db.Users.create({
    userID: req.user.image
  }).then(function(results) {});
});

// ROUTES: users

// GET login

routes.get("/user/login", function(req, res) {
  res.render("login");
});

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

//

//create a server to handle delete request
routes.delete("/delete/:index", function(req, res) {
  db.Tasks.destroy({ where: { id: req.params.index } }).then(function(results) {
    res.redirect("/home");
  });

  res.json(list);
});

//GET profile
routes.get("/profile", authenticate, function(req, res) {
  res.render("profile", { user: req.user });
});

//GET logout
routes.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/home");
});

module.exports = routes;
