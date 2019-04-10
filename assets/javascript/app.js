var buttonArray = ["Horse", "Sloth", "Cow", "Chipmunk", "Dramatic Chipmunk",]

//Creates createButtons function

function createButtons(buttonArray, newClass, buttonDiv) {

    $(buttonDiv).empty();

    for (var i = 0; i < buttonArray.length; i++) {

        var a = $("<button>");

        a.addClass(newClass);

        a.attr("data-type", buttonArray[i]);

        a.text(buttonArray[i]);

        $(buttonDiv).append(a);

    }
}

//Runs the createButtons function

$(function () {

    createButtons(buttonArray, "searchButton", "#buttonsTop");

})


//Grabs API for input data upon search

$(document).on("click", ".searchButton", function () {

    var type = $(this).data("type");
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=tgMsoLpeShuIQYvTkVg1PhJrlG561zbf&limit=20";
  

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {

        console.log(response);

        for (var i = 0; i < response.data.length; i++) {

            var searchDiv = $("<div class='search-item'>");

            //---?response[i].rating?---//
            var rating = response.data[i].rating;

            var p = $("<p>").text("Rating: " + rating);

            var animated = response.data[i].images.fixed_height.url;

            var still = response.data[i].images.fixed_height_still.url;

            var image = $("<img>");
            
            image.attr("src", still);

            image.attr("data-animated", animated);

            image.addClass("searchImage");

            searchDiv.append(p);

            searchDiv.prepend(image);

            $("#searches").prepend(searchDiv);

        }
    })
})

// Adds new button with user input

$("#addSearch").on("click", function () {

    var newSearch = $("input").eq(0).val();

    buttonArray.push(newSearch);

    createButtons(buttonArray, "searchButton", "#buttonsTop");

    return false;

})

//Starts and pauses gif on click

$(document).on("click", ".searchImage", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {

        $(this).attr("src", $(this).data("animated"));
        $(this).attr("data-state", "animated");

    } else {

        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", "still");

    }

})

