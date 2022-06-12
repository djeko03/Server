const userService = require('../service/user-service')
const {validationResult} = require('express-validator')
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const UserDto = require("../dtos/user-dto");
const tokenService = require("../service/token-service");


class UserController {
    async registration (req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)

            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async login (req, res) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async logout (req, res) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            console.log(e)
        }
    }

    async activate (req, res) {
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.log(e)
        }
    }

    async refresh (req, res) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            console.log(e)
        }
    }

    async getUsers (req, res) {
        try {
            const users = await userService.getAllUsers()
            return res.json(users)
        } catch (e) {
            console.log(e)
        }
    }

    async changePassword (req, res) {
        try {
            const {email ,password} = req.body;
            const user = await UserModel.findOne({email})
            if (!user) {
                throw new Error(`Пользователь с почтовым адресом ${email} не найден`)
            }
            const hashPass = await bcrypt.hash(password, 3)
            user.update({password:hashPass})
            user.save()
            return res.json(user)
            // const userDto = new UserDto(user);
            // const tokens = tokenService.generateTokens({...userDto});
            // await tokenService.saveToken(userDto.id, tokens.refreshToken);
            // return {...tokens, user: userDto}
        } catch (e) {
            console.log(e)
        }
    }
}

module.exports = new UserController();