// Initial Global Variables

var fs = require('fs'),
    request = require('request'),
    twitter = require('twitter'),
	myKeys = require("./keys.js"),
    spotify = require('spotify'),
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
	spotify.search({type: 'track', query: secondInput, limit: 1}, function (error, data) {
		if (error) {
			throw Error;
		} else {
			console.log("--------------------------------------------")
			console.log("ARTIST(S) | " + data.tracks.items[0].album.artists[0].name);
			console.log("TITLE | " + data.tracks.items[0].name);
			console.log("LINK | " + data.tracks.items[0].preview_url);
			console.log("ALBUM | " + data.tracks.items[0].album.name);
			console.log("--------------------------------------------")
		}
	});
};

getSong();
