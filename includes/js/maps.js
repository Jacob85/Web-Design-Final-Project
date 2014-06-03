/**
 * Created by Jacob on 6/3/14.
 */
function initialize()
{
    var mapOptions = {
        center: new google.maps.LatLng(32.06, 34.77),/*Tel Aviv*/
        zoom: 12
    };
    /*Create new Google Map element*/
    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
}

google.maps.event.addDomListener(window, 'load', initialize);