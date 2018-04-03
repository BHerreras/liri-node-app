//References to all packages used
var dotBro = require("dotenv").config();
var request = require('request');
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var fs = require("fs");
var keys = require('./keys.js');

//required keys for spotify & twitter
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//These args determine which function to run 
var command = process.argv[2];
var value = process.argv[3];



// --------------------------------------------------------------------------------
// Uses request to query OMDB API
if (command === "movie-this")
	//Provide a default search value if user does not define
	if (value != undefined) {
		var movieName = value;
	} else {
		movieName = "Mr. Nobody";
	}
//Handles names with spaces
movieName = movieName.replace(' ', '+');

var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

request(queryUrl, function (error, response, body) {

	console.log("----------------------");
	console.log('Movie Title:', JSON.parse(body).Title);
	console.log('Release Year:', JSON.parse(body).Year);
	console.log('IMDB Rating:', JSON.parse(body).Ratings[0].Value);
	console.log('Country:', JSON.parse(body).Country);
	console.log('Language:', JSON.parse(body).Language);
	console.log('Rotten Tomatoes Rating:', JSON.parse(body).Ratings[1].Value);
	console.log('Plot Summary:', JSON.parse(body).Plot);
	console.log('Actors:', JSON.parse(body).Actors);
	console.log("----------------------");
});
//----------------------------------------------------------------------------
// Takes a command and displays tweets
if (command === "my-tweets") {

	var params = {
	};

	client.get('statuses/user_timeline', params, function (error, tweet, response) {

		if (!error) {

			var posts;

			for (posts in tweet) {

				console.log("-------------------------------------------------------------------");

				console.log("Tweet: " + tweet[posts].text);

				console.log("-------------------------------------------------------------------");
			};

		};

	});

}
//-------------------------------------------------------------------------
// Takes a command and searches Spotify and displays song info..
else if (command === "spotify-this-song") {

	var song = value;




	spotify.search({ type: 'track', query: song }, function (err, data) {
		if (err) {
			return console.log('Error occurred: ' + err);
		}
		console.log(data.tracks.href);
		console.log(data.tracks.items[0].name);
		console.log(data.tracks.items[0].artists[0].name);


	});



}