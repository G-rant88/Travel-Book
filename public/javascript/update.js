var category = $("#categories").attr("value")
$("#categories").val(category);
$("#categories").material_select();

var rating = $("#rate").attr("value")
$("#rate").val(rating);
$("#rate").material_select();

var price = parseInt($("#pricep").attr("value"))
$("#pricep").val(price);
$("#pricep").material_select();

$('#updatePost').click(function(event) {
	event.preventDefault();
	var id = $("#form").attr("dataValue");
	var user = Cookies.get('name');
	var updatePost = {
		name: $("#place").val(),
		city: $("#cityC").val(),
		country: $("#countryC").val(),
		categories: $("#categories").val(),
		rating: $("#rate").val(),
		price: $("#pricep").val(),
		review: $("#review").val()
	}

	$.ajax("/update/" + id, {
		type: "PUT",
		data: updatePost
	}).then(function() {
		location.assign("/saved/" + user);
	});
});