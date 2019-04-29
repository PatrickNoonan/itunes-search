/*
//user searches for artist
//-jquery onclick the send button itunes.apple.com/search?artist=pearl+jam&limit=25
//-ajax sends the request to the itunes api
To search for content from a field in your website and display the results in your website, 
-you must create a search field that passes a fully-qualified URL content request to the iTunes Store, 
-parse the JavaScript Object Notation (JSON) format returned from the search, 
-and display the results in your website.
The fully-qualified URL must have the following format:
https://itunes.apple.com/search?parameterkeyvalue
Where parameterkeyvalue can be one or more parameter key and value pairs indicating the details of your query.
*/

$(document).ready(function () {

    $("button").on("click", function () {
        let searchType = "song";
        let searchInput = $("#user-search").val();
        let inputToUrl = searchInput.replace(" ", "+");

        $.ajax({
            method: "GET",
            url: "https://itunes.apple.com/search?entity=" + searchType + "&limit=8&term=" + inputToUrl,
            dataType: "JSON"
        })

            .done(function (data) {

                console.log(data);
                /*
                let albumCover = data.results[0].artworkUrl100;
                let artistName = data.results[0].artistName;
                let songName = data.results[0].trackName;
                let songPreview = data.results[0].previewUrl
                */

                console.log(data.results);

                //$("#info-list").append(`<div class="col-2"><h3>Album Cover</h3></div><div class='col-2'><h3>Artist</h3></div><div class='col-2'><h3>Song</h3></div><div class='col-4'><h3>Album Name</h3></div><div class='col-2'><h3>Song Preview</h3></div>`);

                $.each(data.results, function (key, value) {

                    $("#info-list")
                        .append(`<div class="row object-row"><div class="col-2"><img src="${value.artworkUrl100}"></div>` + "<div class='col-2'>" + value.artistName + "</div><div class='col-2'>" + value.trackName + "</div><div class='col-4'>" + value.collectionName + "</div><div class='col-2'><audio controls='controls'><source src='" + value.previewUrl + `' type="audio/mpeg"></audio></div></div>`)
                });
            })

            .fail(function () {
                console.log("fail");
                $(".iTunes-seach").append("<p>search failed, try again</p>")
            });

    });
});
