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

//    $( "#slider-range" ).on( "slide", function( event, ui ) {
//        console.log("values: ", ui.values);
//        $('#amount')[0].innerHTML = ui.values[0] + " - " + ui.values[1];
//    } );

    $(function() {
        $( "#slider-range" ).slider({
            range: true,
            min: 1,
            max: 91,
            values: [ 1, 91 ],
            slide: function( event, ui ) {
                calculateDateFromAmount(ui);
            }
    })});

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

function calculateDateFromAmount(ui){

    var left;
    var right;

    left = getDateFromVal(parseInt(ui.values[0]));
    right = getDateFromVal(parseInt(ui.values[1]));

    $('#amount')[0].innerHTML = left + " - " + right;
}

function getDateFromVal(val){
    var res;

    if(val <= 16){
        res = val + 14 + "/04/2014";
        if(val + 14 < 10){
            res = "0"+res;
        }
    }
    else if(val > 16 && val <= 47){
        res = val - 16  + "/05/2014";
        if(val - 16 < 10){
            res = "0"+res;
        }
    }
    else if(val > 47 && val <= 77){
        res = val - 47 + "/06/2014";
        if(val - 47 < 10){
            res = "0"+res;
        }
    }
    else{
        res = val - 77 + "/07/2014";
        if(val - 77 < 10){
            res = "0"+res;
        }
    }

    return res;
}

