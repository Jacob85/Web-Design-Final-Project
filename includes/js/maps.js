
/**
 * Created by Jacob on 6/3/14.
 */

/*-----    global variables    ------*/
var googleMap ;
var markers = [];
var currentOpenMarker = null;

google.maps.event.addDomListener(window, 'load', initialize);

function initialize()
{
    var mapOptions = {
        center: new google.maps.LatLng(32.06, 34.77),/*Tel Aviv*/
        zoom: 13,
        disableDefaultUI: true      /*Remove the streetView and the satellite button*/
    };

    /*Create new Google Map element*/
    googleMap = new google.maps.Map(document.getElementById("main-map"),mapOptions);

    // Parse the json to get all origins.
    $.getJSON( "includes/data.json", function(originsData){
        console.log( "success ", originsData);
    })
        .done(function(originsData) {
            /* Adding markers to the googleMap */
            putMarkers(originsData);
        });

    /* Adding style to the googleMap */
    googleMap.setOptions({styles: ns_data.styles});

    /*Add Events*/
    addListenerToMap(googleMap);
}

// Put all the markers and info windows on the map.
function putMarkers(originsData){
    var index = 0; // Current marker index.

    // Transform the json object to array.
    var originsArray = [];
    originsData.origins.forEach(function(ob){
        originsArray.push(ob);
    });

    // Go over the origins array and add them to the map.
    originsArray.forEach(function (origin){
        var latLng = new google.maps.LatLng(origin.locationX, origin.locationY);
        var img = origin.icon;
        var title = origin.title;

        var marker = new google.maps.Marker({
            position: latLng,
            map: googleMap,
            icon: img,
            animation: google.maps.Animation.DROP, /*Animation drop */
            title: title   /*tooltip message */
        });

        // Create the info window as string data.
        var data = '<div class="infoWindow" id="'+ origin.infoWindowId +'">'+
            '<div class="infoLeftButton" onclick="leftButtonPressed(' + index + ');"></div>'+
            '<div class="infoBody"><p>'+ origin.date + '</p><p>'+ origin.address + '</p><br><a target="_blank" href="'+ origin.siteLink + '">GO TO SITE</a> </div>'+
            '<div class="infoRightButton" onclick="rightButtonPressed(' + index + ');"></div>'+
            '<div class="clear"></div>'+
            '</div>';

        var infoWindow = new google.maps.InfoWindow({
            content: data
        });

        marker.infoWindow = infoWindow;
        //push the markers to the global array (so we can remove them from map while zoom changes)
        markers.push(marker);

        // Deal with marker click event.
        google.maps.event.addListener(marker, 'click', function() {
            if(isInfoWindowOpen(infoWindow)){
                infoWindow.close();
                currentOpenMarker = null;
            }
            else{
                if (currentOpenMarker != null){
                    currentOpenMarker.infoWindow.close();
                }
                infoWindow.open(googleMap, marker);
                currentOpenMarker = marker;
            }
        });

        index++;
    });
}

// Move to previous info window.
function leftButtonPressed(index){
    var pos = index - 1 < 0 ? markers.length - 1 : index - 1;

    markers[index].infoWindow.close();
    markers[pos].infoWindow.open(googleMap, markers[pos]);
}

// Move to next info window.
function rightButtonPressed(index){
    var pos = index + 1 > markers.length - 1 ? 0 : index + 1;

    markers[index].infoWindow.close();
    markers[pos].infoWindow.open(googleMap, markers[pos]);
}

// Check if info window is open or closed.
function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}



