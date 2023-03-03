'use strict';

const router = require('express').Router();
const prefix = '/logs';

const controller = require('../controllers/main.controller');
const auth = require('../controllers/auth.controller');

router.get(`${prefix}/`, auth.verifyToken, controller.all);
router.post(`${prefix}/`, auth.verifyToken, controller.create);
router.get(`${prefix}/:id`, auth.verifyToken, controller.info);
router.put(`${prefix}/:id`, auth.verifyToken, controller.update);
router.delete(`${prefix}/:id`, auth.verifyToken, controller.delete);

module.exports = router;