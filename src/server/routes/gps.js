// imports
const express = require('express');

// import controllers
const gps = require('../controller/gps.ctrl');
const time = require('../controller/time.ctrl');

// create router
exports.prepareGPSRoutes = () => {
    let router = express.Router();

    return(router);
};