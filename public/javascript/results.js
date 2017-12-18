$(function () {
    // sidenav functionality
    $(".button-collapse").sideNav();

    // modal functionality
    $('.modal').modal();

    $('.like-btn').click(function (event) {
        event.preventDefault();
        // data associated with result post
        var resultInfo = {
            id: $(this).attr('data-post-id'),
            name: $(this).attr('data-name'),
            price: $(this).attr('data-price'),
            rating: $(this).attr('data-rating'),
            categories: $(this).attr('data-categories')
        }
        // changes heart icon from unliked to like
        // adds result data to liked list
        if ($(this).attr('data-status') === 'unliked') {
            $(this).attr('data-status', 'liked');
            $(this).html('<i class="material-icons heart">favorite</i>');
            // add result to liked list
            // display dollar signs according to price scale
            var dollarSigns = '';
            for (var i=0; i < resultInfo.price; i++) {
                dollarSigns += '$';
            }
            // display rating according to rating scale
            var stars = '';
            var count = 0;
            // whole stars
            for (var i=0; i < resultInfo.rating; i++) {
                count++;
                stars += '<i class="material-icons">star</i>';
            }
            // fill in remaining scale with empty stars
            if (count < 5) {
                for (var i=0; i < (5-count); i++) {
                    stars += '<i class="material-icons">star_border</i>';
                }
            }
            var resultItem = 'Name: ' + resultInfo.name + '<br>' + 'Price: ' + dollarSigns + '<br>' + 'Rating: ' + stars + '<br>' + 'Category: ' + resultInfo.categories + '<br>';
            $('#slide-out').append('<li  class="previous" data-post-id="' + resultInfo.id + '">' + resultItem + '</li><hr>');
        }
        // change result from liked to unlike
        // removes item from liked list
        else {
            $(this).attr('data-status', 'unliked');
            $(this).html('<i class="material-icons heart">favorite_border</i>');
            // remove result from liked list based on the post id
            $('#slide-out li[data-post-id="' + resultInfo.id + '"]').remove();
        }
    });

    
   
    });

    // upon submitting the liked list, post req to store in db
    $('.submit-list-btn').click(function (event) {
        // prevent refresh of page
        event.preventDefault();
        
        // names for trips
        var previousTripName = $('.previous-trip-name').val();
       
        
        // separate data for items for previous trips and future trips
        var previousItems = [];


        // add all items user wants to add to previous trip to specified 'previous' list
        $('.previous').each(function () {
            previousItems.push($(this).attr('data-post-id'));
        });

        var cook = Cookies.get('name');


        var previousTrip = {
            trip: previousTripName,
            user: cook,
            results: previousItems
        };


        console.log(previousTrip);

    
        // // post request to update previous trip
        $.ajax({
            method: 'POST',
            url: '/add/trip',
            data: previousTrip,
            success: function () {
                console.log('Updated trip');  

            }
        });
            location.reload(); 
    });

 $('.edit-btn').click(function (event) {

    var cook = Cookies.get('name');
    location.assign("/edit/"+cook);

});
