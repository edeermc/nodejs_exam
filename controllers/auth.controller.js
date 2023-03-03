'use strinct';
const mongoose = require('mongoose');
const AutorizationModel = mongoose.model('Authorizations');

class AuthController {
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
