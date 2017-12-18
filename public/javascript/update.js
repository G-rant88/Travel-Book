for (var i = 0; i < 3; i++) {
	if ($("#category" + i).val() === $("#category").val()) {
		$("#category" + i).addClass("active selected")
	}
}

for (var i = 0; i < 5; i++) {
	if ($("#rating" + i).val() === $("#rating").val()) {
		$("#rating" + i).addClass("active selected")
	}
}


for (var i = 0; i < 3; i++) {
	if ($("#price" + i).val() === $("#pricepoint").val()) {
		$("#price" + i).addClass("active selected")
	}
}


$('#updatePost').click(function(event) {
	event.preventDefault();
	var id = $("#form").attr("dataValue");
	var user = Cookies.get('name');

	var updatePost = {
		name: $("#place").val() ,
		city: $("#cityC").val(),
		country: $("#countryC").val(),
		categories: $("#category").val() ,
		rating: $("#rating").val(),
		price: $("#pricepoint").val() ,
		review: $("#review").val()
	}
	console.log(updatePost);

	$.ajax("/update/" + id, {
		type: "PUT",
		data: updatePost
	}).then(function() {
		location.assign("/saved/" + user);
	});
});