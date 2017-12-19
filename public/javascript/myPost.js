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
          for (var i=0; i < data.tripPosts.length; i++) {
            var newRow = $('<div class="row">')
            var images = $('<div class="col s3">')
            var allPosts = $('<div class="col s7 trip-info">');

            var imageSrc = 'https://s3-us-west-2.amazonaws.com/travelbookpictures/' + data.tripPosts[i].image;
            var image = $('<img class="circle responsive-img">');
            image.attr('src', imageSrc);

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

            images.append(image); 
            allPosts.append('<p>Place: ' + data.tripPosts[i].name + '</p>');
            allPosts.append('<p>Location: ' + data.tripPosts[i].city + ', ' + data.tripPosts[i].country + '</p>');
            allPosts.append('<p>Category: ' + data.tripPosts[i].categories + '</p>');
            allPosts.append('<p>Rating: ' + stars + '</p>');
            allPosts.append('<p>Price: ' + dollarSigns + '</p>');    
            
            $(newRow).append(images);
            $(newRow).append(allPosts);
            $('li.active .collapsible-body').append(newRow);
            $('li.active .collapsible-body').append('<hr>');
          }
          // append data to active list item          
        }
      });
    }
    else {
      console.log('already populated');
    }
  })
  
//   $('.clear-btn').click(function (event) {

//   	var ids = $(this).attr("data-post-id");

//   	var datas = {

//   		id: ids
//   	}

//   	 $.ajax("/deltrip", {
//       type: "DELETE",
//       data: datas
//     }).then(
//       function(event) {
        
//         location.reload();
      

//   });

// });


    $('.delete-btn').click(function (event) {

    var ids = $(this).attr("data-post-id");

    var datas = {

      id: ids
    }

     $.ajax("/delpost", {
      type: "DELETE",
      data: datas
    }).then(
      function(event) {
        
        location.reload();
      

  });


});

      $('.back').click(function (event) {

        var cook = Cookies.get('name');

        location.assign("/friends/"+cook);

      });

