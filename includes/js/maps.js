
/**
 * Created by Jacob on 6/3/14.
 */
var map ;

google.maps.event.addDomListener(window, 'load', initialize);

function initialize()
{
    var mapOptions = {
        center: new google.maps.LatLng(32.06, 34.77),/*Tel Aviv*/
        zoom: 13
    };

    /*Create new Google Map element*/
    map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    /* Adding a markers to the map */
    putMarkers();

    /* Adding style to the map */
    map.setOptions({styles: styles});

}

function putMarkers(){
    origins.forEach(function (origin){
        console.log("print origin: ", origin);
        var latLng = new google.maps.LatLng(origin.locationX, origin.locationY);
        var img = origin.icon;
        var title = origin.title;

        var marker = new google.maps.Marker({
            position: latLng,
            map: map,
            icon: img,
            animation: google.maps.Animation.DROP, /*Animation drop */
            title: title   /*tooltip message */
        });

        var data = '<div id="content">'+
            '<h1 class="infoWindowHeader">The Header</h1>'+
            '<div class="infoWindowBody">'+
            '<p>this is some text...<br>' +
            'some more text....<br>' +
            'and that is it!</p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: data
        });

        google.maps.event.addListener(marker, 'click', function() {
            infowindow.open(map,marker);
        });
    });
}


var styles  = [
    {
        "elementType": "geometry.fill",
        "stylers": [
            { "saturation": -89 },
            { "weight": 0.4 },
            { "visibility": "on" },
            { "invert_lightness": true },
            { "hue": "#ff0000" }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "saturation": -89 },
            { "hue": "#ff0000" },
            { "weight": 0.1 },
            { "color": "#333333" },
            { "visibility": "simplified" }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            { "visibility": "off" }
        ]
    },
    {
        "featureType": "road.local",
        "stylers": [
            { "weight": 0.3 }
        ]
    }];


