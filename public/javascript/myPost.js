 $('.collapsible').collapsible();
 
 $('.trip-name').click(function (event) {
    event.preventDefault();
    var cook = Cookies.get('name');
    var data = {
      tripName: $(this).attr('data-trip-name')
    }
    console.log($(this).hasClass('active'));
    if (!$(this).hasClass('active')) {
      $.ajax({
        method: 'GET',
        url: '/future/' + cook + '/' + data.tripName,
        success: function (data){
          
          // attach data to div
          var allPosts = $('<div class="trip-info">');
          for (var i=0; i < data.tripPosts.length; i++) {
            allPosts.append('<p>' + data.tripPosts[i].name + '</p><hr>');
          }
          // append data to active list item
          $('li.active .collapsible-body').append(allPosts);
          
        }
      });
    }
    else {
      $('.trip-info').remove();
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