$(function() {
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

                // search country code by country name
                getCountryCode(country);
              
            }
        } ],  
        "export": {
        "enabled": false,
        "position": "bottom-right"
        }
    });

    function getCountryCode (country) {
        // once country is selected, make get request to get country code
        var queryUrl = 'http://battuta.medunes.net/api/country/search/?country=' + country + '&key=7eb01d03d5b19318c32d8d7e7c73a5ba';
        $.ajax({
            method: 'GET',
            dataType: 'jsonp',
            url: queryUrl,
            success: function (response) {
                var countryCode = response[0].code;

                // search regions by country code -- api docs for battuta requires region search by country code
                getRegions(countryCode);
            }
        })
    }

    function getRegions (countryCode) {
        var queryUrl = 'http://battuta.medunes.net/api/region/' + countryCode + '/all/?key=7eb01d03d5b19318c32d8d7e7c73a5ba';
        // with country code, query for regions
        $.ajax({
            method: 'GET',
            dataType: 'jsonp',
            url: queryUrl,
            success: function (response) {
                console.log(response);
                // destroy and recreate select options
                // allows user to pick a different country without reloading page
                $('#regions').empty();

                // placeholder for dropdown options
                $('#regions').append('<option value="" disabled selected>Choose a region</option>');     

                // add all regions from query into list
                    // populate dropdown list with regions to select from
                for (var i=0; i < response.length; i++) {
                    var region = $('<option>').addClass('region').attr('value', response[i].region).text(response[i].region);
                    $('#regions').append(region);
                }
                
                // show regions dropdown newly populated with regions           
                $('#regions').material_select();

                // add on click listener on dropdown item
                // on click, get request for region's cities
                // console.log($('#regions').val());

            }
        })
    }

});