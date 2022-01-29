const User = require('../models/User')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError} = require('../errors')
const bcrypt = require('bcryptjs')


const register = async (req,res)=>{
    const {name,email,password} = req.body
    
    // hashing the password
    const salt = await bcrypt.genSalt(10)
    const hashedpassword = await bcrypt.hash(password, salt)
    const tempUser = {name,email,password:hashedpassword}

    // creating the user in the DB
    const user = await User.create({...tempUser})
    res.status(StatusCodes.CREATED).json({user})
}

const login = async (req,res)=>{
    res.send('login user')
}

module.exports = {register,login}