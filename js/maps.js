
/**
 * Created by Jacob on 6/3/14.
 */

/*-----    global variables    ------*/
var googleMap;
var miniMap;
var markers = [];
var lines = [];
var currentOpenMarker = null;
var mapCenter = new google.maps.LatLng(32.06, 34.77);/*Tel Aviv*/
var miniMapCenter;


google.maps.event.addDomListener(window, 'load', initialize);

function initialize()
{
    var mapOptions = {
        center: mapCenter,
        zoom: 13,
        disableDefaultUI: true      /*Remove the streetView and the satellite button*/
    };

    /*Create new Google Map element*/
    googleMap = new google.maps.Map(document.getElementById("mainMap"),mapOptions);

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

    // Remove the mini map frame until we show any marker.
    $('#miniMapFrame').hide();
}

function initMiniMap(lat, lng){
    miniMapCenter = new google.maps.LatLng(lat, lng);

    var miniMapOptions = {
        center: miniMapCenter,
        zoom: 5,
        disableDefaultUI: true
    }

    miniMap = new google.maps.Map(document.getElementById("miniMap"), miniMapOptions);
    miniMap.setOptions({styles: ns_data.styles});
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
        var destX = origin.destinationX;
        var destY = origin.destinationY;

        var marker = new google.maps.Marker({
            position: latLng,
            map: googleMap,
            icon: img,
            animation: google.maps.Animation.DROP, /*Animation drop */
            title: title,   /*tooltip message */
            destinationX: destX,
            destinationY: destY
        });
        var line = new google.maps.Polyline({
            path: [new google.maps.LatLng(origin.locationX, origin.locationY), new google.maps.LatLng(destX, destY)],
            strokeColor: origin.lineColor,
            strokeOpacity: 1.0,
            strokeWeight: 1,
            geodesic: true,
            map: null
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
        lines.push(line);

        // Deal with marker click event.
        google.maps.event.addListener(marker, 'click', function() {
            if(isInfoWindowOpen(infoWindow)){
                infoWindow.close();
                currentOpenMarker = null;
                $('#miniMapFrame').hide(200);
            }
            else{
                $('#miniMapFrame').show(200);
                initMiniMap(marker.destinationX, marker.destinationY);
                if (currentOpenMarker != null){
                    currentOpenMarker.infoWindow.close();
                }
                infoWindow.open(googleMap, marker);
                currentOpenMarker = marker;
            }
        });

        google.maps.event.addListener(infoWindow,'closeclick',function(){
            $('#miniMapFrame').hide(200);
        });

        index++;
    });
}

// Move to previous info window.
function leftButtonPressed(currentIndex){
    var nextIndex = currentIndex - 1 < 0 ? markers.length - 1 : currentIndex - 1;

    moveToNextInfoWindow(currentIndex, nextIndex);
}

// Move to next info window.
function rightButtonPressed(currentIndex){
    var nextIndex = currentIndex + 1 > markers.length - 1 ? 0 : currentIndex + 1;

    moveToNextInfoWindow(currentIndex, nextIndex);
}

// Close the current info window and open the next one.
function moveToNextInfoWindow(currentIndex, nextIndex)
{
    markers[currentIndex].infoWindow.close();
    markers[nextIndex].infoWindow.open(googleMap, markers[nextIndex]);

    initMiniMap(markers[nextIndex].destinationX, markers[nextIndex].destinationY);
    currentOpenMarker = markers[nextIndex];
}

// Check if info window is open or closed.
function isInfoWindowOpen(infoWindow){
    var map = infoWindow.getMap();
    return (map !== null && typeof map !== "undefined");
}



