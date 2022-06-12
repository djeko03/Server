const tokenService = require('../service/token-service')

module.exports = function(req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            res.status(400).json('Пользователь не авторизован')
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if(!accessToken) {
            res.status(400).json('Пользователь не авторизован')
        }

        const userData = tokenService.validateAccessToken(accessToken)
        if(!userData){
            res.status(400).json('Пользователь не авторизован')
        }

        req.user = userData
        next()
    } catch (e) {
        
    }
}