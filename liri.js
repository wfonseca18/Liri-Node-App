
require('dotenv').config();

const spotify = new Spotify(keys.spotify);
var command = process.argv[2], argument = process.argv[3];

switch (command.toLowerCase) {
    case 'concert-this':
        console.log(`API https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`);
        console.log('Name of the venue');
        console.log('Venue location');
        break;
    case 'spotify-this-song':
        console.log(`API call to: https://rest.bandsintown.com/artists/${argument}/events?app_id=codingbootcamp`);
        if (argument) {
            console.log('Artist(s)');
            console.log(`The song's name`);
            console.log('A preview link of the song from Spotify');
            console.log('The album that the song is from');
        } else {
            console.log(`default to "What's My Age Again" by blink-182`);
        }
        break;
    case 'movie-this':
        console.log(`http://www.omdbapi.com/?i=${argument}&apikey=trilogy`);
        if (argument) {
            console.log('Title of the movie');
            console.log('Year the movie came out');
            console.log('IMDB Rating of the movie');
            console.log('Rotten Tomatoes Rating of the movie');
            console.log('Country where the movie was produced');
            console.log('Language of the movie');
            console.log('Plot of the movie');
            console.log('Actors in the movie');
        } else {
            console.log(`output data for the movie 'Mr. Nobody.'`);
        }
        break;
    case 'do-what-it-says':
        console.log('run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`');
        console.log('Edit the text in random.txt to test out the feature for movie-this and my-tweets');
        break;
    default:
        break;
}
