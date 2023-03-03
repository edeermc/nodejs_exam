/**
 * @author Eder Morga
 * @description Conexión a BD de Mongo mediante la cadena de conexión
 */
require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect( process.env.DB_CONN );
mongoose.connection.on( 'error', error => console.log(error) );

require('../models/applications.model');
require('../models/authorizations.model');
require('../models/logs.model');