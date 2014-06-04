/**
 * Created by Eyalkd on 04/06/14.
 */

/* Creating namespace - data */
var ns_data = {};

/* origins is a json object for all the locations of origin*/
ns_data.origins = [
    {
        "locationX": "32.06",
        "locationY": "34.77",
        "icon": 'includes/images/thumb_Facebook_icon.png',
        "title": 'first marker'
    },
    {
        "locationX": "32.08",
        "locationY": "34.77",
        "icon": 'includes/images/thumb_Facebook_icon.png',
        "title": 'second marker'
    }];

/* styles is a json object for the google map style definitions*/
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