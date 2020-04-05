// const Storage = require('../services/data_storage_mariadb');
const Storage = require('../services/data_storage_pg');
const storage = new Storage();

const Utils = require('./req_utils');

exports.getLastSnapshot = async (req, res) => {
    const items = await storage.getSnapshot();
    res.json(items);
};

exports.getPlaces = async (req, res) => {
    const items = await storage.getPlaces();
    res.json(items);
};

exports.getNodes = async (req, res) => {
    const items = await storage.getNodes();
    res.json(items);
};

exports.getSensors = async (req, res) => {
    const items = await storage.getSensors();
    res.json(items);
};

exports.getSensorTs = async (req, res) => {
    let sensor_id = Utils.emptyIsNull(req.params.sensor_id);
    if (sensor_id !== null) {
        sensor_id = parseInt(sensor_id);
    } else {
        res.json([]);
    }
    const items = await storage.getSensorTs(sensor_id);
    res.json(items);
};