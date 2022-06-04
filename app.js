require('dotenv').config();
const moment = require('moment')
const Server = require('./models/server.js');
const server = new Server();
server.listen();
moment.locale('es');

