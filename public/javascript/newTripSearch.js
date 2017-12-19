$(function() {
    // object to be sent to the results page
    var searchQuery = {
        country: null,
        city: null,
        categories: null
    }

    $('.cities').hide();
    $('.categories').hide();
    $('#trip-search-submit').hide();

    // capture country upon map click
    var map = AmCharts.makeChart("chartdiv", {
        "type": "map",
        "theme": "light",
        "projection": "miller",

        "dataProvider": {
            "map": "worldLow",
            "getAreasFromMap": true
        },

        "areasSettings": {
            "autoZoom": true,
            "selectedColor": "#891616",
            "selectable": true
        },

        // "smallMap": {},
        "listeners": [{
            "event": "clickMapObject",
            "method": function(event) {
                var country;

                // deselect the area by assigning all of the dataProvider as selected object
                map.selectedObject = map.dataProvider;

                // toggle showAsSelected
                event.mapObject.showAsSelected = !event.mapObject.showAsSelected;

                map.returnInitialColor(event.mapObject);

                // let's build a list of currently selected states
                for (var i = 0; i < map.dataProvider.areas.length; i++) {
                    if (map.dataProvider.areas[i].showAsSelected) {
                        // store the country in a variable and use to make get request to google maps to get all cities
                        // console.log(map.dataProvider.areas[i].title);
                        // return map.dataProvider.areas[i].title;
                        country = map.dataProvider.areas[i].title;
                    }
                }
                event.mapObject.showAsSelected = !event.mapObject.showAsSelected

                searchQuery.country = country;

                $('#cities').material_select('destroy');
                $('#categories').material_select('destroy');
                // search country code by country name
                findCity(country);

            }
        }],
        "export": {
            "enabled": false,
            "position": "bottom-right"
        }
    });
    //*************************************************//


    function findCity(country) {

        $.get("/country/" + country, function(data) {

            $('#cities').empty();

            // placeholder for dropdown options
            $('#cities').append('<option value="" disabled selected>Choose a city</option>');
            var cities = data;
            console.log(cities);

            for (var i = 0; i < cities.length; i++) {
                var city = $('<option>').addClass('city').attr('value', cities[i]).text(cities[i]).attr('link', cities[i].href);
                $('#cities').append(city);
            }
            // show cities dropdown newly populated with cities
            $('.cities').show();
            $('#cities').material_select();

        });

    }


    // listens for any changes made to the dropdown
    $('#cities').change(getCity);

    function getCity() {
        // if select is initialized and a city was selected, run search query for cities based on city
        if ($('#cities').hasClass('initialized') && $('#cities').val() !== null) {
            var city = $('#cities option:selected').val();
            searchQuery.city = city;
            // show categories
            $('.categories').show();
            $('#categories').material_select();
        }
    }

    $('#categories').change(function() {
        var categories = $('#categories').val();
        searchQuery.categories = categories;
        $('#trip-search-submit').show();
    });

    $('#trip-search-submit').click(function(event) {
        event.preventDefault();
        // check if user completed the form (chose amenities)
        if (searchQuery.categories !== null) {

            // redriect url when form is submitted
            var url = '/search/' + searchQuery.country + '/' + searchQuery.city + '/' + searchQuery.categories;

            // console.log(searchQuery);
            console.log(url);
            location.assign(url);
        } else {
            console.log('fill out forms');
        }
    })

    var cook = Cookies.get('name');


    if (cook === undefined) {

        $(".login").show();
        $(".logout").hide();
        $(".loginstuff").hide();
        $(".card-action").hide();
        $(".fixed-action-btn").hide();

        return false;
    }

    $(".welcome").html("Welcome Back, " + cook);
    $(".logout").show();
    $(".login").hide();
    $(".loginstuff").show();
    $(".card-action").show();
    $(".fixed-action-btn").show();
    $(".names").prepend(cook + "'s ")


});

$(".logout").on("click", function(event) {

    Cookies.remove('name');
    $(".login").show();
    $(".logout").hide();
    location.reload();
});

$(".saved").on("click", function(event) {
    var cook = Cookies.get('name');

    location.assign("/saved/" + cook);

});


$(".future").on("click", function(event) {
    var cook = Cookies.get('name');

    location.assign("/future/" + cook);

});

