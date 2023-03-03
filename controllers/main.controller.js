'use strinct';
const mongoose = require('mongoose');
const LogsModel = mongoose.model('Logs');
const LogsValidator = require('../helpers/logs.validator');

class MainController {
	/**
	 * @description Retornamos todos los logs que coincidan con el id de la aplicacion que llega en el token, en caso de falla retornamos el error
	 */
	async all(req, res, next) {
		const allLogs = await LogsModel.find({ application_id: req.body.application_id });
		if ( allLogs.length ) {
			res.status(200).json(allLogs);
		} else {
			res.status(404).json({ message: 'No hay logs de esta aplicación' });
		}
	}

	/**
	 * @description Creamos un nuevo registro y lo retornamos, en caso de falla retornamos el error
	 */
	async create(req, res, next) {
		try {
			const bodyResult = await LogsValidator.validateAsync(req.body);
			const newLog = new LogsModel( bodyResult );
		
			await newLog.save();
			res.status(200).json(newLog);
		} catch (error) {
			console.log(error);
			res.status(500).json({ message: error.message });
		}
	}

	/**
	 * @description Retornamos el log que nos piden siempre y cuanto tambien pertenezca a la aplicacion desde la que acceden
	 */
	async info(req, res, next) {
		const log = await LogsModel.findOne({ _id: req.params['id'], application_id: req.body.application_id });
		if ( log ) {
			res.status(200).json(log);
		} else {
			res.status(404).json({ message: 'No existe el log en esta aplicación' });
		}
	}

	/**
	 * @description Actualizamos el registro indicado siempre y cuando el token coincida con el id de aplicacion del log
	 */
	async update(req, res, next) {
		try {
			const bodyResult = await LogsValidator.validateAsync(req.body);
			const log = await LogsModel.findOneAndUpdate({ _id: req.params['id'], application_id: req.body.application_id }, { ...bodyResult, updated_at: Date.now() });
			if ( log ) {
				res.status(200).json(log);
			} else {
				res.status(404).json({ message: 'No existe el log en esta aplicación' });
			}
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	}

	/**
	 * @description Eliminamos el registro y lo retornamos
	 */
	async delete(req, res, next) {
		const log = await LogsModel.findOneAndRemove({ _id: req.params['id'], application_id: req.body.application_id });
		if ( log ) {
			res.status(200).json(log);
		} else {
			res.status(404).json({ message: 'No existe el log en esta aplicación' });
		}
	}
}

module.exports = new MainController();
