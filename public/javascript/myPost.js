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