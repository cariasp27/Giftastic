////////// Global Variables //////////

// stores the user input to be used in button creation
let usertopic;

// stores new button data for appending
let newbutton;

// stores query keyword for API
let queryname;

// stores link to API with queryname concatenation
let queryURL;

// function used to pull gifs from API
let getajax = function (event) {

    // grab topic to be searched from the data-name attribute
    // and store it in queryname
    queryname = $(event.target).attr("data-name").trim();

    // API link with queryname concatenation
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=58kRmpgUaY1zJfmOlS2I9t2MzX6Mz2dj&q=" + queryname + "&limit=75&offset=0&rating=PG&lang=en";
    
    // actual ajax API call

    $.ajax({
        url: queryURL,
        method: "GET"

    }).then(function (response) {

        // log the response to the console
        console.log(response);

        // loop for 10 iterations to grab 10 photos from response object
        // **Add functionality so that after a button is pressed,
        // its page number is increased by the value of its data-page value
        // allowing for multiple gif pulls
        for (i = 0; i <= 9; i++) {
            // assigns the still image url of the gif to a variable
            var imageUrl = response.data[i].images.original_still.url;

            // assigns the animated gif url to a variable
            var aniUrl = response.data[i].images.original.url;
            // This mess...
            // creates a card to hold the gif
            // puts the title and rating of gif
            // in card body
            var imgholder = $("<div class='card' style='width: 20rem;'><div class='card-body'><h1>"+ response.data[i].title +"</h1><p> Rating: "+ response.data[i].rating +"</p></div></div>");
            
            // assigns the top image of the card to a variable for manipulation
            var stillImage = $("<img class='card-img-top gif'>");
            // give the image the following attributes
            // src          : link to still image
            // alt          : alternative text
            // data-state   : used to flip states
            // data-still   : links to still url
            // data-animate : links to animated url
            stillImage.attr("data-state", "still")
            stillImage.attr("data-still", imageUrl);
            stillImage.attr("data-animate", aniUrl);
            stillImage.attr("src", imageUrl);
            stillImage.attr("alt", "still image");

            // prepend the image to the imageholder card
            $(imgholder).prepend(stillImage);

            // prepend the card to the DOM
            $("#images").prepend(imgholder);
            
        }
    });
}

// function to generate buttons based on topics array
let genbuttons = function () {

    // clears the buttons div
    $("#dembuttons").empty();

    // loops through the entire topics array and for each iteration...
    for (i = 0; i < topics.length; i++) {

        // create a new button with the data-name of topic
        // and the name of topic on the button
        newbutton = $("<button class='btn btn-lg jif' data-name='" + topics[i] + "'>" + topics[i] + "</button>");
        
        // append button to DOM
        $("#dembuttons").append(newbutton);
    }
};

////////// ONCE THE PAGE HAS LOADED //////////
$(document).ready(function () {
    // genereate buttons based on original topics array
    genbuttons();

    // whenever an element with the class gif is pressed...
    $(document).on("click", ".gif", function () {

        // grab data-state from element
        var state = $(this).attr("data-state");

        // if the data state is still...
        if (state === "still") {

            // change the value of the elements src attribute to
            // the value of the elements data-animate attribute
            $(this).attr("src", $(this).attr("data-animate"));

            // change the elements data state to animate
            $(this).attr("data-state", "animate");

        } 
        // otherwise....
        else {

            // change the value of the elements src attribute to
            // the value of the elements data-still attribute 
            $(this).attr("src", $(this).attr("data-still"));

            // change the elemnts data state to still
            $(this).attr("data-state", "still");
        }
    });
    //////////// THIS IS THE MAGICAL LINE OF CODE //////////
    $(document).on("click", ".jif", getajax);
    // when anything with the class of jif is clicked...
    // run the get ajax function :)
    // yay clean readable code

    // upon clicking an element with the bloop id...
    $("#bloop").on("click", function (event) {
        
        // prevent weirdness
        event.preventDefault();

        // assign the value of the input field to the usertopic variable
        usertopic = $("#useradd").val().trim();

        // push the new topic to the topics array
        topics.push(usertopic);

        // log the new topics array
        console.log(topics);

        // run genbuttons with new array
        genbuttons();

        // clear the input field
        $("#useradd").val("");

    });

});