const fs = require('fs');
const MAPS_DIR = require('../routes/static').MAPS_DIR;
const Storage = require('../services/admin_storage_mariadb');
const storage = new Storage();

const Utils = require('./req_utils');

exports.login = async (req, res) => {
    const username = req.params.u;
    const password = req.params.p;

    const r = await storage.getLogin(username, password);
    res.json(r);
};

exports.getEvents = async (req, res) => {
    let user_id = Utils.emptyIsNull(req.params.user_id);
    if (user_id !== null) {
        user_id = parseInt(user_id);
    }

    let event_id = Utils.emptyIsNull(req.params.event_id);
    if (event_id !== null) {
        event_id = parseInt(event_id);
    }

    let events;

    if (event_id) {
        events = await storage.getEvent(event_id);
    } else {
        events = await storage.getEvents(user_id);
    }

    res.json(events);
};

