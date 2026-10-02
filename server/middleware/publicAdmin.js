const publicAdminMiddleware = (req, res, next) => {
  req.user = { id: 0, role: 'admin', access: 'public-admin-portal' };
  next();
};

module.exports = publicAdminMiddleware;