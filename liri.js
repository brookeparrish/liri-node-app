require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys.js");
var fs = require("fs");
let spotify = new Spotify(keys.spotify);

let retreiveArtistNames = function (artist) {
    return artist.name;
};

let spotifyRequest = function (songName) {
    if (songName === undefined || songName === null || songName === "") {
        songName = "The Sign";
    }


    spotify.search(
        {
            type: 'track',
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log('Error occurred: ' + err);
                return;
            }

            let songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(retreiveArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
            }
        })
};

let doWhatItSays = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);

        let dataArray = data.split(",");

        if (dataArray.length === 2) {
            choose(dataArray[0], dataArray[1]);
        } else if (dataArray.length === 1) {
            choose(dataArray[0]);
        }
    });
};

var choose = function (caseData, functionData) {
    switch (caseData) {
        case "spotify-this-song":
            spotifyRequest(functionData);
            break;
        case "do-what-it-says":
            doWhatItSays();
            break;
    default:
        console.log("LIRI doesn't know that");
    }
};

let execution = function(argOne, argTwo) {
    choose(argOne, argTwo);
};

execution(process.argv[2], process.argv.slice(3).join(" "));