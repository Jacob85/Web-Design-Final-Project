/**
 * Created by Jacob on 6/7/14.
 */


function addListenerToMap(googleMap)
{
    google.maps.event.addListener(googleMap, 'zoom_changed', function()
    {
        var zoomLevel = googleMap.getZoom();
        console.log("Zoom Level = " + zoomLevel);

        if (zoomLevel <= 8)
        {
            //make sure the markers are not display
            removeMarkers();
            $('#zoomOutButton').hide();
        }
        else
        {
            //display the markers
            displayMarkers(googleMap);
            $('#zoomOutButton').show();
        }
    });

    google.maps.event.addListener(googleMap, 'dragend', function(){
        console.log("center changed: ");
        mapCenter = googleMap.getCenter();
    });
}

function displayMarkers(googleMap)
{
    setAllMap(googleMap);
}
function removeMarkers()
{
   setAllMap(null);
}

// Sets the map on all markers in the array.
function setAllMap(map)
{
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
    }
}

/**
 * Add onclick event to the zoom out button.
 */
$( document ).ready(function(){

    $('#zoomOutButton').click(function(){
        console.log("zoomOutButton Clicked");
        googleMap.setZoom(2);
    });
});

/**
* Moving the map camera to the center of every time the window is resided
*/
$( window ).resize(function() {
    console.log("Moving the map to: ", mapCenter);
    googleMap.panTo(mapCenter);
});