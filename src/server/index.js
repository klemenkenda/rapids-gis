// constants
const PORT = 8000;

// imports
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();

// loading routers
const gpsRouter = require('./routes/gps');
const guiRouter = require('./routes/gui');

// basic server preparation
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// setting up routes
app.use('/api', gpsRouter.prepareGPSRoutes());
guiRouter.prepareMapRoutes(app);
guiRouter.prepareGuiRoutes(app);

// starting server
console.log("Starting server on port", PORT)
app.listen(PORT);