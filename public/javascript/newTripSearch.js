$(function() {
    // functionality for drop down buttons
    $('select').material_select();
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

                // once country is selected, make get request to get all cities
                var queryUrl = 'http://battuta.medunes.net/api/country/search/?country=' + country + '&key=7eb01d03d5b19318c32d8d7e7c73a5ba';
                $.ajax({
                    method: 'GET',
                    dataType: 'jsonp',
                    url: 'http://battuta.medunes.net/api/region/fr/all/?key=356d8f342d69d5495f4a64390458e841',
                    success: function (response) {
                        // var regions = [];
                        // // add all regions from query into list
                        // for (var i=0; i < response.length; i++) {
                        //     regions.push(response[i].region);
                        // }
                        // console.log(regions);
                        console.log(response);
                    }
                });
            }
        } ],  
        "export": {
        "enabled": false,
        "position": "bottom-right"
        }
    });
});