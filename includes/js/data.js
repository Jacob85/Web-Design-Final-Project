/**
 * Created by Eyalkd on 04/06/14.
 */

/* Creating namespace - data */
var ns_data = {};

/* origins is a array object for all the locations of origin*/
ns_data.origins = [
    {
        "locationX": "32.04",
        "locationY": "34.77",
        "icon": 'includes/images/thumb_Facebook_icon.png',
        "title": 'first marker',
        "date": 'JAN 25 2014 - 9:45 PM',
        "address": 'Dizingoff, Tel-aviv',
        "siteLink": '#',
        "infoWindowId": "infoWindow1"
    },
    {
        "locationX": "32.06",
        "locationY": "34.77",
        "icon": 'includes/images/thumb_Facebook_icon.png',
        "title": 'second marker',
        "date": 'FEB 27 2014 - 11:30 PM',
        "address": 'Namir, Tel-aviv',
        "siteLink": '#',
        "infoWindowId": "infoWindow2"
    },
    {
        "locationX": "32.08",
        "locationY": "34.77",
        "icon": 'includes/images/thumb_Facebook_icon.png',
        "title": 'third marker',
        "date": 'JAN 1 2014 - 15:20 PM',
        "address": 'Even gvirol, Tel-aviv',
        "siteLink": '#',
        "infoWindowId": "infoWindow3"
    }];

/* styles is a array object for the google googleMap style definitions*/
ns_data.styles  = [
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