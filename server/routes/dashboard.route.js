const router = require("express").Router();

const {
    addMovie,
    getAllMovies,
    updateMovie,
    removeMovie,
} = require("../controllers");

router.post("/", addMovie);
router.get("/", getAllMovies);
router.put("/:movie_id", updateMovie);
router.delete("/", removeMovie);

module.exports = router;
