const { registerUser, logIn } = require("./auth.controller");
const {
    addMovie,
    getAllMovies,
    updateMovie,
    removeMovie,
} = require("./dashboard.controller");

module.exports = {
    registerUser,
    logIn,
    addMovie,
    getAllMovies,
    updateMovie,
    removeMovie,
};
