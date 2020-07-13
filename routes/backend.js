var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/pickMovies', function(req, res, next) {
	var inputMovies = req.body.movies;

	var outputMovies = [];

	var l = inputMovies.length;

	if(l == 0) {
		return res.json({ "status": "failed", "message": "No movie to select!" });
	}

	for(var i = 0; i < l; i++) {
		var movie = inputMovies[i];

		if(!movie.name || !movie.start || !movie.end) {
			return res.json({ "status": "failed", "message": "Invalid Input!" });
		}

		var oneDay = 1000 * 60 * 60 * 24;

		var now = new Date(movie.start);
		var yearStart = new Date(now.getFullYear(), 0, 0);
		var diff = (now - yearStart);
		var day = Math.floor(diff / oneDay);
		
		movie.startd = day;

		now = new Date(movie.end);
		yearStart = new Date(now.getFullYear(), 0, 0);
		diff = (now - yearStart);
		day = Math.floor(diff / oneDay);

		movie.endd = day;

		if(movie.startd > movie.endd) {
			return res.json({ "status": "failed", "message": "Invalid Input!" });
		}

		inputMovies[i] = movie;
	}

	var sortedMovies = inputMovies.sort(function (a, b) {
		if(a.startd < b.startd) {
			return -1;
		}
		else if(a.startd > b.startd) {
			return 1;
		}
		else {
			if(a.endd < b.endd) {
				return -1;
			}
			else if(a.endd > b.endd) {
				return 1;
			}
			else {
				return 0;
			}
		}
	});

	outputMovies.push(inputMovies[0]);

	for(var i = 1; i < l; i++) {
		var lastMovie = outputMovies[outputMovies.length - 1];
		var currentMovie = inputMovies[i];

		if(currentMovie.startd > lastMovie.endd) {
			outputMovies.push(currentMovie);
		}
		else {
			if(currentMovie.endd < lastMovie.endd) {
				outputMovies.pop();
				outputMovies.push(currentMovie);
			}
		}
	}

	var amount = outputMovies.length + " Crore";

	return res.json({ "status": "success", "message": "Movies Picked!", "amount": amount, "movies": outputMovies });
});

module.exports = router;
