/**
 * @author Eder Morga
 * @description Definicion de la coleccion Authorizations
 */
const mongoose = require('mongoose');

const authorizationsSchema = new mongoose.Schema({
    application_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Aplications'
    },
    token: {
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

module.exports = mongoose.model('Authorizations', authorizationsSchema);