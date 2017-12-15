$(document).ready(function() {
  $('select').material_select();
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


    var cityCountry = [];
    var city;
    var country;

    for (var i = 0; i < place.address_components.length; i++) {

      for (var j = 0; j < place.address_components[i].types.length; j++) {
    
        if (place.address_components[i].types[j] === 'locality' ) {
           city=place.address_components[i].long_name
        }
        if (place.address_components[i].types[j] === 'country') {
          country = place.address_components[i].long_name;
        }
      }
    }

    var placeId = place.place_id;
    var name = place.name;
    var user = Cookies.get('name');
    // var city = cityCountry[0];
    // var country = cityCountry[1];
    $("#user").attr("value", user);
    
    $('#pac-input').val("");
    $('#cityC').attr("value", city);
    $('#countryC').attr("value", country);
    $('#place').attr("value", name);

    console.log( $('#place').val(), $('#cityC').val(), $('#countryC').val() ) ;


  });
};