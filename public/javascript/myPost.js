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