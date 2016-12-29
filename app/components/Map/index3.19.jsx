import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { isLoaded, bootstrap, dojoRequire } from 'esri-loader';
import { getMapData, getDonorFeatureLayer } from './mapDefHelper';
import { lodDependencies } from './arcDependencyLoader'
import styles from './styles.css';

export default class MapView extends React.Component {

    constructor() {
        super();
        this.createMapPoints = this.createMapPoints.bind(this);
        lodDependencies().then((dependencies) => {
            this.dependencies = dependencies;
            this.initMap();
            //this.bindEvents();
            this.loadMap();
        });
    }

    initMap() {
        var Map = this.dependencies.Map;
        var map = new Map("viewDiv", {
            basemap: "dark-gray",
            center: this.props.location ? [this.props.location.longitude, this.props.location.latitude] : null,
            zoom: 4
        });
        this.map = map;
    }

    loadMap() {
        var esriRequest   = this.dependencies.esriRequest;
        esriRequest({
            url: "/map"
        }).then((response) => {
             this.createMapPoints(response)
        }, (error) => {
            
        });
    }

    createMapPoints(data) {
        var featureLayer = getDonorFeatureLayer(data, this.dependencies);
        this.map.addLayers([featureLayer]);
    }

    bindEvents() {
        let self = this;
        let updateFeature;
        this.map.on("layers-add-result", function(evt) {

            let Query = self.dependencies.Query
            let FeatureLayer = self.dependencies.FeatureLayer
            let AttributeInspector = self.dependencies.AttributeInspector
            let Button = self.dependencies.Button
            let domConstruct = self.dependencies.domConstruct
            let teamsFL = evt.layers[0].layer;
            let selectQuery = new Query();

            self.map.on("click", function(evt) {
                    selectQuery.geometry = evt.mapPoint;
                    selectQuery.distance = 50;
                    selectQuery.units = "miles"
                    selectQuery.returnGeometry = true;
                    teamsFL.selectFeatures(selectQuery, FeatureLayer.SELECTION_NEW, function(features) {
                    if (features.length > 0) {
                        updateFeature = features[0];
                        self.map.infoWindow.setTitle(features[0].getLayer().name);
                        self.map.infoWindow.show(evt.screenPoint, self.map.getInfoWindowAnchor(evt.screenPoint));
                    }
                    else {
                        self.map.infoWindow.hide();
                    }
                });
            });

            self.map.infoWindow.on("hide", function() {
                teamsFL.clearSelection();
            });

            let layerInfos = [{
                'featureLayer': teamsFL,
                'showAttachments': false,
                'isEditable': true,
                'fieldInfos': [
                    {'fieldName': 'University', 'isEditable': false, 'label': 'School:'},
                    {'fieldName': 'WINPER', 'isEditable': true, 'tooltip': 'Win percentage', 'label': 'Win percentage:'},
                    {'fieldName': 'Rd_64_Venue', 'isEditable': false, 'label': 'Rd 1 Venue:'},
                    {'fieldName': 'Rd_64_Result', 'isEditable': true, 'tooltip': 'First round result (W/L)', 'label': 'Rd 1 Result:'},
                    {'fieldName': 'Rd_64_Margin', 'isEditable': true, 'tooltip': 'First round margin of victory/loss', 'label': 'Rd 1 Margin:'}
                ]}
            ];

            let attInspector = new AttributeInspector({
                layerInfos: layerInfos
            }, domConstruct.create("div"));

            //add a save button next to the delete button
            let saveButton = new Button({ label: "Save", "class": "saveButton"},domConstruct.create("div"));
            domConstruct.place(saveButton.domNode, attInspector.deleteBtn.domNode, "after");

            saveButton.on("click", function() {
                updateFeature.getLayer().applyEdits(null, [updateFeature], null);
            });

            attInspector.on("attribute-change", function(evt) {
                //store the updates to apply when the save button is clicked
                updateFeature.attributes[evt.fieldName] = evt.fieldValue;
            });

            attInspector.on("next", function(evt) {
                updateFeature = evt.feature;
                console.log("Next " + updateFeature.attributes.OBJECTID);
            });

            attInspector.on("delete", function(evt) {
                evt.feature.getLayer().applyEdits(null, null, [evt.feature]);
                self.map.infoWindow.hide();
            });

            self.map.infoWindow.setContent(attInspector.domNode);
            self.map.infoWindow.resize(350, 240);

        });
    }

    render() {
        return (
            <div className={styles.mapView}>
                <div id="viewDiv"></div>
            </div>
        );
    }
}