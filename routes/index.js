const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");
const authenticate = require("../config/middleware/isauthenticated");
const bodyparser = require("body-parser");

//defines how routes behave

// ROUTES

//GET landing page
routes.get("/", function(req, res) {
  res.render("landing.ejs");
});

// GET user login/profile page
routes.get("/home", authenticate, function(req, res) {
  db.Users.findAll({
    where: { id: req.user.id }
  }).then(function(results) {
    //console.log(results);
    res.render("home.ejs", { /*list: results*/ user: req.user });
  });
});

//GET create recoding
routes.get("/createrec", function(req, res) {
  res.render("createrec.ejs");
});

// POST
routes.post("/home", function(req, res) {
  console.log(req.body.bio);
  db.Users.create({
    bio: req.body.bio,
    userID: req.user.id
  }).then(function(results) {
    console.log(results);
    res.redirect("/home");
  });
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
