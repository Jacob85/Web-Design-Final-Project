/**
 * Created by Eyalkd on 04/06/14.
 */

/* Creating namespace - data */
var ns_data = {};

/* styles is a array object for the google googleMap style definitions*/
ns_data.styles  = [
    {
        "stylers": [
            { "invert_lightness": true },
            { "saturation": -100 },
            { "gamma": 1.18 },
            { "weight": 0.2 }
        ]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [
            { "weight": 0.1 },
            { "color": "#a5a4a4" }
        ]
    }
];


/* styles is a array object for the google googleMap style definitions*/
//ns_data.styles  = [
//    {
//        "elementType": "geometry.fill",
//        "stylers": [
//            { "saturation": -89 },
//            { "weight": 0.4 },
//            { "visibility": "on" },
//            { "invert_lightness": true },
//            { "hue": "#ff0000" }
//        ]
//    },
//    {
//        "elementType": "labels.text.fill",
//        "stylers": [
//            { "saturation": -89 },
//            { "hue": "#ff0000" },
//            { "weight": 0.1 },
//            { "color": "#333333" },
//            { "visibility": "simplified" }
//        ]
//    },
//    {
//        "featureType": "road",
//        "elementType": "labels.icon",
//        "stylers": [
//            { "visibility": "off" }
//        ]
//    },
//    {
//        "featureType": "road.local",
//        "stylers": [
//            { "weight": 0.3 }
//        ]
//    }];