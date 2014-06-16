/**
 * Created by Jacob on 6/7/14.
 */


var zoomOutCenter = new google.maps.LatLng(50.370519205127344, -37.12453125000003);

function addListenerToMap(googleMap)
{
    google.maps.event.addListener(googleMap, 'zoom_changed', function()
    {
        var zoomLevel = googleMap.getZoom();
        console.log("Zoom Level = " + zoomLevel);

        if (zoomLevel > 3)
        {
            removeLines();
        }
        else
        {
            drawLines(googleMap);
        }
        if (zoomLevel <= 8)
        {
            //make sure the markers are not display
            removeMarkers();
            $('#zoomOutButton').hide();
            $('#miniMapFrame').hide(200);
        }
        else
        {
            //display the markers
            displayMarkers(googleMap);
            $('#zoomOutButton').show();
            if (currentOpenMarker != null && isInfoWindowOpen(currentOpenMarker.infoWindow)){
                $('#miniMapFrame').show(200);
            }
            removeLines();
        }
    });

    google.maps.event.addListener(googleMap, 'dragend', function(){
        console.log("center changed: " + googleMap.getCenter());
        mapCenter = googleMap.getCenter();
    });
}

function displayMarkers(googleMap)
{
    setAllMarkerMap(googleMap);
}
function removeMarkers()
{
   setAllMarkerMap(null);
}

// Sets the map on all markers in the array.
function setAllMarkerMap(map)
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
        $('#miniMapFrame').hide(200);
        if (currentOpenMarker != null){
            currentOpenMarker.infoWindow.close();
        }
        googleMap.setZoom(3);
        googleMap.panTo(zoomOutCenter);

        //drawLines(googleMap);
    });
});

/**
* Moving the map camera to the center of every time the window is resided
*/
$( window ).resize(function() {
    console.log("Moving the map to: ", mapCenter);
    googleMap.panTo(mapCenter);
});

function drawLines(googleMap)
{
    console.log("draw lines called");
    /* Add you'r curved lines here */
    setLinesToMap(googleMap);
}
function removeLines ()
{
    setLinesToMap(null);
}
function setLinesToMap(googleMap)
{
    for (var i=0; i<lines.length; i++)
    {
        lines[i].setMap(googleMap)
    }
}
