
/**
 * Created by Jacob on 6/3/14.
 */
var map ;

function initialize()
{
    var mapOptions = {
        center: new google.maps.LatLng(32.06, 34.77),/*Tel Aviv*/
        zoom: 12
    };
    /*Create new Google Map element*/
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    /* Adding a marker to the map */
    var image = 'includes/images/thumb_Facebook_icon.png';
    var myLatlng = new google.maps.LatLng(32.06, 34.77);
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        icon: image,
        animation: google.maps.Animation.DROP, /*Animation drop */
        title:"Hello World!"   /*tooltip message */
    });


}

google.maps.event.addDomListener(window, 'load', initialize);
