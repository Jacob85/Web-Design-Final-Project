
/**
 * Created by Jacob on 6/3/14.
 */
var googleMap ;

google.maps.event.addDomListener(window, 'load', initialize);

function initialize()
{
    var mapOptions = {
        center: new google.maps.LatLng(32.06, 34.77),/*Tel Aviv*/
        zoom: 13
    };

    /*Create new Google Map element*/
    googleMap = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);

    /* Adding a markers to the googleMap */
    putMarkers();

    /* Adding style to the googleMap */
    googleMap.setOptions({styles: ns_data.styles});


}

function putMarkers(){

   $.getJSON( "includes/data.json", function(data) {
        console.log( "success" + data);
    })
        .done(function() {
            console.log( "second success" );
        })
        .fail(function(e) {
            console.log( "error" + e );
        })
        .always(function() {
            console.log( "complete" );
        });
    console.log("Out of the Json")
    ns_data.origins.forEach(function (origin){
        console.log("print origin: ", origin);
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
            infowindow.open(googleMap, marker);
        });
    });
}



