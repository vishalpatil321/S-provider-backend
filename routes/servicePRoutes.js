const express = require('express');
const auth = require('../middlewares/authMiddleware');
const {getServicePInfoCtrlr,updateServicePInfoCtrlr, getServiceProviderByIdCtrlr,getUserRequestsCtrlr,updateStatusCtrlr} = require('../controllers/servicePInfoCtrlr');


const router = express.Router();
router.post('/getServicePInfo',auth , getServicePInfoCtrlr);
router.post('/updateServicePInfo',auth,updateServicePInfoCtrlr);
router.post('/getServiceProviderById',auth,getServiceProviderByIdCtrlr);
router.get('/getUserRequests',auth,getUserRequestsCtrlr);
router.post('/update-status',auth,updateStatusCtrlr);
module.exports = router;