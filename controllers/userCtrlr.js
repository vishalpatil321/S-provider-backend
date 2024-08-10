const userModel = require('../models/user_models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const servicePModel = require('../models/serviceP_model');
const appointmentModel = require('../models/appointment_model');
const moment = require('moment');

const loginController = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(200).send({
                message: 'Invalid email or password',
                success: false
            });
        };

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.status(200).send({
            message: 'Login Success',
            success: true,
            token
        })
    } catch (error) {
        res.status(500).send({
            message: `error in login ctrlr ${error.message}`,
            success: false,
        })
    }
};

//register callback
const registerController = async (req, res) => {
    try {
        const existingUser = await userModel.findOne({ email: req.body.email });

        if (existingUser) {
            return res.status(200).send({
                message: 'User Already Exist',
                success: false
            });
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({
            message: 'Register Successfully',
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: `Register Controller ${error.message}`
        })
    }
};

const authCtrlr = async (req, res) => {
    try {
        const user = await userModel.findById({ _id: req.body.userId });
        user.password = undefined;
        if (!user) {
            return res.status(200).send({
                message: 'User not found',
                success: false
            });
        }
        else {
            res.status(200).send({
                success: true,
                data: user
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            message: 'auth error',
            success: false,
            error
        })
    }
}

const applyServicePCtrlr = async (req, res) => {

    try {
        const newServiceP = await servicePModel({ ...req.body, status: 'Pending' });
        await newServiceP.save();
        console.log(newServiceP);

        const adminUser = await userModel.findOne({ isAdmin: true });
        const notification = adminUser.notification;

        notification.push({
            type: 'apply-service-provider',
            message: `${newServiceP.firstName} ${newServiceP.lastName} has applied for a service provider`,
            data: {
                servicePid: newServiceP._id,
                name: newServiceP.firstName + newServiceP.lastName,
                onClickPath: '/admin/services'
            }
        })
        await userModel.findByIdAndUpdate(adminUser._id, { notification })
        res.status(200).send({
            success: true,
            message: 'Service Provider Applied Successfully.',
            
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error While Applying For Service Provider'
        })
    }
};

const getNotificationCtrlr = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        const seenNotification = user.seenNotification;
        const notification = user.notification;
        seenNotification.push(...notification);
        user.notification = [];
        user.seenNotification = notification;

        const updatedUser = await user.save();
        res.status(200).send({
            success: true,
            message: 'All notifications are marked as read.',
            data: updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: 'Error in notification'
        });
    }
}

const deleteNotificationCtrlr = async (req, res) => {
    try {
        const user = await userModel.findOne({ _id: req.body.userId });
        user.seenNotification = [];
        user.notification = [];
        const updatedUser = await user.save();
        updatedUser.password = undefined;
        res.status(200).send({
            message: 'Notification deleted successfully.',
            success: true,
            data:updatedUser
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message:'Error in delete notification'
        });
    };
};

const getAllServiceProvidersCtrlr = async(req,res) => {
      try {
        const serviceProviders = await servicePModel.find({status:'approved'});
        res.status(200).send({
            success:true,
            message:'Data fetched successfully',
            data:serviceProviders
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in get all service providers',
            error
        })
      }
};

const bookAppointmentCtrlr = async(req,res) => {
    try {
        // req.body.date = moment(req.body.date,'DD-MM-YYYY').toISOString();
        // req.body.time = moment(req.body.time,'HH:mm').toISOString();
        req.body.status = 'pending';
        console.log('body',req.body);
        const newAppointment = new appointmentModel(req.body);
        await newAppointment.save();
        const user = await userModel.findOne({_id:req.body.servicePInfo.userId});
        user.notification.push({
            type:'New-service-request',
            message:`A new service request from ${req.body.userInfo.name}`,
            onClickPath:'/user/appointments'
        });
        await user.save();
        res.status(200).send({
            success:true,
            message:'Send service request successfull.',
           
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'Error in appointment controller.',
            error
        });
    }
};

const getUserRequestsCtrlr = async(req,res) => {
   try {
     const request = await appointmentModel.find({userId:req.body.userId});
     console.log('request iformation',request);
     res.status(200).send({
        success:true,
        message:'Requests fetched successfully.',
        data:request
     });
   } catch (error) {
    console.log(error);
    res.status(500).send({
        success:false,
        message:'Error in appointment controller.',
        error
    });
   } 
}

module.exports = {
    loginController,
    registerController,
    authCtrlr,
    applyServicePCtrlr,
    getNotificationCtrlr,
    deleteNotificationCtrlr,
    getAllServiceProvidersCtrlr,
    bookAppointmentCtrlr,
    getUserRequestsCtrlr
};