/**
 * @author Eder Morga
 * @description Definicion de la coleccion Logs
 */
const mongoose = require('mongoose');

const logsSchema = new mongoose.Schema({
    application_id: {
        type: mongoose.Types.ObjectId,
        ref: 'Aplications'
    },
    type: {
        type: String,
        enum: ['error', 'info', 'warning']
    },
    priority: {
        type: String,
        enum: ['lowest', 'low', 'medium', 'high', 'highest']
    },
    path: { type: String },
    message: { type: String },
    request: {},
    response: {},
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date
    }
});

module.exports = mongoose.model('Logs', logsSchema);