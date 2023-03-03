const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:TF9XntF7tU2htCmN@cluster0.cc92o.mongodb.net/nodejs_exam?retryWrites=true&w=majority');
mongoose.connection.on( 'error', error => console.log(error) );

require('../models/applications.model');
require('../models/authorizations.model');
require('../models/logs.model');