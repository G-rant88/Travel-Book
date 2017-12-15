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

    for (var i = 0; i < place.address_components.length; i++) {
      // console.log(place.address_components[i].long_name);
      for (var j = 0; j < place.address_components[i].types.length; j++) {
        //console.log(place.address_components[i].types[j])
        if (place.address_components[i].types[j] === 'locality' || place.address_components[i].types[j] === 'country') {
          //   console.log(place.address_components[i].types[j])
          cityCountry.push(place.address_components[i].long_name);
        }
      }
    }

    var placeId = place.place_id;
    var name = place.name;
    var city = cityCountry[0];
    var country = cityCountry[1];

    
    // $(document).ready(function() {
    $('#pac-input').val("");
    $('#cityC').attr("value", city);
    $('#countryC').attr("value", country);
    $('#place').attr("value", name);

    console.log( $('#place').val(), $('#cityC').val(), $('#countryC').val() ) ;


  });
};