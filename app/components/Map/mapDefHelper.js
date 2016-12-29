import {
    dojoRequire
} from 'esri-loader';

export function getMapFields() {
    return [{
        name: "ObjectID",
        alias: "ObjectID",
        type: "oid",
        editable: true,
    }, {
        name: "title",
        alias: "title",
        type: "string",
        editable: true,
    }, {
        name: "type",
        alias: "type",
        type: "string"
    }, {
        name: "place",
        alias: "place",
        type: "string",
        editable: true,
    }, {
        name: "depth",
        alias: "depth",
        type: "string",
        editable: true,
    }, {
        name: "time",
        alias: "time",
        type: "date",
        editable: true,
    }, {
        name: "mag",
        alias: "Magnitude",
        type: "double",
        editable: true,
    }, {
        name: "url",
        alias: "url",
        type: "string",
        editable: true,
    }, {
        name: "mmi",
        alias: "intensity",
        type: "double",
        editable: true,
    }, {
        name: "felt",
        alias: "Number of felt reports",
        type: "double",
        editable: true,
    }, {
        name: "sig",
        alias: "significance",
        type: "double",
        editable: true,
    }];

}

export function getPopupTemplate() {
    return {
        title: "{title}",
        content: [{
            type: "fields",
            fieldInfos: [{
                fieldName: "place",
                label: "Location",
                editable: true,
                visible: true
            }, {
                fieldName: "time",
                label: "Date and time",
                editable: true,
                visible: true
            }, {
                fieldName: "mag",
                label: "Magnitude",
                editable: true,
                visible: true
            }, {
                fieldName: "mmi",
                label: "Intensity",
                editable: true,
                visible: true
            }, {
                fieldName: "depth",
                editable: true,
                label: "Depth",
                visible: true
            }, {
                fieldName: "felt",
                label: "Number who felt the quake",
                editable: true,
                visible: true,
                format: {
                    digitSeparator: true,
                    places: 0
                }
            }, {
                fieldName: "sig",
                editable: true,
                label: "Significance",
                visible: true
            }, {
                fieldName: "url",
                label: "More info",
                editable: true,
                visible: true
            }]
        }],
        fieldInfos: [{
            fieldName: "time",
            editable: true,
            format: {
                dateFormat: "short-date-short-time"
            }
        }]
    };
}

export function getMapData(esriRequest) {
    return esriRequest("/map", {
        responseType: "json"
    });
}

export function getMapRendererForDonor(SimpleRenderer, SimpleMarkerSymbol) {
    return new SimpleRenderer({
        symbol: new SimpleMarkerSymbol({
            style: "circle",
            size: 20,
            color: [211, 255, 0, 0],
            outline: {
                width: 1,
                color: "#FF0055",
                style: "solid"
            }
        }),
        visualVariables: [{
            type: "size",
            field: "mag", // earthquake magnitude
            valueUnit: "unknown",
            minDataValue: 2,
            maxDataValue: 7,
            // Define size of mag 2 quakes based on scale
            minSize: {
                type: "size",
                expression: "view.scale",
                stops: [{
                    value: 1128,
                    size: 12
                }, {
                    value: 36111,
                    size: 12
                }, {
                    value: 9244649,
                    size: 6
                }, {
                    value: 73957191,
                    size: 4
                }, {
                    value: 591657528,
                    size: 2
                }]
            },
            // Define size of mag 7 quakes based on scale
            maxSize: {
                type: "size",
                expression: "view.scale",
                stops: [{
                    value: 1128,
                    size: 80
                }, {
                    value: 36111,
                    size: 60
                }, {
                    value: 9244649,
                    size: 50
                }, {
                    value: 73957191,
                    size: 50
                }, {
                    value: 591657528,
                    size: 25
                }]
            }
        }]
    });

}

export function getDonorFeatureLayer(data, dependencies) {
    var FeatureLayer = dependencies.FeatureLayer;
    return new FeatureLayer({
        source: data, // autocast as an array of esri/Graphic
        objectIdField: "ObjectID", // This must be defined when creating a layer from Graphics
        renderer: getMapRendererForDonor(dependencies.SimpleRenderer, dependencies.SimpleMarkerSymbol), // set the visualization on the layer
        spatialReference: {
            wkid: 4326
        },
        geometryType: "point", // Must be set when creating a layer from Graphics
        fields: getMapFields(), // This is required when creating a layer from Graphics
        popupTemplate: getPopupTemplate()
    });
}

// export function getDonorFeatureLayer(data, dependencies) {

    
//     var FeatureLayer = dependencies.FeatureLayer;
//     var SimpleMarkerSymbol = dependencies.SimpleMarkerSymbol;
//     var SimpleLineSymbol = dependencies.SimpleLineSymbol;
//     var Color = dependencies.Color
//     var UniqueValueRenderer = dependencies.UniqueValueRenderer

//     var teamsFL = new FeatureLayer( {
//         source: data,
//         outFields: ["*"],
//     });

//     var selectionSymbol = new SimpleMarkerSymbol(
//         SimpleMarkerSymbol.STYLE_CIRCLE, 6,
//         new SimpleLineSymbol("solid", new Color([255, 0, 0, 0.5]), 4),
//         new Color("#ED3939")
//     );
//     var defaultSymbol = new SimpleMarkerSymbol(
//         SimpleMarkerSymbol.STYLE_CIRCLE, 7,
//         null,
//         new Color([255, 255, 255])
//     );

//     teamsFL.setSelectionSymbol(selectionSymbol);

//     //Symbolize features by W/L record
//     var recordRenderer = new UniqueValueRenderer(defaultSymbol, "place");
//     recordRenderer.addValue("W", new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 7, null, new Color([93, 240, 79])));
//     recordRenderer.addValue("L", new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 7, null, new Color([240, 146, 79])));
//     teamsFL.setRenderer(recordRenderer);
//     return teamsFL;
// };