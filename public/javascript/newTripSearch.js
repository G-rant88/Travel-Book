$(function() {
    // object to be sent to the results page
    var searchQuery = {
        country: null,
        region: null,
        city: null,
        categories: null
    }

    // capture country upon map click
    var map = AmCharts.makeChart( "chartdiv", {
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
        "listeners": [ {
        "event": "clickMapObject",
        "method": function( event ) {
                var country;  

                // deselect the area by assigning all of the dataProvider as selected object
                map.selectedObject = map.dataProvider;
    
                // toggle showAsSelected
                event.mapObject.showAsSelected = !event.mapObject.showAsSelected;
    
                map.returnInitialColor( event.mapObject );
    
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

                searchQuery.country = country.toLowerCase();

                $('#regions').material_select('destroy');
                $('#cities').material_select('destroy');
                $('#categories').material_select('destroy');
                // search country code by country name
                findCountry(country);
              
            }
        } ],  
        "export": {
        "enabled": false,
        "position": "bottom-right"
        }
    });
    //*************************************************//
    function findCountry (country) {
        // once country is selected, make get request to get country code
        var queryUrl = 'https://api.teleport.org/api/countries/';
        $.ajax({
            method: 'GET',
            url: queryUrl,
            success: function (response) {
                var countries = response['_links']['country:items'];
                for (var i=0; i < countries.length; i++) {
                    if (country === countries[i].name) {
                        // console.log(country + ' was found!');
                        // pass url to next function to make get req
                        getRegions(countries[i].href);
                    }
                }
            }
        })
    }

    function getRegions (url) {
        $.ajax({
            method: 'GET',
            url: url,
            success: function (response) {
                var url = response['_links']['country:admin1_divisions'].href;
                displayRegions(url);
            }
        })
    }

    function displayRegions (url) {
        // with country code, query for regions
        $.ajax({
            method: 'GET',
            url: url,
            success: function (response) {
                // destroy and recreate select options
                // allows user to pick a different country without reloading page
                $('#regions').empty();

                // placeholder for dropdown options
                $('#regions').append('<option value="" disabled selected>Choose a region</option>');     

                var regions = response['_links']['a1:items'];
                // add all regions from query into list
                    // populate dropdown list with regions to select from
                for (var i=0; i < regions.length; i++) {
                    var region = $('<option>').addClass('region').attr('value', regions[i].name).text(regions[i].name).attr('link', regions[i].href);
                    $('#regions').append(region);
                }
                
                // show regions dropdown newly populated with regions           
                $('#regions').material_select();

            }
        })
    }

    // listens for any changes made to the dropdown
    $('#regions').change(getRegion);

    function getRegion () {
        // if select is initialized and a region was selected, run search query for cities based on region
        if ($('#regions').hasClass('initialized') && $('#regions').val() !== null) {
            var region = $('#regions option:selected').val();
            //console.log(region);
            searchQuery.region = region.toLowerCase();
            var url = $('#regions option:selected').attr('link');
            //console.log(url);
            displayCities(url);
        }
    }

    //////////////////////////////////////////////////////////

    function displayCities (url) {
        $.ajax({
            method: 'GET',
            url: url + '/cities/',
            success: function (response) {
                // destroy and recreate select options
                // allows user to pick a different country without reloading page
                $('#cities').empty();

                // placeholder for dropdown options
                $('#cities').append('<option value="" disabled selected>Choose a city</option>');     

                var cities = response['_links']['city:items'];
                
                // add all cities from query into list
                // populate dropdown list with cities to select from
                for (var i=0; i < cities.length; i++) {
                    var city = $('<option>').addClass('city').attr('value', cities[i].name).text(cities[i].name).attr('link', cities[i].href);
                    $('#cities').append(city);
                }
                
                // show cities dropdown newly populated with cities           
                $('#cities').material_select();
            }
        })
    }

    // listens for any changes made to the dropdown
    $('#cities').change(getCity);
    
    function getCity () {
        // if select is initialized and a city was selected, run search query for cities based on city
        if ($('#cities').hasClass('initialized') && $('#cities').val() !== null) {
            var city = $('#cities option:selected').val();
            searchQuery.city = city.toLowerCase();
            // show categories
            $('#categories').material_select();
        }
    }

    $('#categories').change(function () {
        var categories = $('#categories').val();
        searchQuery.categories = categories;
    });

    $('#trip-search-submit').click(function (event) {
        event.preventDefault();
        // check if user completed the form (chose amenities)
        if (searchQuery.categories !== null) {

            // redriect url when form is submitted
            var url = '/search/' + searchQuery.country + '/' + searchQuery.city + '/' + searchQuery.categories.join('+');
        
            // console.log(searchQuery);
             console.log(url);
            location.assign(url);
            // redirect user to result page
        //     $.ajax({
        //         method: 'GET',
        //         url: url,
        //         success: function (response) {
        //             console.log(url)
        //             console.log('sent');
        //         }
        //     }).then(function(event){

        //         console.log("got");
        //         location.assign("/results")
        //     })
         }
        else {
            console.log('fill out forms');
        }
    })

});


$( document ).ready(function() {
    cook = Cookies.get('name');

    if(cook === undefined){

        $(".login").show();
        $(".logout").hide();
        return false;
    }

    $(".welcome").html("Welcome Back, " + cook);
    $(".logout").show();
    $(".login").hide();

$(".names").prepend(cook+"'s ")


});

$(".logout").on("click", function(event){

        Cookies.remove('name');
         $(".login").show();
        $(".logout").hide();
        location.reload();
});


