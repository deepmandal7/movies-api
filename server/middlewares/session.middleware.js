const sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        return next();
    } else {
    }
};

module.exports = {
    sessionChecker,
};
