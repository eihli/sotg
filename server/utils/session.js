exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function() {
    req.session.user = newUser;
    res.status(201);
    res.end();
  });
};

exports.destroySession = function(req, res) {
  req.session.destroy(function(err) {
    if(err) {
      res.status(404);
      res.send(err);
    } else {
      res.send(201);
      res.end();
    }
  });
};  

exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user : false;
};

exports.checkUser = function(req, res, next){
  if (!exports.isLoggedIn(req)){
    res.status(403);
    res.end();
  } else {
    next();
  }
};
