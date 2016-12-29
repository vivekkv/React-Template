import { isLoaded, bootstrap, dojoRequire } from 'esri-loader'
import Promise from 'bluebird';

// export function lodDependencies() {
//     return new Promise((resolve) => {
//         bootstrapArcGis().then(() => {
//              dojoRequire([
//                 "esri/map",
//                 "esri/layers/FeatureLayer",
//                 "esri/dijit/AttributeInspector",
//                 "esri/symbols/SimpleLineSymbol",
//                 "esri/symbols/SimpleMarkerSymbol",
//                 "esri/Color",
//                 "esri/renderers/UniqueValueRenderer",
//                 "esri/config",
//                 "esri/tasks/query",
//                 "dojo/dom-construct",
//                 "dijit/form/Button",
//                 "esri/request",
//                 "dojo/domReady!"
//             ], ( Map, FeatureLayer, AttributeInspector, SimpleLineSymbol, SimpleMarkerSymbol, Color, UniqueValueRenderer, esriConfig, Query, domConstruct, Button, esriRequest ) => {
//                 resolve({
//                     'Map': Map,
//                     'FeatureLayer': FeatureLayer,
//                     'AttributeInspector': AttributeInspector,
//                     'SimpleLineSymbol': SimpleLineSymbol,
//                     'SimpleMarkerSymbol': SimpleMarkerSymbol,
//                     'Color': Color,
//                     'UniqueValueRenderer': UniqueValueRenderer,
//                     'esriConfig': esriConfig,
//                     'Query': Query,
//                     'domConstruct': domConstruct,
//                     'Button': Button,
//                     'esriRequest': esriRequest
//                 });
//             });
//         });
//     });
// }

export function lodDependencies() {
    return new Promise((resolve) => {
        bootstrapArcGis().then(() => {
             dojoRequire([
                "esri/views/MapView",
                "esri/Map",
                "esri/layers/FeatureLayer",
                "esri/layers/support/Field",
                "esri/geometry/Point",
                "esri/renderers/SimpleRenderer",
                "esri/symbols/SimpleMarkerSymbol",
                "esri/widgets/Legend",
                "esri/request",
                "dojo/_base/array",
                "dojo/dom",
                "dojo/on",
                "esri/layers/Layer",
                "dojo/domReady!"
            ], (MapView, Map, FeatureLayer, Field, Point, SimpleRenderer, SimpleMarkerSymbol, Legend, esriRequest, arrayUtils, dom, on, Layer) => {
                resolve({
                    'MapView': MapView,
                    'Map': Map,
                    'FeatureLayer': FeatureLayer,
                    'Field': Field,
                    'Point': Point,
                    'SimpleRenderer': SimpleRenderer,
                    'SimpleMarkerSymbol': SimpleMarkerSymbol,
                    'Legend': Legend,
                    'esriRequest': esriRequest,
                    'arrayUtils': arrayUtils,
                    'dom': dom,
                    'on': on,
                    'Layer': Layer
                });
            });
        });
    });
}

function bootstrapArcGis(cb) {
    return new Promise((resolve) => {
        if (!isLoaded()) {
            bootstrap((err) => {
                resolve();
            }, {
                url: 'https://js.arcgis.com/4.2/'
            });
        } else {
            resolve();
        }
    })
}
