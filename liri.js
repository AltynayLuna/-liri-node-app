//Main function to run all other functions
function run() {
    var userInput = process.argv[2];
    if (userInput === 'my-tweets') {
        generateTwitterData();
    } else if (userInput === 'spotify-this-song') {
        generateSpotifyData();
    } else if (userInput === 'movie-this') {
        generateOmdbData();
    } else if (userInput === "do-what-it-says") {
        commandFromFile();
    };
};

//Twitter
function generateTwitterData() {
    var userInput = process.argv[2];
    var Twitter = require('twitter');
    var tweet = new Twitter({
        consumer_key: '5xZeqfEw0VJ2Sa0JwhpKAfHSO',
        consumer_secret: 'FRErUvxcohp8rO0gdoWBMcSxr17QGMbvoORbynziOcmUax8oIl',
        access_token_key: '119831262-Mu0E0XyCcfVtgzFBIw629kVwBX6rP883b8HBwGrN',
        access_token_secret: 'TP3srDbXe9BCfgpYAnFX8iuo3oFQJz9CLDTCx0bk6Dx20',
    });
    var screenName = { screen_name: 'AltynayR' };
    
    tweet.get('statuses/user_timeline', screenName, displayTwitterData);
    function displayTwitterData(error, data, response) {
        if (userInput) {
            for (let key in data) {
                if (!error) {
                    tweet = data[key];
                    console.log('Tweet: ' + tweet.text + '\n' + 'Date created: ' + tweet.created_at + '\n');
                }
            }
        }
    }
}

//Spotify
function generateSpotifyData(songTitle) {
    var userInput = process.argv[3];
    if(!userInput) {
        userInput = songTitle;
    }
    if (!userInput) {
        userInput = 'The Sign';
    };
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: '7ab25a873288496cb5a56b2c202d64c9',
        secret: 'd41f9fb562ca4ea8904fe2bc7ddc1f29',
    });

    var spotifyParams = {
        type: 'track',
        query: userInput,
    };
    spotify.search(spotifyParams, displaySpotifyData);
    
    function displaySpotifyData(error, data) {
        if (!error) {
            console.log('Artist: ' + data.tracks.items[0].album.artists[0].name);
            console.log('Song: ' + data.tracks.items[0].name);
            console.log('Preview link: ' + data.tracks.items[0].preview_url);
            console.log('Album: ' + data.tracks.items[0].album.name);
        }; 
    };
};

//OMDB
function generateOmdbData(movieTitle) {
    var userInput = process.argv[3];
    if(movieTitle) {
        userInput = movieTitle;
    }
    if (!userInput) {
        userInput = 'Mr. Nobody';
    };
    var request = require('request');
    var queryUrl ='http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&apikey=40e9cece';
    request(queryUrl, displayOmdbData);
    
    function displayOmdbData(error, response, body) {
        if (!error) {
            console.log('Title: ' + JSON.parse(body).Title);
            console.log('Year: ' + JSON.parse(body).Year);
            console.log('IMDB Rating: ' + JSON.parse(body).imdbRating);
            console.log('Rotten Tomatoes Rating: ' + JSON.parse(body).Ratings[1].Value);
            console.log('Country: ' + JSON.parse(body).Country);
            console.log('Language: ' + JSON.parse(body).Language);
            console.log('Plot: ' + JSON.parse(body).Plot);
            console.log('Actors: ' + JSON.parse(body).Actors);
        } 
    };
};

//COMMAND FROM FILE
function commandFromFile(){
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            console.log(error);
        } else {
            var dataArr = data.split(',');
            if (dataArr[0] === 'spotify-this-song') {
                generateSpotifyData(dataArr[1]);
            };
            if (dataArr[0] === 'movie-this') {
                generateOmdbData(dataArr[1]);
            };      
        };
    });
};
run();
