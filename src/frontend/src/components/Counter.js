// models

// backend

// import subcomponents

// import libraries
import L from 'leaflet';

// defining types

/**
 * Handling an orienteer.
 */
class Counter {
    constructor(gis, props, map) {
        // remembering pointer to the Live component
        this.parent = gis;

        // handling inherited props of a user
        this.props = props;
        this.data = this.props.data;

        // handling map related issues
        this.color = 'green'; // this.getColor(i);
        this.map = map;

        // render marker and tail
        this.initMarker();
    }

    /**
     * Creates initial marker and track (tail) objects for a competitor.
     */
    initMarker() {
        // add marker
        this.marker = L.circleMarker([this.props.y, this.props.x], { radius: 6, color: 'black', weight: 1, fillColor: this.color, fillOpacity: 1 })
            .bindTooltip(this.props.title, {
                permanent: false,
                direction: 'right',
                offset: new L.Point(10, 0)
            }).addTo(this.map);
    }


    /**
     * Returns the color of the marker/tail.
     * @param {number} i Number of the current competitor in the event.
     */
    getColor(i) {
        const colors = [
            'gray',
            'green',
            'green',
            'orange',
            'orange',
            'red',
            'white'
        ];

        return colors[i % colors.length];
    }

}

export default Counter;