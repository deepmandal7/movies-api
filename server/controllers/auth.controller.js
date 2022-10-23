const catchAsync = require("../utilities/catchAsync");
const {
    generatePassword,
    validatePassword,
} = require("../utilities/passwordUtilities");
const pool = require("../../config/database");

const registerUser = catchAsync(async (req, res, next) => {
    console.log("session ---------", req.session.user);
    console.log("cookies ---------", JSON.stringify(req.cookies));
    const { email, password } = req.body;
    const user = await pool.query("select * from find_user_by_email($1)", [
        email,
    ]);
    if (user.rowCount) {
        res.error = "User already exists";
        return next(500);
    }
    const saltHash = generatePassword(password);
    const response = await pool.query("select * from create_user($1, $2, $3)", [
        email,
        saltHash.salt,
        saltHash.hash,
    ]);
    console.log(response.rows);
    if (response.rowCount) {
        req.session.user = { email: response.rows[0].create_user };
        res.redirect("/dashboard");
    }
});

const logIn = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    console.log(email);
    const user = await pool.query("select * from find_user_by_email($1)", [
        email,
    ]);
    console.log(user);
    if (user.rowCount) {
        const isValid = validatePassword(
            password,
            user.rows[0].hash,
            user.rows[0].salt
        );
        if (isValid) {
            console.log("logged in");
            req.session.user = { email };
            res.redirect("/dashboard");
        }
    }
    res.error = "Incorrect email/password";
    return next(500);
});

module.exports = {
    registerUser,
    logIn,
};
