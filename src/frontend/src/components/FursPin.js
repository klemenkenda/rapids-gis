// models

// backend

// import subcomponents

// import libraries
import L from 'leaflet';

// defining types

/**
 * Handling an orienteer.
 */
class FursPin {
    constructor(gis, props, map) {
        // remembering pointer to the Live component
        this.parent = gis;

        // handling inherited props of a user
        this.props = props;
        this.data = this.props.data;

        // handling map related issues
        this.color = this.getColor(this.props.class);
        this.map = map;

        // render marker and tail
        this.initMarker();
    }

    /**
     * Creates initial marker and track (tail) objects for a competitor.
     */
    initMarker() {
        // add marker
        this.marker = L.circleMarker([this.props.y, this.props.x],
            {
                radius: 4 + Math.min(0.3 + this.props.n_frac * 60, 12),
                color: 'black', weight: 1,
                fillColor: this.color,
                fillOpacity: Math.min(0.3 + this.props.eur_frac * 10, 1),
            })
            .bindTooltip(this.props.title + ":<br>" +
                (this.props.n_frac * 100).toFixed(2) + "% transakcij<br>" +
                (this.props.eur_frac * 100).toFixed(2) + "% EUR",
            {
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
            'darkgray',
            'darkslategray',
            'seagreen',
            'olive',
            'springgreen',
            'greenyellow',
            'khaki',
            'gold',
            'lightsalmon',
            'darkorange',
            'red',
            'maroon2',
            'purple',
            'deeppink',
            'fuchsia',
            'palevioletred',
            'violet',
            'aquamarine',
            'deepskyblue',
            'royalblue',
            'blue',
        ];

        return colors[i % colors.length];
    }

}

export default FursPin;