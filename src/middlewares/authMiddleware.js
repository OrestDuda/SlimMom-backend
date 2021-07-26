const jwt = require('jsonwebtoken')
const errors = require('../helpers/errors')
const { User } = require('../models/userModel')

const authMiddleware = async (req, res, next) => {
    try {
        const [type, token] = req.headers.authorization.split(' ')
        if (!token) {
            next(new errors.NotAuthorizedError('Not authorized'))
        }
        const user = jwt.decode(token, process.env.JWT_SECRET)
        const isUserExist = await User.findOne({ _id: user._id })
        if (!isUserExist || isUserExist.token !== token) {
            next(new errors.NotAuthorizedError('Not authorized'))
        }
        req.user = user
        next()
    } catch (err) {
        next(new errors.NotAuthorizedError('Not authorized'))
    }
}

module.exports = {
    authMiddleware
}