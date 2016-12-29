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
        this.createPointLayer = this.createPointLayer.bind(this);
        this.bindMapEvents = this.bindMapEvents.bind(this);
        lodDependencies().then((dependencies) => {
            this.dependencies = dependencies;
            this.initMap();
            this.initView();
            this.loadMap();
        });
    }

    loadMap() {
        this.view.then(() => {
            getMapData(this.dependencies.esriRequest)
                .then(this.createMapPoints)
                .then(this.createPointLayer)
                .then(() => {
                    this.bindMapEvents();
                })
        });
    }

    initMap() {
        var Map = this.dependencies.Map;
        var map = new Map({
            basemap: "dark-gray"
        });
        this.map = map;
    }

    initView() {
        var MapView = this.dependencies.MapView;
        var view = new MapView({
            container: "viewDiv",
            map: this.map,
            center: this.props.location ? [this.props.location.longitude, this.props.location.latitude] : null,
            zoom: 4,
        });
        this.view = view;
    }

    createPointLayer(data) {
        var lyr = getDonorFeatureLayer(data, this.dependencies);
        this.map.add(lyr);
        return lyr;
    }

    createMapPoints(response) {
        var Point = this.dependencies.Point;
        return response.data.features.map((feature, i) => {
            return {
                geometry: new Point({
                    x: feature.geometry.coordinates[0],
                    y: feature.geometry.coordinates[1]
                }),
                attributes: {
                    ObjectID: i,
                    title: feature.properties.title,
                    type: feature.properties.type,
                    place: feature.properties.place,
                    depth: feature.geometry.coordinates[2] + " km",
                    time: feature.properties.time,
                    mag: feature.properties.mag,
                    mmi: feature.properties.mmi,
                    felt: feature.properties.felt,
                    sig: feature.properties.sig,
                    url: feature.properties.url
                }
            };
        });
    }

    bindMapEvents(view) {
        this.view.on("click", function () {
            alert()
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