const userModel = require('../models/user_models');
const servicePModel = require('../models/serviceP_model');

const getUserCtrlr = async(req,res) => {
    try {
      const users = await userModel.find({});
      res.status(200).send({
        success:true,
        message:'users data',
        data:users
    });  
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching users',
            error
        });
    };
};

const getServiceProvidersCtrlr = async(req,res) => {
    try {
        const serviceProviders = await servicePModel.find({});
        res.status(200).send({
        success:true,
        message:'service providers data',
        data:serviceProviders
    })  
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error while fetching service providers',
            error
        });
    };
};

const changeAccountStatusCtrlr = async(req,res) => {
    try {
        const {servicePId,status} = req.body;
        const serviceP = await servicePModel.findByIdAndUpdate(servicePId,{status});
       
        const user = await userModel.findOne({_id:serviceP.userId});
        const notification = user.notification;
        notification.push({
            type:'service-povider-account-request-accepted',
            message:`Service provider application status is ${status}`,
            onClickPath:'/notification' 
        });
        user.isServiceProvider = status === 'approved' ? true : false;
        await user.save();
        res.status(200).send({
            success:true,
            message:'Account status updated.',
            data:serviceP
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in account status',
            error
    });
}
}

module.exports = {
  getUserCtrlr,
  getServiceProvidersCtrlr,
  changeAccountStatusCtrlr
}

