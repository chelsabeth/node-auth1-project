const express = require("express");

const configureMiddleware = require('./configure-middleware.js');

const server = express();

configureMiddleware(server);

module.exports = server;