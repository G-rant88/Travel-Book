$("#addTrip").on("click", function(event){


	var trip = $(".newTrip").val().trim();

	title = $("<h4>");

	title.html(trip);

	$(".tripsHere").append(title);

	trips = $("<div>");

	trips.addClass("trip");

	trips.attr("id", "droppable");


$(".tripsHere").append(trips);

});

$("#trips").validate({


 rules: {
      tripName: {
        required: true
    }
   },

messages: {
      tripName: {
        required: "Enter a Trip Name"

}

}

 });



$( function() {
    $("#draggable").draggable();
    $("#droppable").droppable(
    {
      drop: function( event, ui ) {
  }
    });
 
});