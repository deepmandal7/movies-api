const sessionChecker = (req, res, next) => {
    console.log("sesson ---------", req.session.user);
    console.log("cookies ---------", JSON.stringify(req.cookies));
    if (req.session.user && req.cookies.user_sid) {
        return next();
    } else {
    }
};

module.exports = {
    sessionChecker,
};
