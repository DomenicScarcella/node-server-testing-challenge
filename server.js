const express = require('express');
const server = express();
const router = require('./api/lettersRouter.js');

server.use(express.json());
server.use('/letters', router);

module.exports = server;
