// let pg = require('pg');
const { Pool } = require('pg');

class PgDataStorageService {

    constructor() {
        this.config = require('../../common/config.json').storage.rapidsgis;
        // connecting to DB
        this.pool = new Pool({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            database: this.config.db,
        })
    }

    async getSnapshot() {
        try {
            // find last timestamp
            let timestamp = await this.pool.query(`select max(measurement_ts) as ts from rapids_iot.measurements`);

            let ts = timestamp.rows[0].ts;

            let query = `
            select
                extract(epoch from measurement_ts) as ts,
                sensor_id, value, sensor_type_uuid, uom,
                nodes.uuid as node_uuid
            from
                rapids_iot.measurements,
                rapids_iot.sensors,
                rapids_iot.nodes,
                rapids_iot.sensor_types
            where
                measurement_ts = $1 and
                measurements.sensor_id = sensors.id and
                sensors.node_uuid = nodes.uuid and
                sensor_type_uuid = sensor_types.uuid
            `;
            let records = await this.pool.query(query, [ ts ]);
            return(records.rows);

        } catch(err) {
            console.log(err);
            throw(err);
        }
    }


    async getPlaces() {
        try {
            let query = `select * from rapids_iot.places`;
            let records = await this.pool.query(query);
            return(records.rows);

        } catch(err) {
            console.log(err);
            throw(err);
        }
    }


    async getNodes() {
        try {
            let query = `select * from rapids_iot.nodes`;
            let records = await this.pool.query(query);
            return(records.rows);

        } catch(err) {
            console.log(err);
            throw(err);
        }
    }


    async getSensors() {
        try {
            let query = `select * from rapids_iot.sensors`;
            let records = await this.pool.query(query);
            return(records.rows);

        } catch(err) {
            console.log(err);
            throw(err);
        }
    }


    async getSensorTs(sensor_id) {
        try {
            let query = `
            select
                extract(epoch from measurement_ts) as ts,
                value
            from
                rapids_iot.measurements
            where
                sensor_id = $1 and
                measurement_ts >= (now() - interval '1 day')`;

            let records = await this.pool.query(query, [ sensor_id ]);
            return(records.rows);

        } catch(err) {
            console.log(err);
            throw(err);
        }
    }

}

module.exports = PgDataStorageService;