const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req,res)=>{
    const job = await Job.find({ createdBy: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ msg:'success', job, count:job.length })
}

const getJob = async (req,res)=>{
    res.send('get a particular job')
}

const createJob = async (req,res)=>{
    //getting the userID and assigning it to createdBy property for our job model
    req.body.createdBy = req.user.userID
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req,res)=>{
    res.send('update job')
}

const deleteJob = async (req,res)=>{
    res.send('delete job')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}