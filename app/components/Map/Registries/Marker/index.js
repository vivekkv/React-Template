import _ from 'lodash';

export default class MarkerRegistry {

    constructor() {
        this.markers = [];
    }

    add(id, markerInstance, options) {
        var instance = this.find(id);
        if(instance) {
            this.updateMarker(id, markerInstance, options);
        } else {
            this.addToRegistry(id, markerInstance, options);
        }
    }

    updateMarker(id, markerInstance, options) {
        this.deleteMarker(id);
        this.addToRegistry(id, markerInstance)
    }

    deleteMarker(id) {
        _.remove(this.marker, (m) => {  m.id == id });
    }

    addToRegistry(id, markerInstance, options) {
        this.markers.push({
            "id": id,
            "instance": markerInstance,
            "options": options
        });
    }

    find(id) {
        return _.find(this.markers, (m) => { m.id == id })
    }
    
    markers() {
        return this.markers;
    }
}