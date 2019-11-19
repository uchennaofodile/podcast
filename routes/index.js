const express = require("express");
const db = require("../models");
const routes = express.Router();
const passport = require("../config/passport");

//ROUTES

//GET home
routes.get("/home", function(req, res) {
  res.render("home.ejs");
});

//POST
routes.post("");
