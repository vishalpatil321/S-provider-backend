const express = require('express');
const router = express.Router();
const auth = require('../middlewares/authMiddleware');
const { getServiceProvidersCtrlr, getUserCtrlr,changeAccountStatusCtrlr} = require('../controllers/adminCtrlr');

router.get('/getUsers' , auth,getUserCtrlr);
router.get('/getServiceProviders' , auth,getServiceProvidersCtrlr);
router.post('/changeAccountStatus',auth,changeAccountStatusCtrlr);

module.exports = router;