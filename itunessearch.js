/*
To search for content from a field in your website and display the results in your website, 
-you must create a search field that passes a fully-qualified URL content request to the iTunes Store, 
-parse the JavaScript Object Notation (JSON) format returned from the search, 
-and display the results in your website.
The fully-qualified URL must have the following format:
https://itunes.apple.com/search?parameterkeyvalue
Where parameterkeyvalue can be one or more parameter key and value pairs indicating the details of your query.
*/


$(document).ready(function () {
    document.getElementById("runButton").onclick = function () {
        req = new XMLHttpRequest();
        req.open("GET", "https://itunes.apple.com/search?term=jack+johnson&limit=3.", true);
        req.send();
        req.onload = function () {

            json = JSON.parse(req.responseText);

            //for each key of results, print the key and value
            let newRow = document.getElementById("displayRow");
            //newRow.innerHTML = newRow.innerHTML + "<div class='row'></div>";
            let imageOutput = document.getElementById("imageDisplay");
            let artistOutput = document.getElementById("artistOutput");
            let albumOutput = document.getElementById("albumOutput");
            let trackOutput = document.getElementById("trackOutput");
            let audioOutput = document.getElementById("audioPlayer");

            json.results.forEach(function (val) {           
                let keys = Object.keys(val);
                keys.forEach(function (key) {
                    if (key == "artworkUrl60") {
                        imageOutput.innerHTML = imageOutput.innerHTML + "<img src='" + val[key] + "' " + "alt='Album Art'/>" + "<br>";
                    } else if (key == "artistName") {
                        artistOutput.innerHTML = artistOutput.innerHTML + "Artist -" + " " + val[key] + "<br>";
                    } else if (key == "collectionName") {
                        albumOutput.innerHTML = albumOutput.innerHTML + "Album -" + " " + val[key] + "<br>";
                    } else if (key == "trackName") {
                        trackOutput.innerHTML = trackOutput.innerHTML + "Song -" + " " + val[key] + "<br>";
                    } else if (key == "previewUrl") {
                        audioOutput.innerHTML = audioOutput.innerHTML + "<audio controls='controls'>" + "<source src='" + val[key] + "' type='audio/mpeg'/> </audio>"
                    }                    
                });
            });
        };
    };
});

//create new rows for every new object you iterate though
//let the user search anything concatting strings to the url ending

/* $.ajax({
         url: "https://itunes.apple.com/search?term=jack+johnson&limit=25.",
         type: 'GET',
         dataType: 'json',
         success: function (res) {
             $('#result').html(res)
         }
     });
    */

 //user searches for artist
 //-jquery onclick the send button itunes.apple.com/search?artist=pearl+jam&limit=25
 //-ajax sends the request to the itunes api
