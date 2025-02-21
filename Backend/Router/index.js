const express = require('express');
const router = express.Router();
const multer = require('multer');

const userLoginController = require('../controller/userlogin');



const {
  userRegisterationController,
  getAllUsersController,
} = require('../controller/userRegistration');
// routs for bank details data


const { getCurrentUser } = require('../controller/currentUserController');
const userLogout = require('../controller/userLogout');

const authToken = require('../middleware/auth');

const { saveKYC } = require('../controller/kycController');
const adminLoginController = require('../controller/adminController/loginAdmin');
const authRole = require('../middleware/authRole');
const { createSubadmin } = require('../controller/adminController/createSubadmin');

router.post('/signup', userRegisterationController);
router.get('/currentUser', authToken, getCurrentUser);
// hgfyf
router.post('/login', userLoginController);
router.post('/admin-login', adminLoginController);
router.get('/userLogout', userLogout);
router.get('/get-allusers', getAllUsersController);
router.post("/create-subadmin", authToken, authRole("manage-users"), createSubadmin )







// Configure Multer for file uploadssss
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // specify your uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});
const upload = multer({ storage });







// kyc form 
router.post(
  '/kyc',
  authToken,
  upload.fields([
    { name: 'companyLogo', maxCount: 1 },
    { name: 'aadhaarImage', maxCount: 1 },
    { name: 'passportPhoto', maxCount: 1 },
  ]),
  saveKYC
);
module.exports = router;
