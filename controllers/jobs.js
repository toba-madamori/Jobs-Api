const Job = require('../models/Job')
const {StatusCodes} = require('http-status-codes')
const {BadRequestError, NotFoundError} = require('../errors')


const getAllJobs = async (req,res)=>{
    const job = await Job.find({ createdBy: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ msg:'success', job, count:job.length })
}

const getJob = async (req,res)=>{
    // getting the userid and the jobid 
    const {user:{userID}, params:{id:jobID}} = req

    const job = await Job.findOne({_id:jobID, createdBy:userID})
    if(!job){
        throw new NotFoundError(`No job with id:${jobID}`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const createJob = async (req,res)=>{
    //getting the userID and assigning it to createdBy property for our job model
    req.body.createdBy = req.user.userID
    
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}

const updateJob = async (req,res)=>{
    const {body:{company, position}, user:{userID}, params:{id:jobID}} = req
    // checking if values where provided for company $ position
    if(company === '' || position === ''){
        throw new BadRequestError('Company and Position fields cannot be empty')
    }

    const job = await Job.findByIdAndUpdate({_id:jobID, createdBy:userID}, {company, position}, {new:true, 
    runValidators:true})
    // checking if the job exists
    if(!job){
        throw new NotFoundError(`No job with the id:${ jobID }`)
    }
    res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req,res)=>{
    const {user:{userID}, params:{id:jobID}} = req

    const job = await Job.findByIdAndDelete({_id:jobID, createdBy:userID})
    if(!job){
        throw new NotFoundError(`No job with the id:${jobID}`)
    }
    res.status(StatusCodes.OK).json({msg:"success",})
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}