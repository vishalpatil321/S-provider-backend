const servicePModel = require('../models/serviceP_model');
const appointmentModel = require('../models/appointment_model');
const userModel = require('../models/user_models');

const getServicePInfoCtrlr = async(req,res) => {
   try {
     const serviceP = await servicePModel.findOne({userId:req.body.userId});
     res.status(200).send({
        success:true,
        message:'Service providers data fatched successfully.',
        data:serviceP
     })
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in get service information of service provider',
        error
    })
   }
};

const updateServicePInfoCtrlr = async(req,res) => {
    try {
        const serviceP = await servicePModel.findOneAndUpdate({userId:req.body.userId},req.body);
        res.status(200).send({
            success:true,
            message:'Your profile has updated.',
            data:serviceP
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in update service provider information.',
            error
        })
    }
};

const getServiceProviderByIdCtrlr = async(req,res) => {
     try {
        const serviceP = await servicePModel.findOne({_id:req.body.servicePId});
        res.status(200).send({
            success:true,
            message:'Data fethched successfully',
            data:serviceP
        });
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching service provider information.',
            error
        });
     };
};

const getUserRequestsCtrlr = async(req,res) =>{
    try {
        const serviceP = await servicePModel.findOne({userId:req.body.userId});
        const request = await appointmentModel.find({servicePId:serviceP._id});
        res.status(200).send({
            success:true,
            message:'Requests fetched successfully.',
            data:request
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while fetching requests of user.',
            error
        });
    };
};

const updateStatusCtrlr = async(req,res) => {
    try {
       const {requestId,status} = req.body;
       const requests = await appointmentModel.findByIdAndUpdate(requestId,{status});
       const user = await userModel.findOne({_id:requests.userId});
       user.notification.push({
           type:'Status-updated',
           message:`Your request has been ${status}`,
           onClickPath:'/serviceP-request'
       });
       await user.save();
       res.status(200).send({
        success:true,
        message:'Request status update successfully',

       });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while update status.',
            error
        });
    };
};

module.exports = {
    getServicePInfoCtrlr,
    updateServicePInfoCtrlr,
    getServiceProviderByIdCtrlr,
    getUserRequestsCtrlr,
    updateStatusCtrlr
};