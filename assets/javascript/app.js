// Global Variables
// 
let usertopic;
let newbutton;
let thingy;
let queryURL;
let getajax = function (event) {
    thingy = $(event.target).attr("data-name").trim();
    queryURL = "https://api.giphy.com/v1/gifs/search?api_key=58kRmpgUaY1zJfmOlS2I9t2MzX6Mz2dj&q=" + thingy + "&limit=75&offset=0&rating=PG&lang=en";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
// switch case or else if pulls is greater than one, then i +10??? not sure 
        for (i = 0; i <= 9; i++) {
            var imageUrl = response.data[i].images.original_still.url;
            var aniUrl = response.data[i].images.original.url;
            var download = response.data[i].url;
            var imgholder = $("<div class='card' style='width: 20rem;'><div class='card-body'><h1>"+ response.data[i].title +"</h1><p> Rating: "+ response.data[i].rating +"</p><i class='fas fa-arrow-down'><a download='"+ download +"'></i></div></div>");
            var stillImage = $("<img class='card-img-top gif'>");
            stillImage.attr("data-state", "still")
            stillImage.attr("data-still", imageUrl);
            stillImage.attr("data-animate", aniUrl);
            stillImage.attr("src", imageUrl);
            stillImage.attr("alt", "still image");
            $(imgholder).prepend(stillImage);
            $("#images").prepend(imgholder);
            
        }
    });
}
let intmain = {
    genbuttons: function () {
        $("#dembuttons").empty();
        for (i = 0; i < topics.length; i++) {
            newbutton = $("<button class='btn btn-lg jif' data-name='" + topics[i] + "'>" + topics[i] + "</button>");
            $("#dembuttons").append(newbutton);
        }
    },
};
$(document).ready(function () {
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    });
    intmain.genbuttons();
    $(document).on("click", ".jif", getajax );



    $("#bloop").on("click", function (event) {
        event.preventDefault();
        usertopic = $("#useradd").val().trim();
        topics.push(usertopic);
        console.log(topics);
        intmain.genbuttons();
        $("#useradd").val("")

    });

});