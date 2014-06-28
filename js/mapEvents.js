/**
 * Created by Jacob on 6/7/14.
 */


var zoomOutCenter = new google.maps.LatLng(50.370519205127344, -37.12453125000003);
var deviceFilterOn = false;
var dayNightFilterOn = false;

function addListenerToMap(googleMap)
{
    google.maps.event.addListener(googleMap, 'zoom_changed', function()
    {
        var zoomLevel = googleMap.getZoom();
        console.log("Zoom Level = " + zoomLevel);

        if (zoomLevel < 7) // Remove the markers and zoom button. Draw the lines.
        {
            drawLines(googleMap);
            removeMarkers();
            $('#zoomOutButton').hide();
            $('#miniMapFrame').hide(200);
        }
        else // Draw the markers and zoom button. Remove the lines.
        {
            removeLines();
            //display the markers
            displayMarkers(googleMap);
            $('#zoomOutButton').show();

            // If any marker's info window is open - show the mini map.
            if (currentOpenMarker != null && isInfoWindowOpen(currentOpenMarker.infoWindow)){
                $('#miniMapFrame').show(200);
            }
        }
    });

    // If map was dragged - save new center.
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
 * Add onclick event to the buttons.
 */
$( document ).ready(function(){

    var path = window.location.pathname;

    $('#zoomOutButton').click(function(){
        console.log("zoomOutButton Clicked");
        $('#miniMapFrame').hide(200);
        if (currentOpenMarker != null){
            currentOpenMarker.infoWindow.close();
        }
        googleMap.setZoom(3);
        googleMap.panTo(zoomOutCenter);
    });

    $('#filterDayNight').click(function(){
        console.log("day night filter Clicked");

        if (dayNightFilterOn){
            $('#filterDayNight').css("background-image", "url("+path+"/../images/filterDayNight.png)");
            dayNightFilterOn = false;
        }
        else{
            $('#filterDayNight').css("background-image", "url("+path+"/../images/filterDayNightOn.png)");
            dayNightFilterOn = true;
            if (deviceFilterOn){
                $('#filterDevice').css("background-image", "url("+path+"/../images/filterDevice.png)");
                deviceFilterOn = false;
            }
        }

        removeLines();
        drawLines(googleMap);
    });

    $('#filterDevice').click(function(){
        console.log("device filter Clicked");

        if (deviceFilterOn){
            $('#filterDevice').css("background-image", "url("+path+"/../images/filterDevice.png)");
            deviceFilterOn = false;
        }
        else{
            $('#filterDevice').css("background-image", "url("+path+"/../images/filterDeviceOn.png)");
            deviceFilterOn = true;
            if (dayNightFilterOn){
                $('#filterDayNight').css("background-image", "url("+path+"/../images/filterDayNight.png)");
                dayNightFilterOn = false;
            }
        }

        removeLines();
        drawLines(googleMap);
    });
});


/**
* Moving the map camera to the center of every time the window is resided
*/
$( window ).resize(function() {
//    console.log("Moving the map to: ", mapCenter);
    googleMap.panTo(mapCenter);
});


function removeLines()
{
    drawLines(null);
}
function drawLines(googleMap)
{
    if(googleMap == null){
        lines.forEach(function(line){
            line.setMap(null);
        });
    }
    else if(deviceFilterOn){
        lines.forEach(function(line){
            line.strokeColor = line.lineColor.device;
            line.setMap(googleMap);
        });
    }
    else if(dayNightFilterOn){
        lines.forEach(function(line){
            line.strokeColor = line.lineColor.ampm;
            line.setMap(googleMap);
        });
    }
    else{
        lines.forEach(function(line){
            line.strokeColor = line.lineColor.none;
            line.setMap(googleMap);
        });
    }
}
