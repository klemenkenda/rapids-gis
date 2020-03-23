let mariadb = require('mariadb');

class MariaDBDataStorageService {

    constructor() {
        this.config = require('../../common/config.json').storage.rapidsgis;
        // connecting to DB
        this.pool = mariadb.createPool({
            host: this.config.host,
            user: this.config.user,
            password: this.config.password,
            multipleStatements: true
        });
    }

    async getSnapshot() {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            // find last timestamp
            let timestamp = await conn.query(`select max(measurement_ts) as ts from measurements`);

            let ts = timestamp[0].ts;

            let query = `
            select
                unix_timestamp(measurement_ts) as ts,
                sensor_id, value, sensor_type_uuid, uom,
                nodes.uuid as node_uuid
            from measurements, sensors, nodes, sensor_types
            where
                measurement_ts = ? and
                measurements.sensor_id = sensors.id and
                sensors.node_uuid = nodes.uuid and
                sensor_type_uuid = sensor_types.uuid
            `;
            let records = await conn.query(query, [ ts ]);
            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }


    async getPlaces() {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            // find last timestamp
            let query = `select * from places`;
            let records = await conn.query(query);
            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }


    async getNodes() {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            // find last timestamp
            let query = `select * from nodes`;
            let records = await conn.query(query);
            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }


    async getSensors() {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            // find last timestamp
            let query = `select * from sensors`;
            let records = await conn.query(query);
            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }


    async getSensorTs(sensor_id) {
        let conn;

        try {
            conn = await this.pool.getConnection();
            await conn.query('use ' + this.config.db);

            // find last timestamp
            let query = `
            select
                unix_timestamp(measurement_ts) as ts,
                value
            from
                measurements
            where
                measurement_ts >= (now() - interval 1 day) and
                sensor_id = ?`;

            let records = await conn.query(query, [ sensor_id ]);
            return(records);

        } catch(err) {
            console.log(err);
            throw(err);
        } finally {
            if (conn) conn.end();
        }
    }

}

module.exports = MariaDBDataStorageService;