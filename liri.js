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
                console.log("artist: " + songs[i].artists.map(retreiveArtistNames));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("---------------------------");
            }
        })
};

// let doWhatItSays = function() {
//     fs.readFile("random.txt", "utf8", function(error, data) {
        
//         let dataArray = data.split(",");

//         if (dataArray.length === 2) {
//             choose(dataArray[0], dataArray[1]);
//         } else if (dataArray.length === 1) {
//             choose(dataArray[0]);
//         }
//     });
// };

var choose = function (searchUserCmd, userSong) {
    switch (searchUserCmd) {
        case "spotify-this-song":
            spotifyRequest(userSong);
            break;
        // case "do-what-it-says":
        //     doWhatItSays();
        //     break;
        default:
            console.log("LIRI doesn't know that");
    }
};

let execution = function(argOne, argTwo) {
    choose(argOne, argTwo);
};

execution(process.argv[2], process.argv.slice(3).join(" "));