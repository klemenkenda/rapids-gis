// main imports
import React, { Component } from 'react';

// models

// backend

// import subcomponents
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

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
class TrafficDataChart extends Component<Props, State> {

    render() {

        const data = this.props.data.reverse();

        let dataArray = [];

        for (const d of data) {
            dataArray.push([new Date(d.ts * 1000).getTime(), d.value]);
            console.log(new Date(d.ts * 1000));
        }

        const options = {
            chart: {
                type: 'spline'
            },
            title: {
                text: 'Pretok prometa'
            },
            xAxis: {
                title: {
                    text: null
                },
                type: 'datetime', //For time series, x-axis labels will be time
                labels: {
                    //You can format the label according to your need
                    // format: '{value:%H:%m}'
                },
                // min: minDate,
                // max: maxDate,
                minPadding: 0.05,
                maxPadding: 0.05
            },
            series: [
                {
                    name: "Pretork prometa",
                    data: dataArray
                }
            ]
        };

        return <div className="divTrafficData">
            <h3>Senzor {this.props.sensor_id}</h3>
            <a href="#no-data">Zapri</a>
            <div>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>
        </div>
    }

}

export default TrafficDataChart;