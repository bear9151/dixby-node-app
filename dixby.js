// Initial Global Variables

var fs = require('fs'),
    request = require('request'),
    twitter = require('twitter'),
	myKeys = require("./keys.js"),
    spotify = require('spotify'),
    chalk = require('chalk'),
    keyList = myKeys.twitterKeys,
    firstInput = process.argv[2],
    secondInput = process.argv[3],
    tweetRequest = "my-tweets",
    songRequest = "spotify-this-song",
    movieRequest = "movie-this",
    commandRequest = "do-what-it-says",
    login = {screen_name: 'bear9151', count: 20},
    client = new twitter(keyList);

// Function to write tweets
function getTweets() {
	client.get('statuses/user_timeline', login, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < 20; i++) {
	    	console.log("--------------------------------------------")
	    	console.log(tweets[i].created_at + " | " + tweets[i].text);
	    }
	  } else {
	  	throw Error;
	  }
	});
};

// Function to get Spotify song
function getSong() {
	if (secondInput === undefined) {
		secondInput = "The Sign Ace of Base";
	};
	spotify.search({type: 'track', query: secondInput, limit: 1}, function (error, data) {
		if (error) {
			throw Error;
		} else {
			console.log("--------------------------------------------")
			console.log(chalk.bold("ARTIST(S) | ") + data.tracks.items[0].album.artists[0].name);
			console.log(chalk.bold("TITLE | ") + data.tracks.items[0].name);
			console.log(chalk.bold("LINK | ") + chalk.blue.underline(data.tracks.items[0].preview_url));
			console.log(chalk.bold("ALBUM | ") + data.tracks.items[0].album.name);
			console.log("--------------------------------------------")
		};
	});
};

// Function to get Movie
function getMovie() {
	if (secondInput === undefined) {
		secondInput = "MrNobody";
	};
	var queryUrl = 'http://www.omdbapi.com/?t=' + secondInput + '&tomatoes=true';
	request(queryUrl, function (error, response, dataRaw) {
		var data = JSON.parse(dataRaw)
		if (error) {
			throw Error;
		} else {
			console.log("--------------------------------------------")
			console.log(chalk.bold('TITLE | ') + data.Title);
			console.log(chalk.bold('YEAR | ') + data.Year);
			console.log(chalk.bold('RATING | ') + data.imdbRating);
			console.log(chalk.bold('COUNTRY | ') + data.Country);
			console.log(chalk.bold('LANGUAGE(S) | ') + data.Language);
			console.log(chalk.bold('PLOT | ') + data.Plot);
			console.log(chalk.bold('ACTORS | ') + data.Actors);
			console.log(chalk.bold('ROTTEN TOMATOES | ') + data.tomatoRating);
			console.log(chalk.bold('ROTTEN TOMATOES LINK | ') + chalk.blue.underline(data.tomatoURL));
			console.log("--------------------------------------------")
		};
	});
};

// Function for "Do What it says"
function doWhat () {
	fs.readFile('random.txt', 'utf8', doWhatCallback);
	function doWhatCallback(err, data) {
	    if (err)
	        throw err;
	    var array = data.split(',');
    	firstInput = array[0].trim();
    	secondInput = array[1].trim();
	}
}

// Switch function to determine what to do
switch (firstInput) {
    case "my-tweets":
        console.log('Getting tweets...');
        getTweets();
        break;

    case "spotify-this-song":
        console.log('Getting song...');
        getSong();
        break;

    case "movie-this":
        console.log('Getting movie...');
        getMovie();
        break;

    case "do-what-it-says":
        console.log('Doing what it says...');
        doWhat();
        break;
}

// getMovie();
// getSong();
// getTweets();
// doWhat();