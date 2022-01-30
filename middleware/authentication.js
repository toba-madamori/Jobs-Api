const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')


const auth = async (req,res,next)=>{
    // get the header and verify
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }

    // get the token and verify
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        // const user = await User.findById(payload.userID).select('-password -__v -email')
        // req.user = user
        req.user = { userID:payload.userID, name:payload.name }
        next()
    } catch (error) {
        throw new UnauthenticatedError('Authentication invalid')   
    }
}

module.exports = auth