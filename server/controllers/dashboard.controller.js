const catchAsync = require("../utilities/catchAsync");
const {
    addMovie: create,
    getAllMovies: getAll,
    updateMovie: update,
} = require("../services");

const addMovie = catchAsync(async (req, res, next) => {
    const response = await create(req.body, req.session.user.email);
    if (response === 1) {
        res.redirect("/dashboard");
    }
});
const getAllMovies = catchAsync(async (req, res, next) => {
    const response = await getAll(req.session.user);
    console.log(response);
    if (response.length) {
        res.movies = response;
    }
    console.log(res.movies);
    res.redirect("/dashboard");
});
const updateMovie = catchAsync(async (req, res, next) => {
    const response = await update(req.params);
    console.log(response);
    if (response.length) {
        res.movies = response;
    }
    console.log(res.movies);
    res.redirect("/dashboard");
});
const removeMovie = catchAsync(async (req, res, next) => {});

module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
    removeMovie,
};
