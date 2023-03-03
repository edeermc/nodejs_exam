const mongoose = require('mongoose');

const aplicationsSchema = new mongoose.Schema({
    name: {
        type: String
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('Aplications', aplicationsSchema);