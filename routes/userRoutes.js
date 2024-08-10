const express = require('express');
const { loginController, registerController, authCtrlr, applyServicePCtrlr, getNotificationCtrlr, deleteNotificationCtrlr, getAllServiceProvidersCtrlr ,bookAppointmentCtrlr,getUserRequestsCtrlr} = require('../controllers/userCtrlr');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

//routes

//login || post
router.post('/login',loginController);

//register || post
router.post('/register',registerController);

//auth || post
router.post('/getUserData',auth,authCtrlr);

//apply for service provide || post
router.post('/apply-provide-service',auth,applyServicePCtrlr);

//for get notifications || post
router.post('/get-notifications',auth,getNotificationCtrlr);

//for delete notifications || post
router.post('/delete-notifications',auth,deleteNotificationCtrlr);

router.get('/getAllServiceProviders',auth,getAllServiceProvidersCtrlr);

router.post('/book-serviceP',auth,bookAppointmentCtrlr);

router.get('/user-requests',auth,getUserRequestsCtrlr);


module.exports = router;