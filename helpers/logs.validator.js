const Joi = require('joi');

const logSchema = Joi.object({
    application_id: Joi.string().id().required(),
    type: Joi.string().valid('error', 'info', 'warning').required(),
    priority: Joi.string().valid('lowest', 'low', 'medium', 'high', 'highest').required(),
    path: Joi.string().regex( new RegExp('^(.+)\/([^\/]+)$') ).required(),
    message: Joi.string().required(),
    request: Joi.any(),
    response: Joi.any(),
    created_at: Joi.date(),
    updated_at: Joi.date()
});

module.exports = logSchema;