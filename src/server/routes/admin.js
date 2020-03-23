// imports
const express = require('express');

// import controllers
const admin = require('../controller/admin.ctrl');

// create router
exports.prepareAdminRoutes = () => {
    let router = express.Router();

    // actual admin routes
    router.get('/login/:u/:p', admin.login);

    return (router);
};