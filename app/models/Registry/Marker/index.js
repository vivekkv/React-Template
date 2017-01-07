export class MarkerEntry {

    constructor(markerOption) {
        this.coords = markerOption.coords;
        this.visible = markerOption.visible;
        this.draggable = markerOption.draggable;
    }

    get coords() {
        return this.coords;
    }

    get visible() {
        return this.visible;
    }

    get draggable() {
        return this.draggable;
    }
}