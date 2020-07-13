var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/pickMovies', function(req, res, next) {
  var inputMovies = req.body.movies;

  console.log(inputMovies);

  var outputMovies = inputMovies;

  return res.json({ "status": "success", "message": "Movies Picked!", "movies": outputMovies });
});

module.exports = router;
