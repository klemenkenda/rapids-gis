// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents
import './css/TrafficData.css';
import { lZ } from '../lib/Utils';

// defining types
type Props = {
    data: Array
};
type State = {};

/**
 * Displaying production lines list.
 */
class TrafficDataTable extends Component<Props, State> {

    render() {

        const data = this.props.data.reverse();

        return <div className="divTrafficData">
            <h3>Senzor {this.props.sensor_id}</h3>
            <a href="#no-data">Zapri</a>
            <table>
                <thead>
                    <th>Čas</th>
                    <th>Vrednost</th>
                </thead>
            {
                data.map((el, i) => {
                    const timestamp = new Date(parseInt(el.ts) * 1000);
                    console.log(el);
                    return <tr key={i}>
                        <td>{lZ(timestamp.getHours()) + ":" + lZ(timestamp.getMinutes())}</td>
                        <td>{el.value} avtov/h</td>
                    </tr>
                })
            }
            </table>
        </div>
    }

}

export default TrafficDataTable;