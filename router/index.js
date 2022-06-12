const Router = require('express').Router;
const userController = require('../controllers/user-controller')
const {body, validationResult } = require('express-validator')
const authMiddlewaree = require('../middlewaree/auth-middlewaree')


const router = new Router();

router.post('/registration',
    body('email').isEmail(),
    body('password').isLength({min: 5, max: 12}),
    userController.registration)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.get('/activate/:link', userController.activate)
router.get('/refresh', userController.refresh)
router.get('/users', authMiddlewaree, userController.getUsers)
router.put('/change', userController.changePassword)


module.exports = router