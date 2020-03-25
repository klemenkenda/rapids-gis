// main imports
import React, { Component } from 'react';

// models
import ReactRouterPropTypes from 'react-router-prop-types';

// backend
import { getBackend } from '../lib/Backend';

// import subcomponents
import TitleNavBar from './TitleNavBar';
import Counter from './Counter';
import FursPin from './FursPin';
import TrafficDataTable from './TrafficDataTable';
import TrafficDataChart from './TrafficDataChart';

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
    sensors: Array,
    furspins: Array,
    fursposts: Array,
    current_ts: number,
    actionable_ts: number,
    action: string,
    traffic_data: Array,
    show_table: boolean,
    show_chart: boolean,
    selected_sensor_id: number
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
            sensors: [],
            furspins: [],
            fursposts: [],
            current_ts: 2147483647,
            actionable_ts: 2147483647,
            action: "live",
            selected_sensor_id: -1
        };
    }

    showData(hash) {
        let data = hash.split("=");
        let sensor_id = parseInt(data[1]);
        if (hash.includes("#table")) {
            this.showTable(sensor_id);
        } else if (hash.includes("#chart")) {
            this.showChart(sensor_id);
        } else {
            this.setState({
                show_table: false,
                show_chart: false
            })
        }
    }

    async showTable(sensor_id) {
        console.log(sensor_id);
        let data = await getBackend().data.getSensorTs(sensor_id);
        this.setState({
            traffic_data: data,
            show_table: true,
            selected_sensor_id: sensor_id
        })
    }

    closeTable() {
        this.setState({
            show_table: false
        })
    }

    async showChart(sensor_id) {
        console.log(sensor_id);
        let data = await getBackend().data.getSensorTs(sensor_id);
        this.setState({
            traffic_data: data,
            show_chart: true,
            selected_sensor_id: sensor_id
        })
    }

    closeChart() {
        this.setState({
            show_chart: false
        })
    }

    componentWillMount() {
        let _self = this;
        this.unlisten = this.props.history.listen((location, action) => {
            _self.showData(location.hash);
            // console.log("on route change", location, action);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    async componentDidMount() {

        try {
            // calculate centre
            // Slovenia
            const view_center = [46.1491664, 14.9860106];

            let layers = [
                L.tileLayer.wms('http://service.geopedia.world/wms/covid19?', {
                    layers: 'ttl2930',
                    format: 'image/png',
                    transparent: false,
                    detectRetina: true
                }),
                L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                }),
            ];

            let trafficLayer = L.layerGroup([]);
            let fursPinsLayer = L.layerGroup([]);
            let olderHomesLayer = L.tileLayer.wms('http://service.geopedia.world/wms/covid19?', {
                layers: 'ttl3073',
                format: 'image/png',
                transparent: true,
                detectRetina: true
            });

            let hospitalLayer = L.tileLayer.wms('http://service.geopedia.world/wms/covid19?', {
                layers: 'ttl3033',
                format: 'image/png',
                transparent: true,
                detectRetina: true
            });

            let pharmacyLayer = L.tileLayer.wms('http://service.geopedia.world/wms/covid19?', {
                layers: 'ttl3034',
                format: 'image/png',
                transparent: true,
                detectRetina: true
            });

            let municipalityLayer = L.tileLayer.wms('http://service.geopedia.world/wms/covid19?', {
                layers: 'ttl3020',
                format: 'image/png',
                transparent: true,
                detectRetina: true
            });


            // GENERATE TRAFFIC layer
            if (false) {
                let places = await getBackend().data.getPlaces();
                let nodes = await getBackend().data.getNodes();
                let sensors = await getBackend().data.getSensors();
                let snapshot = await getBackend().data.getLastSnapshot();

                this.setState({
                    places,
                    nodes,
                    sensors,
                    snapshot
                });

                // GENERATE traffic layer
                // init markers for places (counters)
                let counters = [];
                for (let place of places) {
                    // merge node with place
                    place.nodes = nodes.filter(x => place.uuid === x.place_uuid);

                    let highestPlaceClass = 0;

                    for (let node of place.nodes) {
                        // merge sensors with node
                        node.sensors = sensors.filter(x => x.node_uuid === node.uuid);

                        // merge with snapshot data
                        for (let sensor of node.sensors) {
                            sensor.snap = snapshot.filter(x => x.sensor_id === sensor.id)[0];

                            // extract highest class of the counter (except 6, which is sort of inactive)
                            if (sensor.sensor_type_uuid === "class") {
                                if ((sensor.snap.value > highestPlaceClass) && (sensor.snap.value < 6)) {
                                    highestPlaceClass = sensor.snap.value;
                                }
                            }
                        }
                    }

                    place.class = highestPlaceClass;

                    counters.push(
                        new Counter(this,
                            {
                                x: place.x, y: place.y,
                                title: place.title,
                                class: place.class,
                                data: place
                            },
                            trafficLayer
                        )
                    );
                }
            }

            // GENERATE FURS PINS LAYER
            if (true) {
                let fursposts = await getBackend().data.getFursPosts();
                let furspins = (await getBackend().data.getFursPins()).pins;

                this.setState({
                    fursposts,
                    furspins
                });

                console.log(furspins);

                let pins = [];
                const unique = [...new Set(furspins.map(item => item.cat_ijs_2))];
                let i = 0;
                for (let fp of furspins) {
                    if (i === 0) {
                        console.log(fp);
                        console.log(unique.indexOf(fp.cat_ijs_2));
                    }

                    pins.push(
                        new FursPin(this,
                            {
                                x: fp.lon,
                                y: fp.lat,
                                title: fp.cat_ijs_2,
                                class: unique.indexOf(fp.cat_ijs_2),
                                eur_frac: fp.eur_frac,
                                n_frac: fp.n_frac
                            },
                            fursPinsLayer
                        )
                    )

                    i++;
                }
            }

            // create a map
            this.map = L.map('map', {
                center: view_center,
                zoom: 9,
                layers: [ ...layers, fursPinsLayer ]
            });
            this.map.zoomControl.setPosition('topright');
            L.control.scale().addTo(this.map);
            let baseMaps = {
                "Slovenia Topo": layers[0],
                "Open Street Maps": layers[1],
            };

            let overlayMaps = {
                "FURS pins": fursPinsLayer,
                // "Promet - pretok": trafficLayer,
                "Domovi za starejše občane": olderHomesLayer,
                "Bolnišnice in ZD": hospitalLayer,
                "Lekarne": pharmacyLayer,
                "Občine": municipalityLayer
            }

            L.control.layers(baseMaps, overlayMaps).addTo(this.map);

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
                { this.state.show_table &&
                    <TrafficDataTable
                        data={this.state.traffic_data}
                        sensor_id={this.state.selected_sensor_id} />
                }
                { this.state.show_chart &&
                    <TrafficDataChart
                        data={this.state.traffic_data}
                        sensor_id={this.state.selected_sensor_id} />
                }
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