$(document).ready(function() {
  $('select').material_select();

  $.validator.setDefaults({
    ignore: []
  });

  $("#newPost").validate({
    rules: {
      place: {
        required: true,
        minlength: 5
      },
      cityC: {
        required: true,
        minlength: 5
      },
      countryC: {
        required: true,
        minlength: 5
      },
      category: {
        required: true,
      },
      rating: {
        required: true,
      },
      pricepoint: {
        required: true,
      },
      upload: {
        required: true,
      },
      review: {
        required: true,
        minlength: 3
      },
    },
    //For custom messages
    messages: {
      place: {
        required: "Enter a place",
        minlength: "Enter at least 5 characters"
      },
      cityC: {
        required: "Enter a City",
        minlength: "Enter at least 5 characters"
      },
      countryC: {
        required: "Enter a Country",
        minlength: "Enter at least 5 characters"
      },
      category: {
        required: "Enter a category"
      },
      rating: {
        required: "Enter a rating"
      },
      pricepoint: {
        required: "Enter a pricepoint"
      },
      review: {
        required: "Enter a review",
        minlength: "Enter at least 3 characters"
      },
      upload: {
        required: "Please upload a file"
      },
    },
    errorElement: 'div',
    errorPlacement: function(error, element) {
      var placement = $(element).data('error');
      if (placement) {
        $(placement).append(error)
      } else {
        error.insertAfter(element);
      }
    }
  });

});

// To the the searchbox
function initMap() {

  var input = document.getElementById('pac-input');
  var autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener('place_changed', function() {
    var place = autocomplete.getPlace();
    if (!place.geometry) {
      return;
    }


    var city;
    var country;

    for (var i = 0; i < place.address_components.length; i++) {

      for (var j = 0; j < place.address_components[i].types.length; j++) {

        if (place.address_components[i].types[j] === 'locality') {
          city = place.address_components[i].long_name
        }
        if (place.address_components[i].types[j] === 'country') {
          country = place.address_components[i].long_name;
        }
      }
    }

    var placeId = place.place_id;
    var name = place.name;
    var user = Cookies.get('name');

    $("#user").attr("value", user);
    $('#pac-input').val("");
    $('#cityC').attr("value", city);
    $('#countryC').attr("value", country);
    $('#place').attr("value", name);

    console.log($('#place').val(), $('#cityC').val(), $('#countryC').val());


  });
};