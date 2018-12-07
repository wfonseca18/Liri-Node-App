
// Imports
require('dotenv').config();
const keys = require('./keys.js');
const Spotify = require('node-spotify-api');
const request = require('request');
const fs = require('fs');

// Declaring global variables
const spotify = new Spotify(keys.spotify);
var command = process.argv[2], argument = process.argv[3], queryUrl, body;

// Declaring functions
function concert() {
    queryUrl = `https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`;
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parsing for dot walking.
            body = JSON.parse(body);
            console.log(`Venue Name: ${body[0].venue.name}`);
            console.log(`Venue Location: ${body[0].venue.city}, ${body[0].venue.country}`);
        } else {
            console.log('Error occurred: ' + error);
        }
    });
}

function searchSpotify() {
    var artists = '', query;
    if (argument) {
        query = { type: 'track', query: argument };
    } else {
        query = { type: 'track', query: `What's My Age Again` };
    }
    spotify.search(query, function (err, data) {
        if (err) {
            return console.log('Error 2 occurred: ' + err);
        }
        body = data.tracks.items[0];
        body.artists.forEach(artist => {
            artists += artist.name;
        });
        console.log(`Artist(s): ${artists}`);
        console.log(`Song Name: ${body.name}`);
        console.log(`Preview Link: ${body.external_urls.spotify}`);
        console.log(`Album: ${body.album.name}`);
    });
}

function movie() {
    if (argument) {
        queryUrl = `http://www.omdbapi.com/?t=${argument}&apikey=trilogy`;
    } else {
        queryUrl = `http://www.omdbapi.com/?i=tt0485947&apikey=trilogy`;
    }

    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            // Parsing for dot walking.
            body = JSON.parse(body);
            console.log(`Title: ${body.Title}`);
            console.log(`Year: ${body.Year}`);
            console.log(`IMDB Rating: ${body.Ratings[0].Value}`);
            console.log(`Rotten Tomatoes Rating: ${body.Ratings[1].Value}`);
            console.log(`Country: ${body.Country}`);
            console.log(`Language: ${body.Language}`);
            console.log(`Plot: ${body.Plot}`);
            console.log(`Actors: ${body.Actors}`);
        } else {
            console.log('Error occurred: ' + error);
        }
    });
}

switch (command.toLowerCase()) {
    case 'concert-this':
        concert();
        break;
    case 'spotify-this-song':
        searchSpotify();
        break;
    case 'movie-this':
        movie();
        break;
    case 'do-what-it-says':
        fs.readFile('random.txt', 'utf8', function (err, data) {
            if (err) {
                return console.log(err);
            }
            // Break the string down by comma separation and store the contents into the output array.
            const output = data.split(',');
            argument = output[1];
            switch (output[0].toLowerCase()) {
                case 'concert-this':
                    concert();
                    break;
                case 'spotify-this-song':
                    searchSpotify();
                    break;
                case 'movie-this':
                    movie();
                    break;
                default:
                    console.log('Invalid command!');
                    break;
            }
        });
        break;
    default:
        console.log('Invalid command!');
        break;
}
