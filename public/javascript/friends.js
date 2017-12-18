$(".addFriend").on("click", function(event){

	var cook = Cookies.get('name');
	var friend = $(this).attr("data-id");

	var data = {

		user: cook,
		new: friend
	}

      $.ajax({
            method: 'PUT',
            url: '/friend',
            data: data,
            success: function () {
                console.log('friend added');  
                location.reload(); 
            }

        });
            
    });



$(".friendPage").on("click", function(event){


var cook = Cookies.get('name');


location.assign("/friends/"+cook);

});

$(".delfriend").on("click", function(event){

var cook = Cookies.get('name');
var friends = $(this).attr('data-id');

var data = {

    user: cook,
    friend: friends
}

   $.ajax({
            method: 'PUT',
            url: '/delfriend',
            data: data,
            success: function () {
                console.log('friend deleted');  
                location.reload(); 
            }

        });
            
    });


