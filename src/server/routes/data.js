// imports
const express = require('express');

// import controllers
const data = require('../controller/data.ctrl');
const time = require('../controller/time.ctrl');

// create router
exports.prepareDataRoutes = () => {
    let router = express.Router();
    router.get('/snapshot', data.getLastSnapshot);
    router.get('/places', data.getPlaces);
    router.get('/nodes', data.getNodes);
    router.get('/sensorts/:sensor_id', data.getSensorTs);
    return(router);
};