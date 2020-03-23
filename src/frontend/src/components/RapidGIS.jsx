// main imports
import React, { Component } from 'react';

// models
import ReactRouterPropTypes from 'react-router-prop-types';

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents
import TitleNavBar from './TitleNavBar';
import Counter from './Counter';

// import libraries
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// defining types
type Props = {
    match: ReactRouterPropTypes.match,
    history: ReactRouterPropTypes.history,
    location: ReactRouterPropTypes.location
};

type State = {
    places: Array,
    snapshot: Array,
    nodes: Array,
    current_ts: number,
    actionable_ts: number,
    action: string
};

/**
 * Displaying production lines list.
 */
class Live extends Component<Props, State> {

    constructor(props, state) {
        super(props);
        this.state = {
            places: [],
            snapshot: [],
            nodes: [],
            current_ts: 2147483647,
            actionable_ts: 2147483647,
            action: "live"
        };
    }


    async componentDidMount() {

        try {
            // calculate centre
            // Slovenia
            const view_center = [46.1491664, 14.9860106];

            let layers = [
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                })
            ];

            // create a map
            this.map = L.map('map', {
                center: view_center,
                zoom: 9,
                layers: layers
            });
            this.map.zoomControl.setPosition('topright');
            L.control.scale().addTo(this.map);

            // let event = await getBackend().live.getEvent(this.event_id);
            let places = await getBackend().data.getPlaces();
            let nodes = await getBackend().data.getNodes();
            let snapshot = await getBackend().data.getLastSnapshot();

            this.setState({
                places,
                nodes,
                snapshot
            });

            console.log(places[0], nodes[0], snapshot[0]);

            // init markers for places (counters)
            let counters = [];
            let i = 0;
            for (const place of places) {
                if (i < 10) {
                    console.log(place);
                };
                counters.push(
                    new Counter(this, { x: place.x, y: place.y, title: place.title }, this.map)
                );
                i++;
            }


            // add map image dynamically
            /*
            let imageUrl = '/maps/' + event.map.filename;
            let imageBounds = [coordinates[3], coordinates[1]];
            this.mapImageDB = L.imageOverlay(imageUrl, imageBounds).addTo(this.map);
            */

            // updating
            // this.countdown = setInterval(() => this.loadTracks(this.event_id), 1000);
        } catch (e) {
            console.log(e);
            throw e;
        }

    }

    handleChange(event: Event) {
        let target = event.target;
        if (target instanceof HTMLInputElement) {
            const field = target.id;
            const value = target.type === 'checkbox' ?
                target.checked : target.value;
            // update
            this.setState(prev_state => {
                prev_state[field] = value;
                return prev_state;
            });
        }
    };

    render() {
        return <div>
            <div id="map" style={{width: "100%", height: "100vh"}}>
                <TitleNavBar />
                {/*
                <LiveNavBar
                    handleChange={ (e) => this.handleChange(e) }
                    setReplayState={ () => this.setLiveState("replay") }
                    setLiveState={ () => this.setLiveState("live") }
                    startStopReplay={ () => this.startStopReplay() }
                    show_tail={this.state.show_tail}
                    show_labels={this.state.show_labels}
                    show_track={this.state.show_track}
                    tail_length={this.state.tail_length}
                    orienteers={this.orienteers}
                    timestamp={this.state.actionable_ts} />
                */}
            </div>
        </div>
    }

}

export default Live;