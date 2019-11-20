//middleware that restricts user access

module.exports = function(req, res, next) {
  //if the user is a user allow them to access whatever route they are heading to
  if (req.user || req.session.user) {
    return next(); //next means continue doing
  }

  //if there is no user is logged in redirect them to login

  return res.redirect("/user/login");
};
