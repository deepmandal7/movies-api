const pool = require("../../config/database");

const addMovie = async (body, email) => {
    const { movie_name, rating, movie_cast, genre, release_date } = body;
    console.log("here");
    const response = await pool
        .query("select * from add_movie($1, $2, $3, $4, $5, $6)", [
            movie_name,
            rating,
            Array.isArray(movie_cast) ? movie_cast : movie_cast.split(", "),
            genre,
            release_date,
            email,
        ])
        .catch((err) => {
            console.log(err);
        });
    return response.rowCount;
};

const getAllMovies = async (params) => {
    console.log("here");
    const response = await pool
        .query("select * from get_all_movies($1)", [params.email])
        .catch((err) => {
            console.log(err);
        });
    return response.rows;
};

const updateMovie = async (params, body) => {
    console.log("here");
    const response = await pool
        .query("select * from update_movie($1, $2, $3, $4, $5, $6)", [
            params.movie_id,
            body.movie_name,
            body.rating,
            body.movie_cast,
            body.genre,
            body.release_date,
        ])
        .catch((err) => {
            console.log(err);
        });
    return response.rowCount;
};

const deleteMovie = async (params) => {
    console.log("here");
    const response = await pool
        .query("select * from delete_movie($1)", [params.movie_id])
        .catch((err) => {
            console.log(err);
        });
    return response.rowCount;
};
module.exports = {
    addMovie,
    getAllMovies,
    updateMovie,
};
