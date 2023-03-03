'use strinct';

const mongoose = require('mongoose');
const AutorizationModel = mongoose.model('Authorizations');

/**
 * @class AuthController
 * @description Clase para validar las conexiones de usuario, la ocuparemos como middleware
 */
class AuthController {
    /**
     * @function verifyToken Validaremos el token que nos llega en el header de la petición
     * @param Request req 
     * @param Response res 
     * @param next 
     * @returns void|json Json con el error o continua con la siguiente funcion si todo va OK con el id de la aplicación
     */
	async verifyToken(req, res, next) {
		const tokenExist = await AutorizationModel.findOne({ token: req.headers.authorization.split(" ")[1] });
        
        if ( !tokenExist ) {
            res.status(403).json({ message: "Token inválido, id de aplicación desconocida o sin permisos sobre la aplicación que desea acceder" });
        } else {
            req.body = Object.assign(req.body, {
                application_id: tokenExist.application_id.toString()
            });

            next();
        }
	}
}

module.exports = new AuthController();
