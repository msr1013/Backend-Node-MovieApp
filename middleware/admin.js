module.exports = function (req, res, next) {
  //401 Unauthorized
  //403 frobidden
  if (!req.user.isAdmin) return res.status(403).send("Access Denied");
  next();
};
