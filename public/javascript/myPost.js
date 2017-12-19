 $('.collapsible').collapsible();
 
 $('.trip-name').click(function (event) {
    event.preventDefault();
    var cook = Cookies.get('name');
    var data = {
      tripName: $(this).attr('data-trip-name')
    }
    // console.log($(this).attr('data-status'));
    if (!$(this).attr('data-status')) {
      $(this).attr('data-status', 'populated');      
      $.ajax({
        method: 'GET',
        url: '/future/' + cook + '/' + data.tripName,
        success: function (data) {

          // display dollar signs according to price scale
          
          // attach data to div
          var allPosts = $('<div class="trip-info">');
          for (var i=0; i < data.tripPosts.length; i++) {

            var dollarSigns = '';
            for (var j=0; j < data.tripPosts[i].price; j++) {
                dollarSigns += '$';
            }
            // display rating according to rating scale
            var stars = '';
            var count = 0;
            // whole stars
            for (var j=0; j < data.tripPosts[i].rating; j++) {
                count++;
                stars += '<i class="material-icons">star</i>';
            }
            // fill in remaining scale with empty stars
            if (count < 5) {
                for (var j=0; j < (5-count); j++) {
                    stars += '<i class="material-icons">star_border</i>';
                }
            }

            allPosts.append('<p>Place: ' + data.tripPosts[i].name + '</p>');
            allPosts.append('<p>Location: ' + data.tripPosts[i].city + ', ' + data.tripPosts[i].country + '</p>');
            allPosts.append('<p>Category: ' + data.tripPosts[i].categories + '</p>');
            allPosts.append('<p>Rating: ' + stars + '</p>');
            allPosts.append('<p>Price: ' + dollarSigns + '</p><hr>');            
          }
          // append data to active list item
          $('li.active .collapsible-body').append(allPosts);

        }
      });
    }
    else {
      console.log('already populated');
    }
  })
  
  $('.clear-btn').click(function (event) {

  	var ids = $(this).attr("data-post-id");

  	var datas = {

  		id: ids
  	}

  	 $.ajax("/deltrip", {
      type: "DELETE",
      data: datas
    }).then(
      function(event) {
        
        location.reload();
      

  });

});


    $('.delete-btn').click(function (event) {

    var ids = $(this).attr("data-post-id");

    var datas = {

      id: ids
    }

     $.ajax("/deltrip", {
      type: "DELETE",
      data: datas
    }).then(
      function(event) {
        
        location.reload();
      

  });

});